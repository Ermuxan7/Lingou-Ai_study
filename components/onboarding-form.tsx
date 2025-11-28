"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { useAuth } from "@/lib/auth-context"
import type { UserProfile } from "@/lib/types"
import { X, ChevronRight, ChevronLeft, User, Briefcase, Sparkles } from "lucide-react"

const INTEREST_OPTIONS = [
  "IT va dasturlash",
  "Marketing",
  "Dizayn",
  "Biznes",
  "Tibbiyot",
  "Huquq",
  "Ta'lim",
  "San'at",
  "Sport",
  "Sayohat",
  "Musiqa",
  "Kino",
  "Tarix",
  "Fan",
]

const FIELD_OPTIONS = [
  "Texnologiya",
  "Moliya",
  "Sog'liqni saqlash",
  "Ta'lim",
  "Savdo",
  "Xizmat ko'rsatish",
  "Ishlab chiqarish",
  "Boshqa",
]

export function OnboardingForm() {
  const router = useRouter()
  const { login } = useAuth()
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    profession: "",
    field: "",
    interests: [] as string[],
  })

  const handleInterestToggle = (interest: string) => {
    setFormData((prev) => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter((i) => i !== interest)
        : prev.interests.length < 5
          ? [...prev.interests, interest]
          : prev.interests,
    }))
  }

  const handleSubmit = () => {
    const profile: UserProfile = {
      id: crypto.randomUUID(),
      ...formData,
      createdAt: new Date().toISOString(),
    }
    login(profile)
    router.push("/dashboard")
  }

  const canProceed = () => {
    switch (step) {
      case 1:
        return formData.fullName.trim().length >= 2 && formData.phone.trim().length >= 9
      case 2:
        return formData.profession.trim().length >= 2 && formData.field.length > 0
      case 3:
        return formData.interests.length >= 1
      default:
        return false
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-3 md:p-4">
      <Card className="w-full max-w-lg border-border/50 shadow-xl">
        <CardHeader className="text-center pb-2 px-4 md:px-6">
          <div className="flex justify-center gap-1.5 md:gap-2 mb-3 md:mb-4">
            {[1, 2, 3].map((s) => (
              <div
                key={s}
                className={`h-1.5 md:h-2 w-12 md:w-16 rounded-full transition-colors ${s <= step ? "bg-primary" : "bg-muted"}`}
              />
            ))}
          </div>
          <CardTitle className="text-xl md:text-2xl">
            {step === 1 && "Shaxsiy ma'lumotlar"}
            {step === 2 && "Kasbiy ma'lumotlar"}
            {step === 3 && "Qiziqishlaringiz"}
          </CardTitle>
          <CardDescription className="text-xs md:text-sm">
            {step === 1 && "O'zingiz haqingizda gapirib bering"}
            {step === 2 && "Kasbingiz va sohangiz haqida"}
            {step === 3 && "Nimalar sizni qiziqtiradi?"}
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4 md:space-y-6 px-4 md:px-6">
          {step === 1 && (
            <div className="space-y-3 md:space-y-4">
              <div className="space-y-1.5 md:space-y-2">
                <Label htmlFor="fullName" className="text-sm">
                  To'liq ismingiz
                </Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="fullName"
                    placeholder="Ismingizni kiriting"
                    value={formData.fullName}
                    onChange={(e) => setFormData((prev) => ({ ...prev, fullName: e.target.value }))}
                    className="pl-10 h-10 md:h-11 text-sm md:text-base"
                  />
                </div>
              </div>
              <div className="space-y-1.5 md:space-y-2">
                <Label htmlFor="phone" className="text-sm">
                  Telefon raqam
                </Label>
                <Input
                  id="phone"
                  placeholder="+998 90 123 45 67"
                  value={formData.phone}
                  onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
                  className="h-10 md:h-11 text-sm md:text-base"
                />
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-3 md:space-y-4">
              <div className="space-y-1.5 md:space-y-2">
                <Label htmlFor="profession" className="text-sm">
                  Kasbingiz
                </Label>
                <div className="relative">
                  <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="profession"
                    placeholder="Masalan: Dasturchi, Dizayner"
                    value={formData.profession}
                    onChange={(e) => setFormData((prev) => ({ ...prev, profession: e.target.value }))}
                    className="pl-10 h-10 md:h-11 text-sm md:text-base"
                  />
                </div>
              </div>
              <div className="space-y-1.5 md:space-y-2">
                <Label htmlFor="field" className="text-sm">
                  Soha
                </Label>
                <Select
                  value={formData.field}
                  onValueChange={(value) => setFormData((prev) => ({ ...prev, field: value }))}
                >
                  <SelectTrigger className="h-10 md:h-11 text-sm md:text-base">
                    <SelectValue placeholder="Sohangizni tanlang" />
                  </SelectTrigger>
                  <SelectContent>
                    {FIELD_OPTIONS.map((field) => (
                      <SelectItem key={field} value={field} className="text-sm md:text-base">
                        {field}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-3 md:space-y-4">
              <div className="flex items-center gap-2 text-xs md:text-sm text-muted-foreground">
                <Sparkles className="h-4 w-4 shrink-0" />
                <span>5 tagacha tanlang</span>
              </div>
              <div className="flex flex-wrap gap-1.5 md:gap-2">
                {INTEREST_OPTIONS.map((interest) => {
                  const isSelected = formData.interests.includes(interest)
                  return (
                    <Badge
                      key={interest}
                      variant={isSelected ? "default" : "outline"}
                      className={`cursor-pointer transition-all hover:scale-105 py-1.5 md:py-2 px-2 md:px-3 text-xs md:text-sm ${
                        isSelected ? "" : "hover:bg-primary/10"
                      }`}
                      onClick={() => handleInterestToggle(interest)}
                    >
                      {interest}
                      {isSelected && <X className="ml-1 h-3 w-3" />}
                    </Badge>
                  )
                })}
              </div>
            </div>
          )}

          <div className="flex gap-2 md:gap-3 pt-2 md:pt-4">
            {step > 1 && (
              <Button
                variant="outline"
                onClick={() => setStep((s) => s - 1)}
                className="flex-1 h-9 md:h-10 text-xs md:text-sm"
              >
                <ChevronLeft className="mr-1 md:mr-2 h-4 w-4" />
                Orqaga
              </Button>
            )}
            {step < 3 ? (
              <Button
                onClick={() => setStep((s) => s + 1)}
                disabled={!canProceed()}
                className="flex-1 h-9 md:h-10 text-xs md:text-sm"
              >
                Davom etish
                <ChevronRight className="ml-1 md:ml-2 h-4 w-4" />
              </Button>
            ) : (
              <Button onClick={handleSubmit} disabled={!canProceed()} className="flex-1 h-9 md:h-10 text-xs md:text-sm">
                Boshlash
                <Sparkles className="ml-1 md:ml-2 h-4 w-4" />
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
