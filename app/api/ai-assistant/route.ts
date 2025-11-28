import { streamText } from "ai"

export async function POST(request: Request) {
  const { question, topic, course, context } = await request.json()

  const prompt = `Sen til o'rganish assistantisan. Foydalanuvchi ${course.targetLanguage} tilini o'rganmoqda (${course.level} daraja).

HOZIRGI MAVZU: ${topic.title}
MAVZU TAVSIFI: ${topic.description}

${context ? `MAVZU KONTENTI:\n${context}\n` : ""}

FOYDALANUVCHI SAVOLI: ${question}

Qisqa, aniq va foydali javob ber. Agar so'ralsa, qo'shimcha misollar keltir. Javobni o'zbek tilida ber, lekin o'rganilayotgan til misollarini ${course.targetLanguage} tilida yoz.`

  const result = streamText({
    model: "openai/gpt-4o-mini",
    prompt,
    maxTokens: 1000,
  })

  return result.toTextStreamResponse()
}
