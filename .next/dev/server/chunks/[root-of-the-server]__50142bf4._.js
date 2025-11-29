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
"[project]/app/api/generate-topic-content/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// app/api/generate-topic-content/route.ts
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
        const { topic, course, userProfile } = await request.json();
        // 🔍 Debug: Log the received data
        console.log("=== GENERATE TOPIC CONTENT REQUEST ===");
        console.log("Target Language:", course.targetLanguage);
        console.log("Topic Title:", topic.title);
        console.log("Level:", course.level);
        const profile = userProfile ?? {
            profession: "Unknown",
            interests: []
        };
        const userInterests = Array.isArray(profile.interests) ? profile.interests : [];
        const targetLanguage = course.targetLanguage;
        // 🔍 Debug: Confirm target language
        console.log("🎯 Generating lesson in:", targetLanguage);
        const prompt = `You are a professional ${targetLanguage} language teacher. Create a complete lesson.

TOPIC INFORMATION:
- Title: ${topic.title}
- Description: ${topic.description}

STUDENT PROFILE:
- Profession: ${profile.profession}
- Interests: ${userInterests.length > 0 ? userInterests.join(", ") : "General"}
- Level: ${course.level}

LESSON REQUIREMENTS:
1. Explanation (3-4 paragraphs explaining the topic)
2. Examples (5 practical examples)
3. Grammar rules (if applicable to this topic)
4. Exercises (3 different types):
   - Multiple choice question
   - Fill-in-the-blank question
   - Translation exercise
5. Story (short dialog or narrative)

⚠️ CRITICAL INSTRUCTION - READ CAREFULLY:
The student is learning ${targetLanguage}.
Therefore, ALL content MUST be in ${targetLanguage} language:
- Explanation → write in ${targetLanguage}
- Examples → write in ${targetLanguage}
- Grammar rules → write in ${targetLanguage}
- Exercise questions → write in ${targetLanguage}
- Exercise answers → write in ${targetLanguage}
- Story → write in ${targetLanguage}

DO NOT write in English, Uzbek, Russian, or any other language.
ONLY use ${targetLanguage} language for ALL content.

${getContentExamples(targetLanguage)}

Return ONLY valid JSON:

{
  "explanation": "Detailed explanation in ${targetLanguage}",
  "examples": [
    "Example 1 in ${targetLanguage}",
    "Example 2 in ${targetLanguage}",
    "Example 3 in ${targetLanguage}",
    "Example 4 in ${targetLanguage}",
    "Example 5 in ${targetLanguage}"
  ],
  "grammar": "Grammar rules in ${targetLanguage} or empty string",
  "tasks": [
    {
      "id": "1",
      "question": "Question in ${targetLanguage}",
      "type": "multiple-choice",
      "options": ["A in ${targetLanguage}", "B in ${targetLanguage}", "C in ${targetLanguage}", "D in ${targetLanguage}"],
      "answer": "Correct answer in ${targetLanguage}"
    },
    {
      "id": "2",
      "question": "Question in ${targetLanguage}",
      "type": "fill-blank",
      "answer": "Answer in ${targetLanguage}"
    },
    {
      "id": "3",
      "question": "Question in ${targetLanguage}",
      "type": "translate",
      "answer": "Answer in ${targetLanguage}"
    }
  ],
  "story": "Story or dialog in ${targetLanguage}"
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
        let content;
        try {
            const jsonMatch = text.match(/\{[\s\S]*\}/);
            if (jsonMatch) {
                content = JSON.parse(jsonMatch[0]);
            } else {
                content = JSON.parse(text);
            }
        } catch (err) {
            console.error("❌ JSON parse error:", err);
            console.error("Full AI Response:", text);
            content = {
                explanation: `Lesson content for ${topic.title}`,
                examples: [
                    "Example 1",
                    "Example 2",
                    "Example 3",
                    "Example 4",
                    "Example 5"
                ],
                grammar: "",
                tasks: [
                    {
                        id: "1",
                        question: "Question 1",
                        type: "multiple-choice",
                        options: [
                            "A",
                            "B",
                            "C",
                            "D"
                        ],
                        answer: "A"
                    },
                    {
                        id: "2",
                        question: "Question 2",
                        type: "fill-blank",
                        answer: "answer"
                    },
                    {
                        id: "3",
                        question: "Question 3",
                        type: "translate",
                        answer: "translation"
                    }
                ],
                story: "Story content"
            };
        }
        // Validate structure
        if (!content.explanation) content.explanation = "";
        if (!Array.isArray(content.examples)) content.examples = [];
        if (!content.grammar) content.grammar = "";
        if (!Array.isArray(content.tasks)) content.tasks = [];
        if (!content.story) content.story = "";
        // 🔍 Debug: Log generated content sample
        console.log("✅ Explanation length:", content.explanation.length);
        console.log("✅ Examples count:", content.examples.length);
        console.log("✅ First example:", content.examples[0]);
        return new Response(JSON.stringify(content), {
            headers: {
                "Content-Type": "application/json"
            }
        });
    } catch (error) {
        console.error("❌ Fatal error in generate-topic-content:", error);
        return new Response(JSON.stringify({
            error: "Failed to generate topic content",
            details: error instanceof Error ? error.message : "Unknown error"
        }), {
            status: 500,
            headers: {
                "Content-Type": "application/json"
            }
        });
    }
}
function getContentExamples(language) {
    const lower = language.toLowerCase();
    if (lower.includes("english") || lower.includes("ingliz")) {
        return `Example for English:
{
  "explanation": "The present simple tense is used to describe habits, general truths, and repeated actions...",
  "examples": ["I work every day", "She speaks English fluently", "They play football on Sundays"],
  "grammar": "Form: Subject + base verb (+ s/es for he/she/it)",
  "tasks": [{"question": "Choose the correct form: He ___ to school every day", "type": "multiple-choice", "options": ["go", "goes", "going", "went"], "answer": "goes"}],
  "story": "John wakes up at 7 AM every morning. He brushes his teeth and eats breakfast..."
}`;
    }
    if (lower.includes("spanish")) {
        return `Ejemplo para español:
{
  "explanation": "El presente simple se usa para describir hábitos, verdades generales y acciones repetidas...",
  "examples": ["Trabajo todos los días", "Ella habla inglés con fluidez", "Ellos juegan fútbol los domingos"],
  "grammar": "Forma: Sujeto + verbo conjugado",
  "tasks": [{"question": "Elige la forma correcta: Él ___ a la escuela todos los días", "type": "multiple-choice", "options": ["ir", "va", "yendo", "fue"], "answer": "va"}]
}`;
    }
    return `Write ALL content in ${language} language.`;
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__50142bf4._.js.map