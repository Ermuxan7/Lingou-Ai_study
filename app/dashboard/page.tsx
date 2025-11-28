"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import { getCourses } from "@/lib/storage"
import type { Course } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { getProgress } from "@/lib/storage"
import { Plus, BookOpen, Clock, LogOut, GraduationCap, Loader2 } from "lucide-react"
import Link from "next/link"

const LEVEL_COLORS: Record<string, string> = {
  A1: "bg-emerald-500/20 text-emerald-400",
  A2: "bg-emerald-500/20 text-emerald-400",
  B1: "bg-amber-500/20 text-amber-400",
  B2: "bg-amber-500/20 text-amber-400",
  C1: "bg-rose-500/20 text-rose-400",
  C2: "bg-rose-500/20 text-rose-400",
}

export default function DashboardPage() {
  const { isAuthenticated, isLoading, user, logout } = useAuth()
  const router = useRouter()
  const [courses, setCourses] = useState<Course[]>([])
  const [progressMap, setProgressMap] = useState<Record<string, number>>({})

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/")
    }
  }, [isAuthenticated, isLoading, router])

  useEffect(() => {
    if (isAuthenticated) {
      const userCourses = getCourses()
      setCourses(userCourses)

      const progresses: Record<string, number> = {}
      userCourses.forEach((course) => {
        const p = getProgress(course.id)
        progresses[course.id] = p?.percentage || 0
      })
      setProgressMap(progresses)
    }
  }, [isAuthenticated])

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
      <header className="border-b border-border/50 bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-3 md:py-4 flex items-center justify-between">
          <div className="flex items-center gap-2 md:gap-3">
            <div className="h-8 w-8 md:h-10 md:w-10 rounded-xl bg-primary/20 flex items-center justify-center">
              <GraduationCap className="h-4 w-4 md:h-5 md:w-5 text-primary" />
            </div>
            <div>
              <h1 className="font-semibold text-foreground text-sm md:text-base">Linguo</h1>
              <p className="text-xs text-muted-foreground hidden sm:block">AI Til Platformasi</p>
            </div>
          </div>
          <div className="flex items-center gap-2 md:gap-4">
            <span className="text-xs md:text-sm text-muted-foreground hidden sm:block">
              Salom, {user?.fullName.split(" ")[0]}
            </span>
            <Button variant="ghost" size="icon" onClick={logout} className="h-8 w-8 md:h-9 md:w-9">
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 md:py-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 md:mb-8">
          <div>
            <h2 className="text-xl md:text-2xl font-bold text-foreground">Kurslarim</h2>
            <p className="text-sm text-muted-foreground mt-1">
              {courses.length > 0
                ? `${courses.length} ta kurs mavjud`
                : "Hali kurs yo'q. Birinchi kursingizni yarating!"}
            </p>
          </div>
          <Link href="/courses/new" className="w-full sm:w-auto">
            <Button className="w-full sm:w-auto">
              <Plus className="mr-2 h-4 w-4" />
              Yangi kurs
            </Button>
          </Link>
        </div>

        {courses.length === 0 ? (
          <Card className="border-dashed border-2 border-border/50">
            <CardContent className="flex flex-col items-center justify-center py-12 md:py-16 px-4">
              <div className="h-14 w-14 md:h-16 md:w-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <BookOpen className="h-7 w-7 md:h-8 md:w-8 text-primary" />
              </div>
              <h3 className="text-base md:text-lg font-medium text-foreground mb-2 text-center">Kurs yo'q</h3>
              <p className="text-sm text-muted-foreground text-center max-w-sm mb-6">
                Personalizatsiya qilingan til o'rganish yo'l xaritangizni yarating
              </p>
              <Link href="/courses/new" className="w-full sm:w-auto">
                <Button className="w-full sm:w-auto">
                  <Plus className="mr-2 h-4 w-4" />
                  Birinchi kursni yaratish
                </Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {courses.map((course) => (
              <Link href={`/courses/${course.id}`} key={course.id}>
                <Card className="hover:border-primary/50 transition-colors cursor-pointer h-full">
                  <CardHeader className="pb-2">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <CardTitle className="text-base md:text-lg truncate">{course.targetLanguage} tili</CardTitle>
                        <CardDescription className="mt-1 text-xs md:text-sm">{course.language} dan</CardDescription>
                      </div>
                      <Badge className={cn(LEVEL_COLORS[course.level], "shrink-0")}>{course.level}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3 md:space-y-4">
                    <div className="flex items-center gap-4 text-xs md:text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3 md:h-4 md:w-4" />
                        <span>{course.dailyTime} daqiqa/kun</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-xs md:text-sm">
                        <span className="text-muted-foreground">Progress</span>
                        <span className="font-medium text-foreground">{progressMap[course.id] || 0}%</span>
                      </div>
                      <Progress value={progressMap[course.id] || 0} className="h-2" />
                    </div>
                    {course.status === "generating" && (
                      <Badge variant="secondary" className="w-full justify-center text-xs">
                        <Loader2 className="mr-2 h-3 w-3 animate-spin" />
                        Generatsiya qilinmoqda...
                      </Badge>
                    )}
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}

function cn(...classes: (string | undefined | false)[]) {
  return classes.filter(Boolean).join(" ")
}
