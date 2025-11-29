import { Groq } from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY!,
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { question, topic, course, context } = body;

    const prompt = `
Sen til o'rganish assistantisan. Foydalanuvchi ${
      course.targetLanguage
    } tilini o'rganmoqda (${course.level} daraja).

HOZIRGI MAVZU: ${topic.title}
MAVZU TAVSIFI: ${topic.description}

${context ? `MAVZU KONTENTI:\n${context}\n` : ""}

FOYDALANUVCHI SAVOLI: ${question}

Qisqa, aniq va foydali javob ber.
Agar so'ralsa, qo'shimcha misollar keltir.
Javobni o'zbek tilida ber, lekin o'rganilayotgan til misollarini ${
      course.targetLanguage
    } tilida yoz.
`.trim();

    const completion = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      max_tokens: 800,
    });

    const text = completion.choices[0]?.message?.content || "Javob topilmadi";

    return new Response(text, {
      headers: { "Content-Type": "text/plain" },
    });
  } catch (err) {
    console.error("AI Error:", err);
    return new Response("Server error", { status: 500 });
  }
}
