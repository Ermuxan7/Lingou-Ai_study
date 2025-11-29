// app/courses/[id]/topics/[topicId]/page.tsx
"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter, useParams } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import {
  getCourse,
  getTopic,
  getTopicsByModule,
  getProgress,
  toggleTopicComplete,
  updateTopic,
  getUserProfile,
} from "@/lib/storage";
import type {
  Course,
  Topic,
  TopicContent,
  Progress as ProgressType,
} from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  ArrowLeft,
  BookOpen,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Loader2,
  MessageCircle,
  Send,
  Sparkles,
  FileText,
  ListChecks,
  BookMarked,
  X,
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { AssistantContent } from "@/components/AssistantConten";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export default function TopicViewerPage() {
  const router = useRouter();
  const params = useParams();
  const inputRef = useRef<HTMLInputElement>(null);
  const courseId = params.id as string;
  const topicId = params.topicId as string;
  const { isAuthenticated, isLoading, user } = useAuth();

  const [course, setCourse] = useState<Course | null>(null);
  const [topic, setTopic] = useState<Topic | null>(null);
  const [content, setContent] = useState<TopicContent | null>(null);
  const [progress, setProgress] = useState<ProgressType | null>(null);
  const [notes, setNotes] = useState("");

  // Content generation
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationError, setGenerationError] = useState<string | null>(null);
  const hasGeneratedRef = useRef(false);

  // AI Assistant
  const [assistantOpen, setAssistantOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isAsking, setIsAsking] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Navigation
  const [siblingTopics, setSiblingTopics] = useState<Topic[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/");
    }
  }, [isAuthenticated, isLoading, router]);

  useEffect(() => {
    if (isAuthenticated && courseId && topicId) {
      loadData();
    }
  }, [isAuthenticated, courseId, topicId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Auto-generate content if missing
  useEffect(() => {
    if (topic && !content && !isGenerating && !hasGeneratedRef.current) {
      hasGeneratedRef.current = true;
      generateTopicContent();
    }
  }, [topic, content]);

  const loadData = () => {
    const c = getCourse(courseId);
    if (!c) {
      router.push("/dashboard");
      return;
    }
    setCourse(c);

    const t = getTopic(topicId);
    if (!t) {
      router.push(`/courses/${courseId}`);
      return;
    }
    setTopic(t);
    setContent(t.content);
    setNotes(t.content?.notes || "");

    const siblings = getTopicsByModule(t.moduleId);
    setSiblingTopics(siblings);
    setCurrentIndex(siblings.findIndex((s) => s.id === topicId));

    setProgress(getProgress(courseId));
  };

  const generateTopicContent = async () => {
    if (!topic || !course || !user) return;

    setIsGenerating(true);
    setGenerationError(null);

    try {
      const userProfile = getUserProfile();

      const res = await fetch("/api/generate-topic-content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          topic,
          course,
          userProfile,
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to generate content");
      }

      const generatedContent = await res.json();

      // Save content
      const updatedTopic = {
        ...topic,
        content: generatedContent,
      };
      updateTopic(updatedTopic);
      setTopic(updatedTopic);
      setContent(generatedContent);
      setNotes(generatedContent.notes || "");
    } catch (error) {
      console.error("Error generating content:", error);
      setGenerationError("Kontent yaratishda xatolik yuz berdi");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleAskQuestion = async () => {
    if (!inputMessage.trim() || !topic || !course || isAsking) return;

    const userMessage = inputMessage.trim();
    setInputMessage(""); // faqat to‘liq message keyin tozalash
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
    setIsAsking(true);

    try {
      // 👇 AI ga so‘rov yuborish
      const res = await fetch("/api/ai-assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          question: userMessage,
          topic,
          course,
          context: content?.explanation || "",
        }),
      });

      const aiResponse = await res.text();

      // AI response typing effect
      let displayedText = "";
      for (let i = 0; i < aiResponse.length; i++) {
        displayedText += aiResponse[i];
        setMessages((prev) => {
          const newMessages = [...prev];
          const lastMessage = newMessages[newMessages.length - 1];
          if (lastMessage.role === "assistant") {
            newMessages[newMessages.length - 1] = {
              ...lastMessage,
              content: displayedText,
            };
          } else {
            newMessages.push({ role: "assistant", content: displayedText });
          }
          return newMessages;
        });
        await new Promise((resolve) => setTimeout(resolve, 15));
      }
    } catch (err) {
      console.error("AI Error:", err);
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Javob topilmadi" },
      ]);
    } finally {
      setIsAsking(false);
    }
  };

  const handleToggleComplete = () => {
    const newProgress = toggleTopicComplete(courseId, topicId);
    setProgress(newProgress);
  };

  const saveNotes = () => {
    if (!topic || !content) return;
    const updatedContent = { ...content, notes };
    const updatedTopic = { ...topic, content: updatedContent };
    updateTopic(updatedTopic);
    setTopic(updatedTopic);
    setContent(updatedContent);
  };

  const goToTopic = (direction: "prev" | "next") => {
    const newIndex = direction === "prev" ? currentIndex - 1 : currentIndex + 1;
    if (newIndex >= 0 && newIndex < siblingTopics.length) {
      hasGeneratedRef.current = false; // Reset for next topic
      router.push(`/courses/${courseId}/topics/${siblingTopics[newIndex].id}`);
    }
  };

  const isCompleted = progress?.completedTopics.includes(topicId) ?? false;

  if (isLoading || !course || !topic) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="border-b border-border/50 bg-card/50 backdrop-blur-sm shrink-0 z-10">
        <div className="px-3 md:px-4 py-3 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 md:gap-4 min-w-0">
            <Link href={`/courses/${courseId}`}>
              <Button
                variant="ghost"
                size="icon"
                className="shrink-0 h-8 w-8 md:h-9 md:w-9"
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
            <div className="min-w-0">
              <h1 className="font-semibold text-foreground text-sm md:text-base truncate">
                {topic.title}
              </h1>
              <p className="text-xs text-muted-foreground">
                {course.targetLanguage} - {course.level}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant={isCompleted ? "default" : "outline"}
              size="sm"
              onClick={handleToggleComplete}
              className={cn(
                "text-xs md:text-sm",
                isCompleted ? "bg-emerald-600 hover:bg-emerald-700" : ""
              )}
            >
              <CheckCircle2 className="h-4 w-4 md:mr-2" />
              <span className="hidden md:inline">
                {isCompleted ? "Tugatildi" : "Tugatish"}
              </span>
            </Button>

            <Sheet open={assistantOpen} onOpenChange={setAssistantOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8 md:h-9 md:w-9 lg:hidden bg-transparent"
                >
                  <MessageCircle className="h-4 w-4" />
                </Button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="w-full sm:w-96 p-0 flex flex-col"
              >
                <div className="p-3 border-b border-border/50 flex items-center justify-between shrink-0">
                  <div className="flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-primary" />
                    <h3 className="font-medium text-foreground text-sm">
                      AI Assistant
                    </h3>
                  </div>
                </div>
                <div className="flex-1 overflow-hidden">
                  <AssistantContent
                    messages={messages}
                    isAsking={isAsking}
                    inputMessage={inputMessage}
                    setInputMessage={setInputMessage}
                    handleAskQuestion={handleAskQuestion}
                    messagesEndRef={messagesEndRef}
                    inputRef={inputRef}
                  />
                </div>
              </SheetContent>
            </Sheet>

            <Button
              variant="outline"
              size="icon"
              onClick={() => setAssistantOpen(!assistantOpen)}
              className="hidden lg:flex"
            >
              {assistantOpen ? (
                <X className="h-4 w-4" />
              ) : (
                <MessageCircle className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        <main className="flex-1 overflow-hidden">
          {isGenerating ? (
            <div className="h-full flex items-center justify-center p-4">
              <Card className="max-w-md w-full">
                <CardContent className="pt-8 pb-8 text-center">
                  <div className="relative mx-auto w-16 h-16 mb-4">
                    <div className="absolute inset-0 bg-primary/20 rounded-full animate-ping" />
                    <div className="relative h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
                      <Sparkles className="h-8 w-8 text-primary animate-pulse" />
                    </div>
                  </div>
                  <h3 className="text-lg font-medium text-foreground mb-2">
                    Kontent yaratilmoqda...
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    AI sizning darajangizga mos dars tayyorlayapti
                  </p>
                </CardContent>
              </Card>
            </div>
          ) : generationError ? (
            <div className="h-full flex items-center justify-center p-4">
              <Card className="max-w-md w-full">
                <CardContent className="pt-8 pb-8 text-center">
                  <div className="h-16 w-16 rounded-full bg-red-500/10 flex items-center justify-center mx-auto mb-4">
                    <X className="h-8 w-8 text-red-500" />
                  </div>
                  <h3 className="text-lg font-medium text-foreground mb-2">
                    Xatolik yuz berdi
                  </h3>
                  <p className="text-muted-foreground text-sm mb-6">
                    {generationError}
                  </p>
                  <Button onClick={generateTopicContent} variant="outline">
                    Qayta urinish
                  </Button>
                </CardContent>
              </Card>
            </div>
          ) : !content ? (
            <div className="h-full flex items-center justify-center p-4">
              <Card className="max-w-md w-full">
                <CardContent className="pt-8 pb-8 text-center">
                  <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <BookOpen className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-lg font-medium text-foreground mb-2">
                    Kontent mavjud emas
                  </h3>
                  <p className="text-muted-foreground text-sm mb-6">
                    Bu mavzu uchun kontent hali yaratilmagan
                  </p>
                  <div className="flex gap-2 justify-center">
                    <Button onClick={generateTopicContent} className="gap-2">
                      <Sparkles className="h-4 w-4" />
                      Yaratish
                    </Button>
                    <Link href={`/courses/${courseId}`}>
                      <Button variant="outline">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Ortga
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </div>
          ) : (
            <ScrollArea className="h-full">
              <div className="max-w-3xl mx-auto p-4 md:p-6 space-y-4 md:space-y-6">
                <Tabs defaultValue="explanation" className="w-full">
                  <TabsList className="flex w-full h-auto">
                    <TabsTrigger
                      value="explanation"
                      className="text-xs px-2 py-2 md:text-sm md:px-4"
                    >
                      <FileText className="h-4 w-4 md:mr-1" />
                      <span className="hidden sm:inline">Dars</span>
                    </TabsTrigger>
                    <TabsTrigger
                      value="examples"
                      className="text-xs px-2 py-2 md:text-sm md:px-4"
                    >
                      <BookMarked className="h-4 w-4 md:mr-1" />
                      <span className="hidden sm:inline">Misollar</span>
                    </TabsTrigger>
                    <TabsTrigger
                      value="tasks"
                      className="text-xs px-2 py-2 md:text-sm md:px-4"
                    >
                      <ListChecks className="h-4 w-4 md:mr-1" />
                      <span className="hidden sm:inline">Mashqlar</span>
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent
                    value="explanation"
                    className="mt-4 md:mt-6 space-y-4 md:space-y-6"
                  >
                    <Card>
                      <CardHeader className="pb-2 md:pb-4">
                        <CardTitle className="text-base md:text-lg">
                          Tushuntirish
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="prose prose-invert prose-sm max-w-none">
                          <p className="text-foreground/90 whitespace-pre-wrap leading-relaxed text-sm md:text-base">
                            {content?.explanation}
                          </p>
                        </div>
                      </CardContent>
                    </Card>

                    {content?.grammar && (
                      <Card className="bg-amber-500/5 border-amber-500/20">
                        <CardHeader className="pb-2 md:pb-4">
                          <CardTitle className="text-base md:text-lg text-amber-400">
                            Grammatika
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-foreground/90 whitespace-pre-wrap text-sm md:text-base">
                            {content.grammar}
                          </p>
                        </CardContent>
                      </Card>
                    )}

                    {content?.story && (
                      <Card className="bg-primary/5 border-primary/20">
                        <CardHeader className="pb-2 md:pb-4">
                          <CardTitle className="text-base md:text-lg">
                            Hikoya / Dialog
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-foreground/90 whitespace-pre-wrap italic text-sm md:text-base">
                            {content.story}
                          </p>
                        </CardContent>
                      </Card>
                    )}
                  </TabsContent>

                  <TabsContent value="examples" className="mt-4 md:mt-6">
                    <Card>
                      <CardHeader className="pb-2 md:pb-4">
                        <CardTitle className="text-base md:text-lg">
                          Amaliy misollar
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          {content?.examples.map((example, index) => (
                            <div
                              key={index}
                              className="p-3 md:p-4 rounded-lg bg-muted/30 border border-border/50"
                            >
                              <div className="flex items-start gap-3">
                                <Badge variant="secondary" className="shrink-0">
                                  {index + 1}
                                </Badge>
                                <p className="text-foreground/90 text-sm md:text-base">
                                  {example}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="tasks" className="mt-4 md:mt-6">
                    <Card>
                      <CardHeader className="pb-2 md:pb-4">
                        <CardTitle className="text-base md:text-lg">
                          Mashqlar
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4 md:space-y-6">
                        {content?.tasks.map((task, index) => (
                          <TaskItem
                            key={task.id || index}
                            task={task}
                            index={index}
                          />
                        ))}
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>
              </div>
            </ScrollArea>
          )}
        </main>

        {assistantOpen && (
          <aside className="w-72 xl:w-80 border-l border-border/50 bg-card/30 flex-col shrink-0 hidden lg:flex">
            <div className="p-3 border-b border-border/50 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-primary" />
                <h3 className="font-medium text-foreground text-sm">
                  AI Assistant
                </h3>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={() => setAssistantOpen(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex-1 overflow-hidden">
              <AssistantContent
                messages={messages}
                isAsking={isAsking}
                inputMessage={inputMessage}
                setInputMessage={setInputMessage}
                handleAskQuestion={handleAskQuestion}
                messagesEndRef={messagesEndRef}
                inputRef={inputRef}
              />
            </div>
          </aside>
        )}
      </div>
    </div>
  );
}

// Task Component
function TaskItem({
  task,
  index,
}: {
  task: TopicContent["tasks"][0];
  index: number;
}) {
  const [selected, setSelected] = useState<string | null>(null);
  const [userAnswer, setUserAnswer] = useState("");
  const [showAnswer, setShowAnswer] = useState(false);

  const isCorrect =
    task.type === "multiple-choice"
      ? selected === task.answer
      : userAnswer.toLowerCase().trim() === task.answer.toLowerCase().trim();

  return (
    <div className="p-3 md:p-4 rounded-lg bg-muted/20 border border-border/50">
      <p className="font-medium text-foreground mb-3 text-sm md:text-base">
        {index + 1}. {task.question}
      </p>

      {task.type === "multiple-choice" && task.options && (
        <div className="space-y-2">
          {task.options.map((option, optIndex) => (
            <button
              key={optIndex}
              onClick={() => {
                setSelected(option);
                setShowAnswer(true);
              }}
              disabled={showAnswer}
              className={cn(
                "w-full text-left p-2 md:p-3 rounded-lg border transition-colors text-sm md:text-base",
                showAnswer && option === task.answer
                  ? "bg-emerald-500/10 border-emerald-500/50 text-emerald-400"
                  : showAnswer && option === selected && option !== task.answer
                  ? "bg-red-500/10 border-red-500/50 text-red-400"
                  : "bg-background/50 border-border/50 hover:border-primary/50"
              )}
            >
              {option}
            </button>
          ))}
        </div>
      )}

      {(task.type === "fill-blank" || task.type === "translate") && (
        <div className="space-y-3">
          <Input
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value)}
            placeholder="Javobingizni yozing..."
            disabled={showAnswer}
            className="text-sm md:text-base"
          />
          {!showAnswer && (
            <Button
              size="sm"
              onClick={() => setShowAnswer(true)}
              disabled={!userAnswer.trim()}
              className="w-full sm:w-auto"
            >
              Tekshirish
            </Button>
          )}
          {showAnswer && (
            <div
              className={cn(
                "p-3 rounded-lg text-sm",
                isCorrect
                  ? "bg-emerald-500/10 text-emerald-400"
                  : "bg-red-500/10 text-red-400"
              )}
            >
              {isCorrect
                ? "To'g'ri!"
                : `Noto'g'ri. To'g'ri javob: ${task.answer}`}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
