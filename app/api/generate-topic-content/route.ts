import { streamText } from "ai"

export async function POST(request: Request) {
  const { topic, course, userProfile } = await request.json()

  const prompt = `Sen professional ${course.targetLanguage} tili o'qituvchisisan. Quyidagi mavzu uchun to'liq dars kontentini yarat.

MAVZU: ${topic.title}
TAVSIF: ${topic.description}

FOYDALANUVCHI:
- Kasbi: ${userProfile.profession}
- Qiziqishlari: ${userProfile.interests.join(", ")}
- Daraja: ${course.level}

TALABLAR:
1. Tushuntirish - mavzuni sodda va tushunarli qilib tushuntir (3-4 paragraf)
2. Misollar - ${userProfile.profession} kasbiga mos 5 ta amaliy misol
3. Grammatika - asosiy grammatik qoidalar (agar kerak bo'lsa)
4. Mashqlar - 3 ta interaktiv mashq
5. Qisqa hikoya - mavzu bo'yicha qisqa matn (dialog yoki hikoya)

JSON formatida javob ber:

{
  "explanation": "Mavzu tushuntirishi...",
  "examples": ["Misol 1", "Misol 2", "Misol 3", "Misol 4", "Misol 5"],
  "grammar": "Grammatika qoidalari...",
  "tasks": [
    {
      "id": "1",
      "question": "Savol matni",
      "type": "multiple-choice",
      "options": ["A variant", "B variant", "C variant", "D variant"],
      "answer": "To'g'ri javob"
    }
  ],
  "story": "Qisqa hikoya yoki dialog..."
}

JSON:`

  const result = streamText({
    model: "openai/gpt-4o-mini",
    prompt,
    maxTokens: 3000,
  })

  return result.toTextStreamResponse()
}
