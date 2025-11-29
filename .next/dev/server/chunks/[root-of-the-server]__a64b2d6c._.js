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
"[project]/app/api/generate-roadmap/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "POST",
    ()=>POST
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$ai$40$5$2e$0$2e$104_zod$40$3$2e$25$2e$76$2f$node_modules$2f$ai$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/ai@5.0.104_zod@3.25.76/node_modules/ai/dist/index.mjs [app-route] (ecmascript) <locals>");
;
async function POST(request) {
    const { course, userProfile } = await request.json();
    // Calculate module count based on daily time and level
    const moduleCount = getModuleCount(course.level, course.dailyTime);
    const topicsPerModule = getTopicsPerModule(course.dailyTime);
    const prompt = `Sen professional til o'rgatuvchi AI assistantsan. Quyidagi ma'lumotlar asosida til o'rganish yo'l xaritasini yarat.

FOYDALANUVCHI MA'LUMOTLARI:
- Ismi: ${userProfile.fullName}
- Kasbi: ${userProfile.profession}
- Sohasi: ${userProfile.field}
- Qiziqishlari: ${userProfile.interests.join(", ")}

KURS MA'LUMOTLARI:
- O'rganilayotgan til: ${course.targetLanguage}
- Daraja: ${course.level}
- Kunlik vaqt: ${course.dailyTime} daqiqa
- Mavzu qiziqishlari: ${course.interests.join(", ")}

TALABLAR:
1. ${moduleCount} ta modul yarat
2. Har bir modulda ${topicsPerModule} ta mavzu bo'lsin
3. Mavzular foydalanuvchining kasbiga (${userProfile.profession}) va qiziqishlariga mos misollar bilan bo'lsin
4. ${course.level} darajasiga mos qiyinchilikda bo'lsin
5. Modullar ketma-ket o'sib boruvchi qiyinchilikda bo'lsin

MUHIM: Faqat quyidagi JSON formatida javob ber, boshqa hech narsa yozma:

{
  "modules": [
    {
      "title": "Modul nomi",
      "description": "Qisqa tavsif",
      "topics": [
        {
          "title": "Mavzu nomi",
          "description": "Mavzu tavsifi"
        }
      ]
    }
  ]
}

JSON:`;
    const result = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$ai$40$5$2e$0$2e$104_zod$40$3$2e$25$2e$76$2f$node_modules$2f$ai$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["streamText"])({
        model: "openai/gpt-4o-mini",
        prompt,
        maxTokens: 4000
    });
    return result.toTextStreamResponse();
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
    // Adjust based on daily time
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

//# sourceMappingURL=%5Broot-of-the-server%5D__a64b2d6c._.js.map