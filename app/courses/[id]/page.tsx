"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import {
  getCourse,
  getModulesByCourse,
  getTopicsByModule,
  getProgress,
  toggleTopicComplete,
} from "@/lib/storage";
import type {
  Course,
  Module,
  Topic,
  Progress as ProgressType,
} from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  ArrowLeft,
  BookOpen,
  CheckCircle2,
  Circle,
  ChevronRight,
  GraduationCap,
  Loader2,
  PanelLeftClose,
  PanelLeft,
  Clock,
  Menu,
  BarChart3,
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function CourseDashboardPage() {
  const router = useRouter();
  const params = useParams();
  const courseId = params.id as string;
  const { isAuthenticated, isLoading } = useAuth();

  const [course, setCourse] = useState<Course | null>(null);
  const [modules, setModules] = useState<Module[]>([]);
  const [selectedModule, setSelectedModule] = useState<Module | null>(null);
  const [topics, setTopics] = useState<Topic[]>([]);
  const [progress, setProgress] = useState<ProgressType | null>(null);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileModulesOpen, setMobileModulesOpen] = useState(false);
  const [mobileStatsOpen, setMobileStatsOpen] = useState(false);

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/");
    }
  }, [isAuthenticated, isLoading, router]);

  useEffect(() => {
    if (isAuthenticated && courseId) {
      loadCourseData();
    }
  }, [isAuthenticated, courseId]);

  const loadCourseData = () => {
    const c = getCourse(courseId);
    if (!c) {
      router.push("/dashboard");
      return;
    }
    setCourse(c);

    const mods = getModulesByCourse(courseId);
    setModules(mods);

    if (mods.length > 0) {
      setSelectedModule(mods[0]);
      setTopics(getTopicsByModule(mods[0].id));
    }

    setProgress(getProgress(courseId));
  };

  const handleModuleSelect = (module: Module) => {
    setSelectedModule(module);
    setTopics(getTopicsByModule(module.id));
    setMobileModulesOpen(false);
  };

  const handleTopicToggle = (topicId: string) => {
    const newProgress = toggleTopicComplete(courseId, topicId);
    setProgress(newProgress);
  };

  const getModuleProgress = (moduleId: string) => {
    if (!progress) return 0;
    const moduleTopics = getTopicsByModule(moduleId);
    if (moduleTopics.length === 0) return 0;
    const completed = moduleTopics.filter((t) =>
      progress.completedTopics.includes(t.id)
    ).length;
    return Math.round((completed / moduleTopics.length) * 100);
  };

  const isModuleCompleted = (moduleId: string) => {
    return progress?.completedModules.includes(moduleId) ?? false;
  };

  // course sidebar left li - component
  const ModuleList = ({
    onSelect,
  }: {
    onSelect?: (module: Module) => void;
  }) => (
    <div className="w-full p-2 space-y-1">
      {modules.map((module, index) => {
        const isSelected = selectedModule?.id === module.id;
        const isCompleted = isModuleCompleted(module.id);
        const moduleProgress = getModuleProgress(module.id);

        return (
          <button
            key={module.id}
            onClick={() => {
              handleModuleSelect(module);
              onSelect?.(module);
            }}
            className={cn(
              "w-full text-left rounded-lg transition-colors p-3",
              isSelected
                ? "bg-primary/10 border border-primary/30"
                : "hover:bg-muted/50 border border-transparent"
            )}
          >
            <div className="flex items-center gap-3">
              <div
                className={cn(
                  "h-8 w-8 rounded-full flex items-center justify-center shrink-0 text-sm font-medium",
                  isCompleted
                    ? "bg-emerald-500/20 text-emerald-400"
                    : isSelected
                    ? "bg-primary/20 text-primary"
                    : "bg-muted text-muted-foreground"
                )}
              >
                {isCompleted ? <CheckCircle2 className="h-4 w-4" /> : index + 1}
              </div>
              <div className="flex-1 min-w-0">
                <p
                  className={cn(
                    "text-sm font-medium truncate",
                    isSelected ? "text-foreground" : "text-muted-foreground"
                  )}
                >
                  {module.title}
                </p>
                <div className="flex items-center gap-2 mt-1">
                  <Progress value={moduleProgress} className="h-1 flex-1" />
                  <span className="text-xs text-muted-foreground">
                    {moduleProgress}%
                  </span>
                </div>
              </div>
            </div>
          </button>
        );
      })}
    </div>
  );

  // right-component
  const StatsPanel = () => (
    <div className="p-4 space-y-6">
      <Card className="bg-muted/30 border-border/50">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm">Statistika</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-muted-foreground">Umumiy progress</span>
              <span className="font-medium text-foreground">
                {progress?.percentage || 0}%
              </span>
            </div>
            <Progress value={progress?.percentage || 0} className="h-2" />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="bg-background/50 rounded-lg p-3 text-center">
              <p className="text-2xl font-bold text-foreground">
                {modules.length}
              </p>
              <p className="text-xs text-muted-foreground">Modullar</p>
            </div>
            <div className="bg-background/50 rounded-lg p-3 text-center">
              <p className="text-2xl font-bold text-foreground">
                {progress?.completedTopics.length || 0}
              </p>
              <p className="text-xs text-muted-foreground">Tugatilgan</p>
            </div>
          </div>

          <div className="pt-2 border-t border-border/50">
            <p className="text-xs text-muted-foreground mb-2">
              Modullar holati
            </p>
            <div className="space-y-2">
              {modules.slice(0, 5).map((module) => {
                const mp = getModuleProgress(module.id);
                return (
                  <div key={module.id} className="flex items-center gap-2">
                    {mp === 100 ? (
                      <CheckCircle2 className="h-3 w-3 text-emerald-400 shrink-0" />
                    ) : (
                      <Circle className="h-3 w-3 text-muted-foreground shrink-0" />
                    )}
                    <span className="text-xs text-muted-foreground truncate flex-1">
                      {module.title}
                    </span>
                    <span className="text-xs font-medium text-foreground">
                      {mp}%
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-primary/5 border-primary/20">
        <CardContent className="">
          <h4 className="font-medium text-foreground text-sm mb-2">Maslahat</h4>
          <p className="text-xs text-muted-foreground">
            Har kuni {course?.dailyTime || 30} daqiqa ajratib, izchil o'rganing.
            Mavzuni o'qib bo'lgach, checkbox ni belgilang.
          </p>
        </CardContent>
      </Card>
    </div>
  );

  if (isLoading || !course) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="border-b border-border/50 bg-card/50 backdrop-blur-sm shrink-0 z-10">
        <div className="px-4 py-3 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 md:gap-4 min-w-0">
            <Link href="/dashboard">
              <Button variant="ghost" size="icon" className="shrink-0">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
            <div className="flex items-center gap-2 md:gap-3 min-w-0">
              <div className="h-8 w-8 md:h-10 md:w-10 rounded-xl bg-primary/20 flex items-center justify-center shrink-0">
                <GraduationCap className="h-4 w-4 md:h-5 md:w-5 text-primary" />
              </div>
              <div className="min-w-0">
                <h1 className="font-semibold text-foreground text-sm md:text-base truncate">
                  {course.targetLanguage}
                </h1>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Badge variant="secondary" className="text-xs">
                    {course.level}
                  </Badge>
                  <span className="hidden sm:flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {course.dailyTime} daq/kun
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Mobile: Modules button */}
            <Sheet open={mobileModulesOpen} onOpenChange={setMobileModulesOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="md:hidden bg-transparent"
                >
                  <Menu className="h-4 w-4 mr-1" />
                  <span className="hidden xs:inline">Modullar</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-80 p-0">
                <div className="p-4 border-b border-border/50 flex items-center justify-between">
                  <h2 className="font-medium text-foreground">Modullar</h2>
                </div>
                <ScrollArea className="h-[calc(100vh-4rem)]">
                  <ModuleList />
                </ScrollArea>
              </SheetContent>
            </Sheet>

            {/* Mobile: Stats button */}
            <Sheet open={mobileStatsOpen} onOpenChange={setMobileStatsOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="lg:hidden bg-transparent"
                >
                  <BarChart3 className="h-4 w-4 mr-1" />
                  <span className="hidden xs:inline">
                    {progress?.percentage || 0}%
                  </span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80 p-0">
                <div className="p-4 border-b border-border/50">
                  <h2 className="font-medium text-foreground">Statistika</h2>
                </div>
                <ScrollArea className="h-[calc(100vh-4rem)]">
                  <StatsPanel />
                </ScrollArea>
              </SheetContent>
            </Sheet>

            {/* Desktop: Progress */}
            <div className="hidden lg:flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm font-medium text-foreground">
                  {progress?.percentage || 0}%
                </p>
                <p className="text-xs text-muted-foreground">Umumiy progress</p>
              </div>
              <div className="w-32">
                <Progress value={progress?.percentage || 0} className="h-2" />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* 3-Column Layout - Responsive */}
      <div className="flex-1 flex overflow-hidden">
        {/* left */}
        <aside
          className={cn(
            "w-full h-full overflow-hidden border-r border-border/50 bg-card/30 shrink-0 transition-all duration-300 hidden md:block",
            sidebarCollapsed ? "w-20" : "w-56 lg:w-64"
          )}
        >
          <div className="p-3 border-b border-border/50 flex items-center justify-between">
            {!sidebarCollapsed && (
              <h2 className="font-medium text-foreground text-sm">Modullar</h2>
            )}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="h-8 w-8"
            >
              {sidebarCollapsed ? (
                <PanelLeft className="h-4 w-4" />
              ) : (
                <PanelLeftClose className="h-4 w-4" />
              )}
            </Button>
          </div>

          <li className="h-[calc(100vh-4rem)]">
            {sidebarCollapsed ? (
              // Collapsed view - only numbers
              <div className="p-2 space-y-1">
                {modules.map((module, index) => {
                  const isSelected = selectedModule?.id === module.id;
                  const isCompleted = isModuleCompleted(module.id);

                  return (
                    <button
                      key={module.id}
                      onClick={() => handleModuleSelect(module)}
                      className={cn(
                        "w-full rounded-lg transition-colors p-3 flex items-center justify-center",
                        isSelected
                          ? "bg-primary/10 border border-primary/30"
                          : "hover:bg-muted/50 border border-transparent"
                      )}
                    >
                      <div
                        className={cn(
                          "h-8 w-8 rounded-full flex items-center justify-center text-sm font-medium",
                          isCompleted
                            ? "bg-emerald-500/20 text-emerald-400"
                            : isSelected
                            ? "bg-primary/20 text-primary"
                            : "bg-muted text-muted-foreground"
                        )}
                      >
                        {isCompleted ? (
                          <CheckCircle2 className="h-4 w-4" />
                        ) : (
                          index + 1
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            ) : (
              <ModuleList />
            )}
          </li>
        </aside>

        <main className="flex-1 overflow-hidden min-w-0">
          <div className="h-full flex flex-col">
            {selectedModule && (
              <>
                <div className="p-3 md:p-4 border-b border-border/50 shrink-0">
                  <h2 className="font-semibold text-foreground text-sm md:text-base">
                    {selectedModule.title}
                  </h2>
                  <p className="text-xs md:text-sm text-muted-foreground mt-1 line-clamp-2">
                    {selectedModule.description}
                  </p>
                </div>

                <ScrollArea className="flex-1">
                  <div className="p-3 md:p-4 flex flex-col gap-4">
                    {topics.map((topic, index) => {
                      const isCompleted =
                        progress?.completedTopics.includes(topic.id) ?? false;

                      return (
                        <Card
                          key={topic.id}
                          className={cn(
                            "transition-colors",
                            isCompleted
                              ? "bg-emerald-500/5 border-emerald-500/20"
                              : "hover:border-primary/30"
                          )}
                        >
                          <CardContent>
                            <div className="flex items-center gap-5 px-1 md:px-4 py-1 md:py-2">
                              <Checkbox
                                checked={isCompleted}
                                onCheckedChange={() =>
                                  handleTopicToggle(topic.id)
                                }
                                className="mt-0.5 shrink-0 cursor-pointer"
                              />
                              <Link
                                href={`/courses/${courseId}/topics/${topic.id}`}
                                className="flex-1 min-w-0"
                              >
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                                  <div>
                                    <h3
                                      className={cn(
                                        "font-medium text-sm md:text-base",
                                        isCompleted
                                          ? "text-muted-foreground line-through"
                                          : "text-foreground"
                                      )}
                                    >
                                      {index + 1}. {topic.title}
                                    </h3>
                                    <p
                                      className={cn(
                                        "text-xs md:text-sm text-muted-foreground mt-1 line-clamp-2",
                                        isCompleted
                                          ? "text-muted-foreground line-through"
                                          : "text-foreground"
                                      )}
                                    >
                                      {topic.description}
                                    </p>
                                  </div>
                                  <p className="flex items-center gap-1 shrink-0 w-full sm:w-auto">
                                    <BookOpen className="h-4 w-4 mr-1" />
                                    O'qish
                                    <ChevronRight className="h-4 w-4 ml-1" />
                                  </p>
                                </div>
                              </Link>
                            </div>
                          </CardContent>
                        </Card>
                      );
                    })}
                  </div>
                </ScrollArea>
              </>
            )}
          </div>
        </main>

        {/* right */}
        <aside className="w-64 xl:w-80 border-l border-border/50 bg-card/30 shrink-0 hidden lg:block">
          <div className="h-[calc(100vh-4rem)]">
            <StatsPanel />
          </div>
        </aside>
      </div>
    </div>
  );
}
