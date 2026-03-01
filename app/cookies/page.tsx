"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { ArrowLeft, Cookie, Home } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { ThemeToggle } from "@/components/theme-toggle"

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

function CookiesPage() {
  const [settings, setSettings] = React.useState({
    necessary: true,
    functional: true,
    analytics: false,
    marketing: false,
    social: false,
  })

  const handleToggle = (key: keyof typeof settings) => {
    if (key === 'necessary') return // Necessary cookies cannot be disabled
    setSettings(prev => ({ ...prev, [key]: !prev[key] }))
  }

  const handleSaveSettings = () => {
    console.log("Saving cookie settings:", settings)
    // Here you would save the settings to localStorage or backend
    alert("Cookie preferences saved successfully!")
  }

  const handleAcceptAll = () => {
    setSettings({
      necessary: true,
      functional: true,
      analytics: true,
      marketing: true,
      social: true,
    })
  }

  const handleRejectAll = () => {
    setSettings({
      necessary: true,
      functional: false,
      analytics: false,
      marketing: false,
      social: false,
    })
  }

  const cookieTypes = [
    {
      key: 'necessary' as const,
      title: "Strictly Necessary Cookies",
      description: "These cookies are essential for the website to function properly. They enable core functionality such as security, network management, and accessibility.",
      required: true,
    },
    {
      key: 'functional' as const,
      title: "Functional Cookies",
      description: "These cookies enable enhanced functionality and personalization, such as remembering your preferences and settings.",
      required: false,
    },
    {
      key: 'analytics' as const,
      title: "Analytics Cookies",
      description: "These cookies help us understand how visitors interact with our website by collecting and reporting information anonymously.",
      required: false,
    },
    {
      key: 'marketing' as const,
      title: "Marketing Cookies",
      description: "These cookies are used to track visitors across websites to display relevant advertisements and encourage them to take part in activities.",
      required: false,
    },
    {
      key: 'social' as const,
      title: "Social Media Cookies",
      description: "These cookies are set by social media services that we have added to the site to enable you to share our content with your friends and networks.",
      required: false,
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 dark:from-background dark:via-background dark:to-background">
      {/* Back to Home Button */}
      <div className="fixed top-4 left-4 z-50">
        <Button
          asChild
          variant="ghost"
          size="sm"
          className="bg-white/50 dark:bg-background/50 backdrop-blur-sm hover:bg-white/80 dark:hover:bg-background/80 transition-all border-0 shadow-sm"
        >
          <a href="/" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            <span className="hidden sm:inline">Back to Home</span>
            <Home className="h-4 w-4 sm:hidden" />
          </a>
        </Button>
      </div>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Hero Section */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-6">
              <Cookie className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-4xl font-bold mb-4">Cookie Settings</h1>
            <p className="text-muted-foreground text-lg">Manage your cookie preferences</p>
          </div>

          {/* Introduction */}
          <Card className="mb-8 bg-white/50 dark:bg-background/50 backdrop-blur-sm">
            <CardContent className="p-6">
              <p className="text-muted-foreground leading-relaxed">
                We use cookies to enhance your browsing experience, serve personalized content, and analyze our traffic. You can choose which cookies you want to accept. Please note that some features may not work properly if you disable certain cookies.
              </p>
            </CardContent>
          </Card>

          {/* Cookie Settings */}
          <div className="space-y-6 mb-8">
            {cookieTypes.map((cookie, index) => (
              <motion.div
                key={cookie.key}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="bg-white/50 dark:bg-background/50 backdrop-blur-sm">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-lg mb-2">
                          {cookie.title}
                          {cookie.required && (
                            <span className="ml-2 text-xs font-normal text-muted-foreground">
                              (Required)
                            </span>
                          )}
                        </CardTitle>
                        <CardDescription>{cookie.description}</CardDescription>
                      </div>
                      <div className="ml-4">
                        <Switch
                          id={cookie.key}
                          checked={settings[cookie.key]}
                          onCheckedChange={() => handleToggle(cookie.key)}
                          disabled={cookie.required}
                          className="cursor-pointer"
                        />
                        <Label htmlFor={cookie.key} className="sr-only">
                          Toggle {cookie.title}
                        </Label>
                      </div>
                    </div>
                  </CardHeader>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              onClick={handleAcceptAll}
              className="flex-1"
            >
              Accept All Cookies
            </Button>
            <Button
              onClick={handleRejectAll}
              variant="outline"
              className="flex-1"
            >
              Reject Optional Cookies
            </Button>
            <Button
              onClick={handleSaveSettings}
              variant="secondary"
              className="flex-1"
            >
              Save Preferences
            </Button>
          </div>

          {/* Additional Information */}
          <div className="mt-12">
            <Card className="bg-white/50 dark:bg-background/50 backdrop-blur-sm">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-3">What are cookies?</h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Cookies are small text files that are placed on your device when you visit a website. They are widely used to make websites work more efficiently and provide information to website owners.
                </p>
                <p className="text-sm text-muted-foreground">
                  For more information about how we use cookies, please read our{" "}
                  <a href="/privacy" className="text-primary hover:underline">
                    Privacy Policy
                  </a>.
                </p>
              </CardContent>
            </Card>
          </div>
        </motion.div>
      </main>

      {/* Theme Toggle */}
      <ThemeToggle />
    </div>
  )
}

export default CookiesPage
