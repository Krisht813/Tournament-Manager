"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { ArrowLeft, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { requestPasswordReset } from "@/lib/api"

function PasswordResetPage() {
  const [email, setEmail] = React.useState("")
  const [isSubmitted, setIsSubmitted] = React.useState(false)
  const [isLoading, setIsLoading] = React.useState(false)
  const [error, setError] = React.useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      await requestPasswordReset(email)
      setIsSubmitted(true)
    } catch (err) {
      setError("Failed to send reset email. Please try again.")
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 dark:from-background dark:via-background dark:to-background p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card className="bg-white/50 dark:bg-background/50 backdrop-blur-sm border-2">
          <CardContent className="p-8">
            {/* Back Button */}
            <Button
              asChild
              variant="ghost"
              size="sm"
              className="mb-6"
            >
              <a href="/login">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Login
              </a>
            </Button>

            {!isSubmitted ? (
              <>
                {/* Icon */}
                <div className="flex justify-center mb-6">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10">
                    <Mail className="h-8 w-8 text-primary" />
                  </div>
                </div>

                {/* Title and Description */}
                <div className="text-center mb-8">
                  <h1 className="text-2xl font-bold mb-2">Reset Your Password</h1>
                  <p className="text-muted-foreground text-sm">
                    Enter your email address and we'll send you a link to reset your password.
                  </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-6">
                  {error && (
                    <div className="p-3 text-sm text-red-600 bg-red-50 dark:bg-red-900/20 rounded-md">
                      {error}
                    </div>
                  )}
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="name@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      disabled={isLoading}
                      className="bg-white/50 dark:bg-background/50 backdrop-blur-sm"
                    />
                  </div>

                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? "Sending..." : "Send Reset Link"}
                  </Button>
                </form>

                {/* Sign In Link */}
                <p className="mt-6 text-center text-sm text-muted-foreground">
                  Remember your password?{" "}
                  <a href="/login" className="text-primary font-semibold hover:underline">
                    Sign in
                  </a>
                </p>
              </>
            ) : (
              <>
                {/* Success State */}
                <div className="flex justify-center mb-6">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/30">
                    <Mail className="h-8 w-8 text-green-600 dark:text-green-400" />
                  </div>
                </div>

                <div className="text-center mb-8">
                  <h1 className="text-2xl font-bold mb-2">Check Your Email</h1>
                  <p className="text-muted-foreground text-sm">
                    We've sent a password reset link to <strong>{email}</strong>
                  </p>
                  <p className="text-muted-foreground text-sm mt-2">
                    Please check your inbox and follow the instructions to reset your password.
                  </p>
                </div>

                <div className="space-y-4">
                  <Button asChild className="w-full">
                    <a href="/login">Back to Login</a>
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setIsSubmitted(false)}
                    className="w-full"
                  >
                    Resend Link
                  </Button>
                </div>

                <p className="mt-6 text-center text-xs text-muted-foreground">
                  Didn't receive the email? Check your spam folder or try again with a different email address.
                </p>
              </>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}

export default PasswordResetPage
