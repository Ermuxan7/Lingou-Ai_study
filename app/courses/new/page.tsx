"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import { saveCourse } from "@/lib/storage"
import type { Course } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Target, Clock, Sparkles, X, ChevronRight, ChevronLeft, Loader2 } from "lucide-react"
import Link from "next/link"

const LANGUAGES = [
  { code: "en", name: "Ingliz tili", flag: "🇬🇧" },
  { code: "ru", name: "Rus tili", flag: "🇷🇺" },
  { code: "de", name: "Nemis tili", flag: "🇩🇪" },
  { code: "fr", name: "Fransuz tili", flag: "🇫🇷" },
  { code: "es", name: "Ispan tili", flag: "🇪🇸" },
  { code: "it", name: "Italyan tili", flag: "🇮🇹" },
  { code: "ar", name: "Arab tili", flag: "🇸🇦" },
  { code: "zh", name: "Xitoy tili", flag: "🇨🇳" },
  { code: "ja", name: "Yapon tili", flag: "🇯🇵" },
  { code: "ko", name: "Koreys tili", flag: "🇰🇷" },
  { code: "tr", name: "Turk tili", flag: "🇹🇷" },
]

const LEVELS = [
  { code: "A1", name: "Boshlang'ich", description: "Asosiy so'z va iboralar" },
  { code: "A2", name: "Elementar", description: "Oddiy jumla va savol" },
  { code: "B1", name: "O'rta", description: "Erkin suhbat" },
  { code: "B2", name: "O'rta-yuqori", description: "Murakkab matnlar" },
  { code: "C1", name: "Yuqori", description: "Professional daraja" },
  { code: "C2", name: "Mahalliy", description: "Mutaxassis darajasi" },
]

const TOPIC_INTERESTS = [
  "Biznes",
  "IT va texnologiya",
  "Sayohat",
  "Madaniyat",
  "Sport",
  "Sog'liqni saqlash",
  "Ta'lim",
  "San'at",
  "Musiqa",
  "Kino",
  "Oziq-ovqat",
  "Moda",
  "Tabiat",
  "Siyosat",
]

export default function NewCoursePage() {
  const router = useRouter()
  const { isAuthenticated, isLoading, user } = useAuth()
  const [step, setStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [redirectUrl, setRedirectUrl] = useState<string | null>(null)

  const [formData, setFormData] = useState({
    language: "uz",
    targetLanguage: "",
    level: "" as Course["level"] | "",
    dailyTime: 30,
    interests: [] as string[],
  })

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/")
    }
  }, [isAuthenticated, isLoading, router])

  useEffect(() => {
    if (redirectUrl) {
      console.log("[v0] Redirecting to:", redirectUrl)
      window.location.replace(redirectUrl)
    }
  }, [redirectUrl])

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

  const handleSubmit = async () => {
    if (!user) {
      console.log("[v0] No user found")
      return
    }

    console.log("[v0] Starting course creation...")
    setIsSubmitting(true)

    try {
      const courseId = crypto.randomUUID()
      console.log("[v0] Generated courseId:", courseId)

      const course: Course = {
        id: courseId,
        userId: user.id,
        language: "O'zbek tili",
        targetLanguage: LANGUAGES.find((l) => l.code === formData.targetLanguage)?.name || formData.targetLanguage,
        level: formData.level as Course["level"],
        dailyTime: formData.dailyTime,
        interests: formData.interests,
        profession: user.profession,
        status: "generating",
        createdAt: new Date().toISOString(),
      }

      console.log("[v0] Saving course:", course)
      saveCourse(course)
      console.log("[v0] Course saved successfully")

      const url = `/courses/${courseId}/generate`
      console.log("[v0] Setting redirect URL:", url)
      setRedirectUrl(url)
    } catch (error) {
      console.error("[v0] Error creating course:", error)
      setIsSubmitting(false)
    }
  }

  const canProceed = () => {
    switch (step) {
      case 1:
        return formData.targetLanguage.length > 0
      case 2:
        return formData.level.length > 0
      case 3:
        return formData.interests.length >= 1
      default:
        return false
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  if (!isAuthenticated) return null

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border/50 bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-3 md:py-4">
          <Link
            href="/dashboard"
            className="inline-flex items-center text-xs md:text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Dashboard ga qaytish
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 md:py-8 max-w-2xl">
        <Card className="border-border/50 shadow-xl">
          <CardHeader className="text-center pb-2 px-4 md:px-6">
            <div className="flex justify-center gap-1.5 md:gap-2 mb-4">
              {[1, 2, 3].map((s) => (
                <div
                  key={s}
                  className={`h-1.5 md:h-2 w-12 md:w-16 rounded-full transition-colors ${s <= step ? "bg-primary" : "bg-muted"}`}
                />
              ))}
            </div>
            <CardTitle className="text-xl md:text-2xl">
              {step === 1 && "Qaysi tilni o'rganmoqchisiz?"}
              {step === 2 && "Hozirgi darajangiz qanday?"}
              {step === 3 && "Qanday mavzular qiziq?"}
            </CardTitle>
            <CardDescription className="text-xs md:text-sm">
              {step === 1 && "O'rganmoqchi bo'lgan tilingizni tanlang"}
              {step === 2 && "Daraja va kunlik vaqtingizni belgilang"}
              {step === 3 && "AI sizga mos kontent tayyorlaydi"}
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4 md:space-y-6 pt-4 px-4 md:px-6">
            {step === 1 && (
              <div className="space-y-4">
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 md:gap-3">
                  {LANGUAGES.map((lang) => (
                    <button
                      key={lang.code}
                      type="button"
                      onClick={() => setFormData((prev) => ({ ...prev, targetLanguage: lang.code }))}
                      className={`p-2 md:p-4 rounded-xl border-2 transition-all hover:scale-105 ${
                        formData.targetLanguage === lang.code
                          ? "border-primary bg-primary/10"
                          : "border-border hover:border-primary/50"
                      }`}
                    >
                      <div className="text-xl md:text-2xl mb-1 md:mb-2">{lang.flag}</div>
                      <div className="text-xs md:text-sm font-medium text-foreground truncate">{lang.name}</div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-5 md:space-y-6">
                <div className="space-y-3">
                  <Label className="flex items-center gap-2 text-sm">
                    <Target className="h-4 w-4 text-primary" />
                    Daraja
                  </Label>
                  <div className="grid grid-cols-3 gap-2 md:gap-3">
                    {LEVELS.map((level) => (
                      <button
                        key={level.code}
                        type="button"
                        onClick={() =>
                          setFormData((prev) => ({
                            ...prev,
                            level: level.code as Course["level"],
                          }))
                        }
                        className={`p-2 md:p-4 rounded-xl border-2 transition-all text-left ${
                          formData.level === level.code
                            ? "border-primary bg-primary/10"
                            : "border-border hover:border-primary/50"
                        }`}
                      >
                        <div className="font-bold text-foreground text-sm md:text-base">{level.code}</div>
                        <div className="text-xs text-muted-foreground mt-0.5 md:mt-1 hidden sm:block">{level.name}</div>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <Label className="flex items-center gap-2 text-sm">
                    <Clock className="h-4 w-4 text-primary" />
                    Kuniga qancha vaqt ajratasiz?
                  </Label>
                  <div className="space-y-4 pt-2">
                    <Slider
                      value={[formData.dailyTime]}
                      onValueChange={(value) => setFormData((prev) => ({ ...prev, dailyTime: value[0] }))}
                      min={15}
                      max={180}
                      step={15}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs md:text-sm">
                      <span className="text-muted-foreground">15 daq</span>
                      <span className="font-medium text-primary text-base md:text-lg">{formData.dailyTime} daqiqa</span>
                      <span className="text-muted-foreground">3 soat</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-xs md:text-sm text-muted-foreground">
                  <Sparkles className="h-4 w-4 shrink-0" />
                  <span>5 tagacha mavzu tanlang</span>
                </div>
                <div className="flex flex-wrap gap-1.5 md:gap-2">
                  {TOPIC_INTERESTS.map((interest) => {
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

                <Card className="bg-muted/30 border-border/50 mt-4 md:mt-6">
                  <CardContent className="pt-3 md:pt-4 px-3 md:px-4">
                    <h4 className="font-medium text-foreground mb-2 md:mb-3 text-sm md:text-base">Kurs xulosasi</h4>
                    <div className="space-y-1.5 md:space-y-2 text-xs md:text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Til:</span>
                        <span className="text-foreground">
                          {LANGUAGES.find((l) => l.code === formData.targetLanguage)?.name}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Daraja:</span>
                        <span className="text-foreground">{formData.level}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Kunlik vaqt:</span>
                        <span className="text-foreground">{formData.dailyTime} daqiqa</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Kasb:</span>
                        <span className="text-foreground truncate ml-2">{user?.profession}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            <div className="flex gap-2 md:gap-3 pt-2 md:pt-4">
              {step > 1 && (
                <Button
                  variant="outline"
                  onClick={() => setStep((s) => s - 1)}
                  disabled={isSubmitting}
                  className="flex-1 text-xs md:text-sm h-9 md:h-10"
                >
                  <ChevronLeft className="mr-1 md:mr-2 h-4 w-4" />
                  Orqaga
                </Button>
              )}
              {step < 3 ? (
                <Button
                  onClick={() => setStep((s) => s + 1)}
                  disabled={!canProceed()}
                  className="flex-1 text-xs md:text-sm h-9 md:h-10"
                >
                  Davom etish
                  <ChevronRight className="ml-1 md:ml-2 h-4 w-4" />
                </Button>
              ) : (
                <Button
                  onClick={handleSubmit}
                  disabled={!canProceed() || isSubmitting}
                  className="flex-1 text-xs md:text-sm h-9 md:h-10"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-1 md:mr-2 h-4 w-4 animate-spin" />
                      Yaratilmoqda...
                    </>
                  ) : (
                    <>
                      Yaratish
                      <Sparkles className="ml-1 md:ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
