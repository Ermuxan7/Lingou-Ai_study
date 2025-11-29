module.exports = [
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[externals]/stream [external] (stream, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("stream", () => require("stream"));

module.exports = mod;
}),
"[externals]/http [external] (http, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("http", () => require("http"));

module.exports = mod;
}),
"[externals]/url [external] (url, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("url", () => require("url"));

module.exports = mod;
}),
"[externals]/punycode [external] (punycode, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("punycode", () => require("punycode"));

module.exports = mod;
}),
"[externals]/https [external] (https, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("https", () => require("https"));

module.exports = mod;
}),
"[externals]/zlib [external] (zlib, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("zlib", () => require("zlib"));

module.exports = mod;
}),
"[externals]/util [external] (util, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("util", () => require("util"));

module.exports = mod;
}),
"[externals]/node:fs [external] (node:fs, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:fs", () => require("node:fs"));

module.exports = mod;
}),
"[externals]/node:stream [external] (node:stream, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:stream", () => require("node:stream"));

module.exports = mod;
}),
"[externals]/node:stream/web [external] (node:stream/web, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:stream/web", () => require("node:stream/web"));

module.exports = mod;
}),
"[project]/app/api/generate-roadmap/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// app/api/generate-roadmap/route.ts
__turbopack_context__.s([
    "POST",
    ()=>POST
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$groq$2d$sdk$40$0$2e$37$2e$0$2f$node_modules$2f$groq$2d$sdk$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/groq-sdk@0.37.0/node_modules/groq-sdk/index.mjs [app-route] (ecmascript) <locals>");
;
const groq = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$groq$2d$sdk$40$0$2e$37$2e$0$2f$node_modules$2f$groq$2d$sdk$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"]({
    apiKey: process.env.GROQ_API_KEY
});
async function POST(request) {
    try {
        const { course, userProfile } = await request.json();
        // 🔍 Debug: Log the received data
        console.log("=== GENERATE ROADMAP REQUEST ===");
        console.log("Target Language:", course.targetLanguage);
        console.log("Level:", course.level);
        console.log("Daily Time:", course.dailyTime);
        const profile = userProfile ?? {
            fullName: "Unknown",
            profession: "Unknown",
            field: "Unknown",
            interests: []
        };
        const userInterests = Array.isArray(profile.interests) ? profile.interests : [];
        const courseInterests = Array.isArray(course.interests) ? course.interests : [];
        const moduleCount = getModuleCount(course.level, course.dailyTime);
        const topicsPerModule = getTopicsPerModule(course.dailyTime);
        const targetLanguage = course.targetLanguage;
        // 🔍 Debug: Confirm target language
        console.log("🎯 Generating content in:", targetLanguage);
        const prompt = `You are a professional ${targetLanguage} language teacher. Create a comprehensive learning roadmap.

USER INFORMATION:
- Name: ${profile.fullName}
- Profession: ${profile.profession}
- Interests: ${userInterests.length > 0 ? userInterests.join(", ") : "General"}

COURSE DETAILS:
- Target Language: ${targetLanguage}
- Level: ${course.level}
- Daily Study Time: ${course.dailyTime} minutes
- Interests: ${courseInterests.length > 0 ? courseInterests.join(", ") : "General"}

REQUIREMENTS:
- Create ${moduleCount} modules
- Each module should have ${topicsPerModule} topics
- Difficulty level: ${course.level}
- Progressive difficulty increase

⚠️ CRITICAL INSTRUCTION - READ CAREFULLY:
The student wants to LEARN ${targetLanguage}.
Therefore, you MUST write ALL content in ${targetLanguage} language:
- Module titles → in ${targetLanguage}
- Module descriptions → in ${targetLanguage}
- Topic titles → in ${targetLanguage}
- Topic descriptions → in ${targetLanguage}

DO NOT write in English, Uzbek, Russian, or any other language.
ONLY use ${targetLanguage} language.

EXAMPLES based on target language:
${getLanguageExamples(targetLanguage)}

Return ONLY valid JSON in this exact format:

{
  "modules": [
    {
      "title": "Module name in ${targetLanguage}",
      "description": "Short description in ${targetLanguage}",
      "topics": [
        {
          "title": "Topic name in ${targetLanguage}",
          "description": "Topic description in ${targetLanguage}"
        }
      ]
    }
  ]
}`;
        console.log("📝 Sending prompt to Groq...");
        const response = await groq.chat.completions.create({
            model: "llama-3.1-8b-instant",
            messages: [
                {
                    role: "system",
                    content: `
            You are a professional ${targetLanguage} language teacher.
            ALL content (module titles, descriptions, topic titles, topic descriptions, examples, tasks) MUST be in ${targetLanguage}.
            Do NOT use English, Uzbek, Russian, or any other language.
            Respond ONLY in VALID JSON format.
            `
                },
                {
                    role: "user",
                    content: prompt
                }
            ],
            temperature: 0.6,
            max_tokens: 4000
        });
        const text = response.choices[0]?.message?.content ?? "";
        // 🔍 Debug: Log raw AI response
        console.log("🤖 AI Raw Response (first 500 chars):", text.substring(0, 500));
        let roadmap;
        try {
            const jsonMatch = text.match(/\{[\s\S]*\}/);
            if (jsonMatch) {
                roadmap = JSON.parse(jsonMatch[0]);
            } else {
                roadmap = JSON.parse(text);
            }
        } catch (err) {
            console.error("❌ JSON parse error:", err);
            console.error("Full AI Response:", text);
            roadmap = {
                modules: []
            };
        }
        if (!roadmap.modules || !Array.isArray(roadmap.modules)) {
            console.error("❌ Invalid roadmap structure:", roadmap);
            roadmap = {
                modules: []
            };
        }
        // 🔍 Debug: Log generated content sample
        if (roadmap.modules.length > 0) {
            console.log("✅ Generated modules count:", roadmap.modules.length);
            console.log("✅ First module title:", roadmap.modules[0].title);
            console.log("✅ First topic title:", roadmap.modules[0].topics?.[0]?.title);
        }
        return new Response(JSON.stringify(roadmap), {
            headers: {
                "Content-Type": "application/json"
            }
        });
    } catch (error) {
        console.error("❌ Fatal error in generate-roadmap:", error);
        return new Response(JSON.stringify({
            error: "Failed to generate roadmap",
            details: error instanceof Error ? error.message : "Unknown error"
        }), {
            status: 500,
            headers: {
                "Content-Type": "application/json"
            }
        });
    }
}
function getLanguageExamples(language) {
    const lower = language.toLowerCase();
    if (lower.includes("english") || lower.includes("ingliz")) {
        return `If target is English:
- Module: "Basic Grammar and Vocabulary"
- Topic: "Present Simple Tense"
- Description: "Learn how to form and use the present simple tense"`;
    }
    if (lower.includes("spanish") || lower.includes("ispan")) {
        return `Si el objetivo es español:
- Módulo: "Gramática y Vocabulario Básico"
- Tema: "Presente Simple"
- Descripción: "Aprende a formar y usar el presente simple"`;
    }
    if (lower.includes("french") || lower.includes("fransuz")) {
        return `Si la cible est le français:
- Module: "Grammaire et Vocabulaire de Base"
- Sujet: "Présent Simple"
- Description: "Apprendre à former et utiliser le présent simple"`;
    }
    if (lower.includes("german") || lower.includes("nemis")) {
        return `Wenn Ziel Deutsch ist:
- Modul: "Grundlegende Grammatik und Wortschatz"
- Thema: "Präsens"
- Beschreibung: "Lernen Sie, das Präsens zu bilden und zu verwenden"`;
    }
    if (lower.includes("russian") || lower.includes("rus")) {
        return `Если цель русский:
- Модуль: "Базовая грамматика и словарный запас"
- Тема: "Настоящее время"
- Описание: "Научитесь образовывать и использовать настоящее время"`;
    }
    return `For ${language}:
- Write module titles in ${language}
- Write topic titles in ${language}
- Write all descriptions in ${language}`;
}
function getModuleCount(level, dailyTime) {
    const baseModules = {
        A1: 4,
        A2: 5,
        B1: 6,
        B2: 6,
        C1: 5,
        C2: 4
    };
    const base = baseModules[level] || 5;
    if (dailyTime >= 120) return Math.min(base + 2, 8);
    if (dailyTime >= 60) return base + 1;
    if (dailyTime <= 30) return Math.max(base - 1, 3);
    return base;
}
function getTopicsPerModule(dailyTime) {
    if (dailyTime >= 120) return 7;
    if (dailyTime >= 60) return 6;
    if (dailyTime >= 45) return 5;
    return 4;
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__92c482fd._.js.map