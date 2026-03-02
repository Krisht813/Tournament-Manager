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
            status=status.HTTP_200_O