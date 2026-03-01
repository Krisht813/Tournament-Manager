"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { ArrowLeft, Mail } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"

// Logo Component
const Logo = ({ className }: { className?: string }) => {
  return (
    <svg
      viewBox="0 0 78 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn('h-5 w-auto', className)}
    >
      <path
        d="M3 0H5V18H3V0ZM13 0H15V18H13V0ZM18 3V5H0V3H18ZM0 15V13H18V15H0Z"
        fill="url(#logo-gradient)"
      />
      <path
        d="M27.06 7.054V12.239C27.06 12.5903 27.1393 12.8453 27.298 13.004C27.468 13.1513 27.7513 13.225 28.148 13.225H29.338V14.84H27.808C26.9353 14.84 26.2667 14.636 25.802 14.228C25.3373 13.82 25.105 13.157 25.105 12.239V7.054H24V5.473H25.105V3.144H27.06V5.473H29.338V7.054H27.06ZM30.4782 10.114C30.4782 9.17333 30.6709 8.34033 31.0562 7.615C31.4529 6.88967 31.9855 6.32867 32.6542 5.932C33.3342 5.524 34.0822 5.32 34.8982 5.32C35.6349 5.32 36.2752 5.46733 36.8192 5.762C37.3745 6.04533 37.8165 6.40233 38.1452 6.833V5.473H40.1002V14.84H38.1452V13.446C37.8165 13.888 37.3689 14.2563 36.8022 14.551C36.2355 14.8457 35.5895 14.993 34.8642 14.993C34.0595 14.993 33.3229 14.789 32.6542 14.381C31.9855 13.9617 31.4529 13.3837 31.0562 12.647C30.6709 11.899 30.4782 11.0547 30.4782 10.114ZM38.1452 10.148C38.1452 9.502 38.0092 8.941 37.7372 8.465C37.4765 7.989 37.1309 7.62633 36.7002 7.377C36.2695 7.12767 35.8049 7.003 35.3062 7.003C34.8075 7.003 34.3429 7.12767 33.9122 7.377C33.4815 7.615 33.1302 7.972 32.8582 8.448C32.5975 8.91267 32.4672 9.468 32.4672 10.114C32.4672 10.76 32.5975 11.3267 32.8582 11.814C33.1302 12.3013 33.4815 12.6753 33.9122 12.936C34.3542 13.1853 34.8189 13.31 35.3062 13.31C35.8049 13.31 36.2695 13.1853 36.7002 12.936C37.1309 12.6867 37.4765 12.324 37.7372 11.848C38.0092 11.3607 38.1452 10.794 38.1452 10.148Z"
        fill="currentColor"
      />
      <defs>
        <linearGradient
          id="logo-gradient"
          x1="10"
          y1="0"
          x2="10"
          y2="20"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#DDA0DD" />
          <stop offset="1" stopColor="#B0E0E6" />
        </linearGradient>
      </defs>
    </svg>
  )
}

function PasswordResetPage() {
  const [email, setEmail] = React.useState("")
  const [isSubmitted, setIsSubmitted] = React.useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Password reset requested for:", email)
    setIsSubmitted(true)
    // Here you would send the reset link to the email
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

            {/* Logo */}
            <div className="flex justify-center mb-6">
              <Logo />
            </div>

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
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="name@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="bg-white/50 dark:bg-background/50 backdrop-blur-sm"
                    />
                  </div>

                  <Button type="submit" className="w-full">
                    Send Reset Link
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
