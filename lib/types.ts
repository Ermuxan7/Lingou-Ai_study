// Core Types for the Language Learning Platform

export interface UserProfile {
  id: string
  fullName: string
  phone: string
  profession: string
  field: string
  interests: string[]
  createdAt: string
}

export interface Course {
  id: string
  userId: string
  language: string
  targetLanguage: string
  level: "A1" | "A2" | "B1" | "B2" | "C1" | "C2"
  dailyTime: number // minutes
  interests: string[]
  profession: string
  status: "draft" | "generating" | "active" | "completed"
  createdAt: string
}

export interface Module {
  id: string
  courseId: string
  title: string
  description: string
  order: number
  isCompleted: boolean
}

export interface Topic {
  id: string
  moduleId: string
  courseId: string
  title: string
  description: string
  order: number
  isCompleted: boolean
  content: TopicContent | null
}

export interface TopicContent {
  explanation: string
  examples: string[]
  grammar: string
  tasks: Task[]
  story: string
  notes: string
}

export interface Task {
  id: string
  question: string
  type: "multiple-choice" | "fill-blank" | "translate"
  options?: string[]
  answer: string
}

export interface Progress {
  courseId: string
  completedTopics: string[]
  completedModules: string[]
  percentage: number
  lastUpdated: string
}
