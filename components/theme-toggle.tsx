"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { Switch } from "@/components/ui/switch"
import { useTheme } from "@/components/theme-provider"

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className="flex items-center gap-2 bg-white/50 dark:bg-background/50 backdrop-blur-sm rounded-full px-4 py-2 shadow-sm border-0">
        <Sun className="h-4 w-4" />
        <Switch
          checked={theme === "dark"}
          onCheckedChange={toggleTheme}
          className="cursor-pointer"
        />
        <Moon className="h-4 w-4" />
      </div>
    </div>
  )
}
