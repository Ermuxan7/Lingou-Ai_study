"use client"

import { useEffect, useState, useRef } from "react"
import { useRouter, useParams } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import { getCourse, saveCourse, saveModules, saveTopics, saveProgress } from "@/lib/storage"
import { generateMockRoadmap } from "@/lib/mock-roadmap"
import type { Course, Module, Topic } from "@/lib/types"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Loader2, Sparkles, CheckCircle2 } from "lucide-react"

export default function GenerateCoursePage() {
  const router = useRouter()
  const params = useParams()
  const courseId = params.id as string
  const { isAuthenticated, isLoading, user } = useAuth()

  const [course, setCourse] = useState<Course | null>(null)
  const [status, setStatus] = useState<"loading" | "generating" | "saving" | "done">("loading")
  const [progress, setProgress] = useState(0)
  const [currentStep, setCurrentStep] = useState("")
  const hasStarted = useRef(false)

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/")
    }
  }, [isAuthenticated, isLoading, router])

  useEffect(() => {
    if (isAuthenticated && courseId) {
      const c = getCourse(courseId)
      if (c) {
        setCourse(c)
        if (c.status === "active") {
          router.push(`/courses/${courseId}`)
        }
      } else {
        router.push("/dashboard")
      }
    }
  }, [isAuthenticated, courseId, router])

  useEffect(() => {
    if (course && user && !hasStarted.current && course.status === "generating") {
      hasStarted.current = true
      generateRoadmap()
    }
  }, [course, user])

  const generateRoadmap = async () => {
    if (!course || !user) return

    try {
      setStatus("generating")
      setProgress(10)
      setCurrentStep("Kurs ma'lumotlari tahlil qilinmoqda...")

      await delay(800)
      setProgress(25)
      setCurrentStep("Daraja va qiziqishlar tekshirilmoqda...")

      await delay(800)
      setProgress(40)
      setCurrentStep("Modullar tanlanmoqda...")

      // Generate mock roadmap (no AI needed)
      const mockRoadmap = generateMockRoadmap(course)

      await delay(800)
      setProgress(60)
      setCurrentStep("Mavzular va kontentlar shakllantirilmoqda...")

      await delay(800)
      setStatus("saving")
      setProgress(80)
      setCurrentStep("Ma'lumotlar saqlanmoqda...")

      // Create modules
      const modules: Module[] = mockRoadmap.map((m, index) => ({
        id: crypto.randomUUID(),
        courseId: course.id,
        title: m.title,
        description: m.description,
        order: index + 1,
        isCompleted: false,
      }))

      // Create topics with content
      const topics: Topic[] = mockRoadmap.flatMap((m, moduleIndex) =>
        m.topics.map((t, topicIndex) => ({
          id: crypto.randomUUID(),
          moduleId: modules[moduleIndex].id,
          courseId: course.id,
          title: t.title,
          description: t.description,
          order: topicIndex + 1,
          isCompleted: false,
          content: t.content,
        })),
      )

      // Save everything to localStorage
      saveModules(modules)
      saveTopics(topics)

      saveProgress({
        courseId: course.id,
        completedTopics: [],
        completedModules: [],
        percentage: 0,
        lastUpdated: new Date().toISOString(),
      })

      // Update course status
      const updatedCourse = { ...course, status: "active" as const }
      saveCourse(updatedCourse)

      await delay(500)
      setProgress(100)
      setStatus("done")
      setCurrentStep("Tayyor! Kurs muvaffaqiyatli yaratildi!")

      // Navigate to course page
      setTimeout(() => {
        window.location.href = `/courses/${course.id}`
      }, 1200)
    } catch (error) {
      console.error("Error generating roadmap:", error)
      setCurrentStep("Xatolik yuz berdi. Qayta urinib ko'ring.")
    }
  }

  if (isLoading || !course) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-lg border-border/50 shadow-xl">
        <CardContent className="pt-8 pb-8">
          <div className="text-center space-y-6">
            <div className="relative mx-auto w-20 h-20">
              {status !== "done" && <div className="absolute inset-0 bg-primary/20 rounded-full animate-ping" />}
              <div className="relative h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center">
                {status === "done" ? (
                  <CheckCircle2 className="h-10 w-10 text-emerald-500" />
                ) : (
                  <Sparkles className="h-10 w-10 text-primary animate-pulse" />
                )}
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-foreground mb-2">
                {status === "loading" && "Tayyorlanmoqda..."}
                {status === "generating" && "Roadmap yaratilmoqda..."}
                {status === "saving" && "Saqlanmoqda..."}
                {status === "done" && "Tayyor!"}
              </h2>
              <p className="text-muted-foreground text-sm">{currentStep}</p>
            </div>

            <div className="space-y-2">
              <Progress value={progress} className="h-2" />
              <p className="text-xs text-muted-foreground">{Math.round(progress)}%</p>
            </div>

            <div className="bg-muted/30 rounded-lg p-4 text-left">
              <h3 className="font-medium text-foreground mb-2">Kurs tafsilotlari:</h3>
              <div className="space-y-1 text-sm text-muted-foreground">
                <p>Til: {course.targetLanguage}</p>
                <p>Daraja: {course.level}</p>
                <p>Kunlik vaqt: {course.dailyTime} daqiqa</p>
                {course.interests.length > 0 && <p>Qiziqishlar: {course.interests.join(", ")}</p>}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}
