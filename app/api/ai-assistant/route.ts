import { Groq } from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY!,
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { question, topic, course, context } = body;

    // 🔹 Prompt tayyorlash
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

    // 🔹 Groq API ga so‘rov
    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        {
          role: "system",
          content: `Siz foydalanuvchiga til o'rganishda yordam beradigan professional assistantisiz. Javoblarni faqat O'zbek tilida, misollarni esa ${course.targetLanguage} tilida yozing.`,
        },
        { role: "user", content: prompt },
      ],
      max_tokens: 800,
      temperature: 0.6, // kamroq kreativlik, tilni o‘zgartirmasligi uchun
    });

    // 🔹 Javobni olish
    const text = completion.choices[0]?.message?.content || "Javob topilmadi";

    return new Response(text, {
      headers: { "Content-Type": "text/plain" },
    });
  } catch (err) {
    console.error("AI Error:", err);
    return new Response("Server error", { status: 500 });
  }
}
