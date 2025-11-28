// localStorage wrapper for data persistence

import type { UserProfile, Course, Module, Topic, Progress } from "./types"

const KEYS = {
  USER_PROFILE: "linguo_user_profile",
  COURSES: "linguo_courses",
  MODULES: "linguo_modules",
  TOPICS: "linguo_topics",
  PROGRESS: "linguo_progress",
  AUTH: "linguo_auth",
}

// Auth
export function setAuth(isAuthenticated: boolean) {
  if (typeof window === "undefined") return
  localStorage.setItem(KEYS.AUTH, JSON.stringify(isAuthenticated))
}

export function getAuth(): boolean {
  if (typeof window === "undefined") return false
  const auth = localStorage.getItem(KEYS.AUTH)
  return auth ? JSON.parse(auth) : false
}

export function logout() {
  if (typeof window === "undefined") return
  Object.values(KEYS).forEach((key) => localStorage.removeItem(key))
}

// User Profile
export function saveUserProfile(profile: UserProfile) {
  if (typeof window === "undefined") return
  localStorage.setItem(KEYS.USER_PROFILE, JSON.stringify(profile))
  setAuth(true)
}

export function getUserProfile(): UserProfile | null {
  if (typeof window === "undefined") return null
  const data = localStorage.getItem(KEYS.USER_PROFILE)
  return data ? JSON.parse(data) : null
}

// Courses
export function saveCourse(course: Course) {
  if (typeof window === "undefined") return
  const courses = getCourses()
  const index = courses.findIndex((c) => c.id === course.id)
  if (index >= 0) {
    courses[index] = course
  } else {
    courses.push(course)
  }
  localStorage.setItem(KEYS.COURSES, JSON.stringify(courses))
}

export function getCourses(): Course[] {
  if (typeof window === "undefined") return []
  const data = localStorage.getItem(KEYS.COURSES)
  return data ? JSON.parse(data) : []
}

export function getCourse(id: string): Course | null {
  const courses = getCourses()
  return courses.find((c) => c.id === id) || null
}

// Modules
export function saveModules(modules: Module[]) {
  if (typeof window === "undefined") return
  const existing = getModules()
  const courseIds = [...new Set(modules.map((m) => m.courseId))]
  const filtered = existing.filter((m) => !courseIds.includes(m.courseId))
  localStorage.setItem(KEYS.MODULES, JSON.stringify([...filtered, ...modules]))
}

export function getModules(): Module[] {
  if (typeof window === "undefined") return []
  const data = localStorage.getItem(KEYS.MODULES)
  return data ? JSON.parse(data) : []
}

export function getModulesByCourse(courseId: string): Module[] {
  return getModules()
    .filter((m) => m.courseId === courseId)
    .sort((a, b) => a.order - b.order)
}

// Topics
export function saveTopics(topics: Topic[]) {
  if (typeof window === "undefined") return
  const existing = getTopics()
  const courseIds = [...new Set(topics.map((t) => t.courseId))]
  const filtered = existing.filter((t) => !courseIds.includes(t.courseId))
  localStorage.setItem(KEYS.TOPICS, JSON.stringify([...filtered, ...topics]))
}

export function getTopics(): Topic[] {
  if (typeof window === "undefined") return []
  const data = localStorage.getItem(KEYS.TOPICS)
  return data ? JSON.parse(data) : []
}

export function getTopicsByModule(moduleId: string): Topic[] {
  return getTopics()
    .filter((t) => t.moduleId === moduleId)
    .sort((a, b) => a.order - b.order)
}

export function getTopicsByCourse(courseId: string): Topic[] {
  return getTopics()
    .filter((t) => t.courseId === courseId)
    .sort((a, b) => a.order - b.order)
}

export function getTopic(id: string): Topic | null {
  return getTopics().find((t) => t.id === id) || null
}

export function updateTopic(topic: Topic) {
  if (typeof window === "undefined") return
  const topics = getTopics()
  const index = topics.findIndex((t) => t.id === topic.id)
  if (index >= 0) {
    topics[index] = topic
    localStorage.setItem(KEYS.TOPICS, JSON.stringify(topics))
  }
}

// Progress
export function saveProgress(progress: Progress) {
  if (typeof window === "undefined") return
  const all = getAllProgress()
  const index = all.findIndex((p) => p.courseId === progress.courseId)
  if (index >= 0) {
    all[index] = progress
  } else {
    all.push(progress)
  }
  localStorage.setItem(KEYS.PROGRESS, JSON.stringify(all))
}

export function getAllProgress(): Progress[] {
  if (typeof window === "undefined") return []
  const data = localStorage.getItem(KEYS.PROGRESS)
  return data ? JSON.parse(data) : []
}

export function getProgress(courseId: string): Progress | null {
  return getAllProgress().find((p) => p.courseId === courseId) || null
}

export function toggleTopicComplete(courseId: string, topicId: string) {
  const progress = getProgress(courseId) || {
    courseId,
    completedTopics: [],
    completedModules: [],
    percentage: 0,
    lastUpdated: new Date().toISOString(),
  }

  const index = progress.completedTopics.indexOf(topicId)
  if (index >= 0) {
    progress.completedTopics.splice(index, 1)
  } else {
    progress.completedTopics.push(topicId)
  }

  // Recalculate percentage
  const totalTopics = getTopicsByCourse(courseId).length
  progress.percentage = totalTopics > 0 ? Math.round((progress.completedTopics.length / totalTopics) * 100) : 0
  progress.lastUpdated = new Date().toISOString()

  // Check completed modules
  const modules = getModulesByCourse(courseId)
  progress.completedModules = modules
    .filter((module) => {
      const moduleTopics = getTopicsByModule(module.id)
      return moduleTopics.every((t) => progress.completedTopics.includes(t.id))
    })
    .map((m) => m.id)

  saveProgress(progress)
  return progress
}
