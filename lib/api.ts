// API utility for backend communication

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export interface PasswordResetRequest {
  email: string;
}

export interface PasswordResetResponse {
  message: string;
  error?: string;
}

export interface ResetPasswordRequest {
  token: string;
  password: string;
}

/**
 * Request a password reset email
 */
export async function requestPasswordReset(
  email: string
): Promise<PasswordResetResponse> {
  try {
    const response = await fetch(`${API_URL}/api/accounts/request-password-reset/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Failed to send reset email');
    }

    return data;
  } catch (error) {
    console.error('Password reset request error:', error);
    throw error;
  }
}

/**
 * Reset password using token
 */
export async function resetPassword(
  token: string,
  password: string
): Promise<PasswordResetResponse> {
  try {
    const response = await fetch(`${API_URL}/api/accounts/reset-password/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Failed to reset password');
    }

    return data;
  } catch (error) {
    console.error('Password reset error:', error);
    throw error;
  }
}
