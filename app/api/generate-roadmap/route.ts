import { streamText } from "ai"

export async function POST(request: Request) {
  const { course, userProfile } = await request.json()

  // Calculate module count based on daily time and level
  const moduleCount = getModuleCount(course.level, course.dailyTime)
  const topicsPerModule = getTopicsPerModule(course.dailyTime)

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

JSON:`

  const result = streamText({
    model: "openai/gpt-4o-mini",
    prompt,
    maxTokens: 4000,
  })

  return result.toTextStreamResponse()
}

function getModuleCount(level: string, dailyTime: number): number {
  const baseModules: Record<string, number> = {
    A1: 4,
    A2: 5,
    B1: 6,
    B2: 6,
    C1: 5,
    C2: 4,
  }

  const base = baseModules[level] || 5

  // Adjust based on daily time
  if (dailyTime >= 120) return Math.min(base + 2, 8)
  if (dailyTime >= 60) return base + 1
  if (dailyTime <= 30) return Math.max(base - 1, 3)

  return base
}

function getTopicsPerModule(dailyTime: number): number {
  if (dailyTime >= 120) return 7
  if (dailyTime >= 60) return 6
  if (dailyTime >= 45) return 5
  return 4
}
