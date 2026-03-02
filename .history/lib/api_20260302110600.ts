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
    const respo