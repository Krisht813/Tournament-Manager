from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth.models import User
from django.core.mail import send_mail
from django.template.loader import render_to_string
from django.conf import settings
from .models import PasswordResetToken
import os


@api_view(['POST'])
def request_password_reset(request):
    """
    Request a password reset email
    """
    email = request.data.get('email')
    
    if not email:
        return Response(
            {'error': 'Email is required'},
            status=status.HTTP_400_BAD_REQUEST
        )
    
    try:
        user = User.objects.get(email=email)
    except User.DoesNotExist:
        # Don't reveal if user exists or not for security
        return Response(
            {'message': 'If an account exists with this email, you will receive a password reset link.'},
            status=status.HTTP_200_OK
        )
    
    # Create password reset token
    reset_token = PasswordResetToken.objects.create(user=user)
    
    # Build reset link
    frontend_url = settings.CORS_ALLOWED_ORIGINS[0]
    reset_link = f"{frontend_url}/reset-password?token={reset_token.token}"
    
    # Read HTML template
    template_path = os.path.join(settings.BASE_DIR.parent, 'emails', 'password-reset.html')
    with open(template_path, 'r', encoding='utf-8') as file:
        html_content = file.read()
    
    # Replace placeholders
    html_content = html_content.replace('{{user_name}}', user.username or user.email)
    html_content = html_content.replace('{{reset_link}}', reset_link)
    
    # Send email
    try:
        send_mail(
            subject='Reset Your Password - Tournament Manager',
            message=f'Click the link to reset your password: {reset_link}',
            from_email=settings.DEFAULT_FROM_EMAIL,
            recipient_list=[email],
            html_message=html_content,
            fail_silently=False,
        )
        
        return Response(
            {'message': 'Password reset email sent successfully'},
            status=status.HTTP_200_OK
        )
    except Exception as e:
        return Response(
            {'error': f'Failed to send email: {str(e)}'},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )


@api_view(['POST'])
def reset_password(request):
    """
    Reset password using token
    """
    token = request.data.get('token')
    new_password = request.data.get('password')
    
    if not token or not new_password:
        return Response(
            {'error': 'Token and password are required'},
            status=status.HTTP_400_BAD_REQUEST
        )
    
    try:
        reset_token = PasswordResetToken.objects.get(token=token)
        
        if not reset_token.is_valid():
            return Response(
                {'error': 'Token is invalid or has expired'},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        # Reset password
        user = reset_token.user
        user.set_password(new_password)
        user.save()
        
        # Mark token as used
        reset_token.is_used = True
        reset_token.save()
        
        return Response(
            {'message': 'Password reset successfully'},
            status=status.HTTP_200_OK
        )
        
    except PasswordResetToken.DoesNotExist:
        return Response(
            {'error': 'Invalid token'},
            status=status.HTTP_400_BAD_REQUEST
        )
