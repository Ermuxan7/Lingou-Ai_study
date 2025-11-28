"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"
import type { UserProfile } from "./types"
import { getAuth, getUserProfile, logout as storageLogout, saveUserProfile } from "./storage"

interface AuthContextType {
  isAuthenticated: boolean
  isLoading: boolean
  user: UserProfile | null
  login: (profile: UserProfile) => void
  logout: () => void
  updateProfile: (profile: UserProfile) => void
}

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [user, setUser] = useState<UserProfile | null>(null)

  useEffect(() => {
    const auth = getAuth()
    const profile = getUserProfile()
    setIsAuthenticated(auth && !!profile)
    setUser(profile)
    setIsLoading(false)
  }, [])

  const login = (profile: UserProfile) => {
    saveUserProfile(profile)
    setUser(profile)
    setIsAuthenticated(true)
  }

  const logout = () => {
    storageLogout()
    setUser(null)
    setIsAuthenticated(false)
  }

  const updateProfile = (profile: UserProfile) => {
    saveUserProfile(profile)
    setUser(profile)
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, isLoading, user, login, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider")
  }
  return context
}
