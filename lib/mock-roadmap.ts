import type { Course, TopicContent } from "./types"

interface MockTopic {
  title: string
  description: string
  content: TopicContent
}

interface MockModule {
  title: string
  description: string
  topics: MockTopic[]
}

function generateTopicContent(title: string, description: string, level: string): TopicContent {
  const isBasic = level === "A1" || level === "A2"

  return {
    explanation: `# ${title}\n\n${description}\n\n## Asosiy tushuncha\n\nBu mavzuda siz ${title.toLowerCase()} haqida o'rganasiz. ${isBasic ? "Boshlang'ich daraja uchun soddalashtirilgan tushuntirishlar berilgan." : "O'rta daraja uchun chuqurroq ma'lumotlar berilgan."}\n\n### Muhim nuqtalar:\n- Grammatik qoidalar va ularning qo'llanilishi\n- Kundalik hayotda ishlatish usullari\n- Eng ko'p uchraydigan xatolar va ulardan qochish\n\n## Qo'shimcha ma'lumot\n\nUshbu mavzuni o'zlashtirgandan so'ng, siz mustaqil ravishda gaplar tuza olasiz va muloqotda ishonchli his qilasiz.`,
    examples: [
      `Misol 1: "${isBasic ? "Hello, my name is..." : "I would like to introduce myself..."}"`,
      `Misol 2: "${isBasic ? "How are you today?" : "How have you been lately?"}"`,
      `Misol 3: "${isBasic ? "Nice to meet you" : "It's a pleasure to make your acquaintance"}"`,
      `Misol 4: "${isBasic ? "I am from Uzbekistan" : "I originally come from Uzbekistan"}"`,
    ],
    grammar: `## Grammatika qoidalari\n\n### Asosiy struktura:\n${isBasic ? "Subject + Verb + Object\n\nMisol: I (subject) + eat (verb) + apple (object)" : "Subject + Auxiliary + Main Verb + Object\n\nMisol: I (subject) + have been (auxiliary) + studying (main verb) + English (object)"}\n\n### Esda tuting:\n- Gap boshida katta harf ishlatiladi\n- Gap oxirida nuqta qo'yiladi\n- So'z tartibiga e'tibor bering`,
    tasks: [
      {
        id: crypto.randomUUID(),
        question: isBasic ? '"Hello" so\'zining tarjimasi nima?' : '"Would you mind" iborasining ma\'nosi nima?',
        type: "multiple-choice",
        options: isBasic
          ? ["Salom", "Xayr", "Rahmat", "Kechirasiz"]
          : ["Qarshi bo'lmaysizmi", "Men xohlayman", "Men o'ylayman", "Men bilaman"],
        answer: isBasic ? "Salom" : "Qarshi bo'lmaysizmi",
      },
      {
        id: crypto.randomUUID(),
        question: isBasic
          ? "Bo'sh joyni to'ldiring: I ___ a student."
          : "Bo'sh joyni to'ldiring: I have ___ studying for 3 hours.",
        type: "fill-blank",
        answer: isBasic ? "am" : "been",
      },
      {
        id: crypto.randomUUID(),
        question: isBasic
          ? '"Men o\'quvchiman" gapini ingliz tiliga tarjima qiling'
          : '"Men 5 yildan beri ingliz tili o\'rganaman" gapini tarjima qiling',
        type: "translate",
        answer: isBasic ? "I am a student" : "I have been learning English for 5 years",
      },
    ],
    story: `## Qisqa hikoya\n\n${
      isBasic
        ? 'Ali yangi o\'quvchi. U har kuni maktabga boradi. Uning do\'sti Aziz bilan birga o\'qishni yaxshi ko\'radi. Ular ingliz tili darslarini juda qiziq deb o\'ylashadi.\n\n"Hello, Aziz!" - dedi Ali.\n"Hi, Ali! How are you?" - javob berdi Aziz.\n"I am fine, thank you!" - dedi Ali tabassim bilan.'
        : 'Last week, I had an interesting experience at the international conference. While I was presenting my project, a professor from London asked me a challenging question. I had been preparing for such questions, so I was able to respond confidently.\n\n"Your research is fascinating," he said. "Have you considered expanding it?"\n"I have been thinking about it for some time," I replied.'
    }`,
    notes: "",
  }
}

// Template roadmaps for different levels with content
const englishA1Roadmap: MockModule[] = [
  {
    title: "Asosiy So'zlar va Iboralar",
    description: "Kundalik hayotda ishlatiladigan eng muhim so'zlar va iboralar",
    topics: [
      {
        title: "Salomlashish va tanishish",
        description: "Hello, Hi, Nice to meet you kabi asosiy iboralar",
        content: generateTopicContent(
          "Salomlashish va tanishish",
          "Hello, Hi, Nice to meet you kabi asosiy iboralar",
          "A1",
        ),
      },
      {
        title: "Raqamlar 1-100",
        description: "Sonlarni o'qish va yozish",
        content: generateTopicContent("Raqamlar 1-100", "Sonlarni o'qish va yozish", "A1"),
      },
      {
        title: "Ranglar",
        description: "Asosiy ranglar: red, blue, green, yellow...",
        content: generateTopicContent("Ranglar", "Asosiy ranglar: red, blue, green, yellow...", "A1"),
      },
      {
        title: "Oila a'zolari",
        description: "Mother, father, sister, brother...",
        content: generateTopicContent("Oila a'zolari", "Mother, father, sister, brother...", "A1"),
      },
      {
        title: "Kundalik buyumlar",
        description: "Table, chair, book, phone kabi so'zlar",
        content: generateTopicContent("Kundalik buyumlar", "Table, chair, book, phone kabi so'zlar", "A1"),
      },
    ],
  },
  {
    title: "To be Fe'li",
    description: "Ingliz tilining eng muhim fe'li - to be",
    topics: [
      {
        title: "I am, You are, He/She is",
        description: "To be fe'lining asosiy shakllari",
        content: generateTopicContent("I am, You are, He/She is", "To be fe'lining asosiy shakllari", "A1"),
      },
      {
        title: "Inkor shakli: am not, aren't, isn't",
        description: "Inkor gaplar tuzish",
        content: generateTopicContent("Inkor shakli", "Inkor gaplar tuzish", "A1"),
      },
      {
        title: "Savol shakli: Are you...? Is he...?",
        description: "Savol gaplar tuzish",
        content: generateTopicContent("Savol shakli", "Savol gaplar tuzish", "A1"),
      },
      {
        title: "Qisqa javoblar",
        description: "Yes, I am. No, he isn't.",
        content: generateTopicContent("Qisqa javoblar", "Yes, I am. No, he isn't.", "A1"),
      },
      {
        title: "Mashqlar: O'zingiz haqida gapirib bering",
        description: "Amaliy mashqlar",
        content: generateTopicContent("Amaliy mashqlar", "O'zingiz haqida gapirib bering", "A1"),
      },
    ],
  },
  {
    title: "Oddiy Hozirgi Zamon",
    description: "Present Simple - kundalik harakatlarni ifodalash",
    topics: [
      {
        title: "Present Simple asoslari",
        description: "I work, You study, They play...",
        content: generateTopicContent("Present Simple asoslari", "I work, You study, They play...", "A1"),
      },
      {
        title: "He/She/It uchun -s/-es",
        description: "He works, She studies...",
        content: generateTopicContent("He/She/It uchun -s/-es", "He works, She studies...", "A1"),
      },
      {
        title: "Do/Does bilan savollar",
        description: "Do you work? Does she study?",
        content: generateTopicContent("Do/Does bilan savollar", "Do you work? Does she study?", "A1"),
      },
      {
        title: "Don't/Doesn't bilan inkor",
        description: "I don't work, He doesn't study",
        content: generateTopicContent("Don't/Doesn't bilan inkor", "I don't work, He doesn't study", "A1"),
      },
      {
        title: "Kundalik tartib haqida gapirish",
        description: "I wake up at 7. I go to work at 9.",
        content: generateTopicContent("Kundalik tartib", "I wake up at 7. I go to work at 9.", "A1"),
      },
    ],
  },
  {
    title: "Asosiy Gap Tuzish",
    description: "To'g'ri gap strukturasi va so'z tartibi",
    topics: [
      {
        title: "Subject + Verb + Object",
        description: "Asosiy gap strukturasi",
        content: generateTopicContent("Subject + Verb + Object", "Asosiy gap strukturasi", "A1"),
      },
      {
        title: "Sifatlar: big, small, good, bad",
        description: "Sifatlarni qo'llash",
        content: generateTopicContent("Sifatlar", "big, small, good, bad", "A1"),
      },
      {
        title: "This/That, These/Those",
        description: "Ko'rsatish olmoshlari",
        content: generateTopicContent("Ko'rsatish olmoshlari", "This/That, These/Those", "A1"),
      },
      {
        title: "A/An va The",
        description: "Artikllarni to'g'ri ishlatish",
        content: generateTopicContent("Artikllar", "A/An va The ishlatish", "A1"),
      },
      {
        title: "Amaliy yozuv mashqlari",
        description: "Oddiy gaplar yozish",
        content: generateTopicContent("Yozuv mashqlari", "Oddiy gaplar yozish", "A1"),
      },
    ],
  },
  {
    title: "Kundalik Muloqot",
    description: "Hayotda kerak bo'ladigan asosiy dialoglar",
    topics: [
      {
        title: "Do'konda xarid qilish",
        description: "How much? I'd like... Can I have...?",
        content: generateTopicContent("Do'konda xarid qilish", "How much? I'd like... Can I have...?", "A1"),
      },
      {
        title: "Yo'l so'rash va ko'rsatish",
        description: "Where is...? Turn left/right...",
        content: generateTopicContent("Yo'l so'rash", "Where is...? Turn left/right...", "A1"),
      },
      {
        title: "Restoranda buyurtma berish",
        description: "I'd like... Can I have...?",
        content: generateTopicContent("Restoranda buyurtma", "I'd like... Can I have...?", "A1"),
      },
      {
        title: "Telefon orqali gaplashish",
        description: "Hello, this is... May I speak to...?",
        content: generateTopicContent("Telefon muloqoti", "Hello, this is... May I speak to...?", "A1"),
      },
      {
        title: "Yakun: Barcha mavzularni takrorlash",
        description: "Umumiy takrorlash",
        content: generateTopicContent("Umumiy takrorlash", "Barcha mavzularni takrorlash", "A1"),
      },
    ],
  },
]

const englishA2Roadmap: MockModule[] = [
  {
    title: "O'tgan Zamon (Past Simple)",
    description: "O'tmishdagi voqealarni ifodalash",
    topics: [
      {
        title: "Was/Were ishlatish",
        description: "I was, You were, They were...",
        content: generateTopicContent("Was/Were ishlatish", "I was, You were, They were...", "A2"),
      },
      {
        title: "Regular verbs: -ed qo'shish",
        description: "worked, played, studied...",
        content: generateTopicContent("Regular verbs", "worked, played, studied...", "A2"),
      },
      {
        title: "Irregular verbs",
        description: "went, saw, did, made...",
        content: generateTopicContent("Irregular verbs", "went, saw, did, made...", "A2"),
      },
      {
        title: "Did bilan savollar",
        description: "Did you go? Did she see?",
        content: generateTopicContent("Did bilan savollar", "Did you go? Did she see?", "A2"),
      },
      {
        title: "Didn't bilan inkor",
        description: "I didn't go, She didn't see",
        content: generateTopicContent("Didn't bilan inkor", "I didn't go, She didn't see", "A2"),
      },
      {
        title: "Hikoya qilish: O'tgan hafta nima qildingiz?",
        description: "Amaliy mashq",
        content: generateTopicContent("Hikoya qilish", "O'tgan hafta nima qildingiz?", "A2"),
      },
    ],
  },
  {
    title: "Kelasi Zamon (Future)",
    description: "Kelajak haqida gapirish",
    topics: [
      {
        title: "Will ishlatish",
        description: "I will go, She will help...",
        content: generateTopicContent("Will ishlatish", "I will go, She will help...", "A2"),
      },
      {
        title: "Going to ishlatish",
        description: "I'm going to study...",
        content: generateTopicContent("Going to ishlatish", "I'm going to study...", "A2"),
      },
      {
        title: "Will vs Going to farqi",
        description: "Qachon qaysi birini ishlatish",
        content: generateTopicContent("Will vs Going to", "Qachon qaysi birini ishlatish", "A2"),
      },
      {
        title: "Savol va inkor shakllari",
        description: "Will you...? Won't he...?",
        content: generateTopicContent("Savol va inkor", "Will you...? Won't he...?", "A2"),
      },
      {
        title: "Rejalar haqida gapirish",
        description: "Kelajak rejalaringiz",
        content: generateTopicContent("Rejalar haqida gapirish", "Kelajak rejalaringiz", "A2"),
      },
      {
        title: "Bashorat qilish",
        description: "I think it will rain...",
        content: generateTopicContent("Bashorat qilish", "I think it will rain...", "A2"),
      },
    ],
  },
  {
    title: "Davom Etuvchi Zamonlar",
    description: "Continuous/Progressive tenses",
    topics: [
      {
        title: "Present Continuous",
        description: "I am working, She is studying...",
        content: generateTopicContent("Present Continuous", "I am working, She is studying...", "A2"),
      },
      {
        title: "Past Continuous",
        description: "I was working when...",
        content: generateTopicContent("Past Continuous", "I was working when...", "A2"),
      },
      {
        title: "Present Simple vs Continuous farqi",
        description: "I work vs I am working",
        content: generateTopicContent("Simple vs Continuous", "I work vs I am working", "A2"),
      },
      {
        title: "Hozir nima qilayotganingizni tasvirlash",
        description: "Amaliy mashq",
        content: generateTopicContent("Amaliy mashq", "Hozir nima qilayotganingizni tasvirlash", "A2"),
      },
      {
        title: "Past Simple vs Past Continuous",
        description: "Qachon qaysi birini ishlatish",
        content: generateTopicContent("Past Simple vs Continuous", "Qachon qaysi birini ishlatish", "A2"),
      },
      {
        title: "Voqealarni tasvirlash",
        description: "Hikoya qilish",
        content: generateTopicContent("Voqealarni tasvirlash", "Hikoya qilish", "A2"),
      },
    ],
  },
  {
    title: "Modal Fe'llar",
    description: "Can, Could, Should, Must, May",
    topics: [
      {
        title: "Can - qobiliyat va imkoniyat",
        description: "I can swim, Can you help?",
        content: generateTopicContent("Can ishlatish", "I can swim, Can you help?", "A2"),
      },
      {
        title: "Could - iltimos va o'tmishdagi qobiliyat",
        description: "Could you...? I could swim",
        content: generateTopicContent("Could ishlatish", "Could you...? I could swim", "A2"),
      },
      {
        title: "Should - maslahat",
        description: "You should study more",
        content: generateTopicContent("Should ishlatish", "You should study more", "A2"),
      },
      {
        title: "Must - majburiyat",
        description: "You must be on time",
        content: generateTopicContent("Must ishlatish", "You must be on time", "A2"),
      },
      {
        title: "May/Might - ehtimollik",
        description: "It may rain tomorrow",
        content: generateTopicContent("May/Might ishlatish", "It may rain tomorrow", "A2"),
      },
      {
        title: "Amaliy dialoglar",
        description: "Modal fe'llarni qo'llash",
        content: generateTopicContent("Amaliy dialoglar", "Modal fe'llarni qo'llash", "A2"),
      },
    ],
  },
  {
    title: "Murakkab Gap Tuzilmalari",
    description: "Bog'lovchilar va murakkab gaplar",
    topics: [
      {
        title: "And, But, Or, So, Because",
        description: "Gaplarni bog'lash",
        content: generateTopicContent("Bog'lovchilar", "And, But, Or, So, Because", "A2"),
      },
      {
        title: "When, While, Before, After",
        description: "Vaqt bog'lovchilari",
        content: generateTopicContent("Vaqt bog'lovchilari", "When, While, Before, After", "A2"),
      },
      {
        title: "If - shart gaplar (0 va 1-tur)",
        description: "If it rains, I will stay home",
        content: generateTopicContent("Shart gaplar", "If it rains, I will stay home", "A2"),
      },
      {
        title: "Although, However",
        description: "Qarama-qarshilik ifodalash",
        content: generateTopicContent("Qarama-qarshilik", "Although, However", "A2"),
      },
      {
        title: "Relative clauses: who, which, that",
        description: "Aniqlovchi ergash gaplar",
        content: generateTopicContent("Relative clauses", "who, which, that", "A2"),
      },
      {
        title: "Matn yozish",
        description: "Paragraf yozish ko'nikmalari",
        content: generateTopicContent("Matn yozish", "Paragraf yozish ko'nikmalari", "A2"),
      },
    ],
  },
  {
    title: "Kengaytirilgan Lug'at",
    description: "Mavzulashtirilgan so'z boyligi",
    topics: [
      {
        title: "Ish va kasb so'zlari",
        description: "Office, meeting, deadline, project...",
        content: generateTopicContent("Ish va kasb", "Office, meeting, deadline, project...", "A2"),
      },
      {
        title: "Sayohat va transport",
        description: "Airport, flight, hotel, reservation...",
        content: generateTopicContent("Sayohat va transport", "Airport, flight, hotel, reservation...", "A2"),
      },
      {
        title: "Sog'liq va tibbiyot",
        description: "Doctor, medicine, symptom, prescription...",
        content: generateTopicContent("Sog'liq va tibbiyot", "Doctor, medicine, symptom, prescription...", "A2"),
      },
      {
        title: "Ta'lim va o'qish",
        description: "University, course, exam, degree...",
        content: generateTopicContent("Ta'lim va o'qish", "University, course, exam, degree...", "A2"),
      },
      {
        title: "Texnologiya so'zlari",
        description: "Computer, software, download, app...",
        content: generateTopicContent("Texnologiya so'zlari", "Computer, software, download, app...", "A2"),
      },
      {
        title: "Idiomalar va iboralar",
        description: "Break the ice, piece of cake...",
        content: generateTopicContent("Idiomalar", "Break the ice, piece of cake...", "A2"),
      },
    ],
  },
]

const englishB1Roadmap: MockModule[] = [
  {
    title: "Mukammal Zamonlar (Perfect Tenses)",
    description: "Present Perfect va Past Perfect",
    topics: [
      {
        title: "Present Perfect asoslari",
        description: "I have done, She has seen...",
        content: generateTopicContent("Present Perfect", "I have done, She has seen...", "B1"),
      },
      {
        title: "Have/Has + Past Participle",
        description: "Regular va irregular forms",
        content: generateTopicContent("Past Participle", "Regular va irregular forms", "B1"),
      },
      {
        title: "Present Perfect vs Past Simple",
        description: "Muhim farqlarni tushunish",
        content: generateTopicContent("Perfect vs Simple", "Muhim farqlarni tushunish", "B1"),
      },
      {
        title: "For va Since ishlatish",
        description: "For 3 years, Since 2020...",
        content: generateTopicContent("For va Since", "For 3 years, Since 2020...", "B1"),
      },
      {
        title: "Past Perfect",
        description: "I had done before...",
        content: generateTopicContent("Past Perfect", "I had done before...", "B1"),
      },
      {
        title: "Already, Yet, Just, Ever, Never",
        description: "Narechiyalar bilan ishlatish",
        content: generateTopicContent("Narechiyalar", "Already, Yet, Just, Ever, Never", "B1"),
      },
      {
        title: "Tajriba haqida gapirish",
        description: "Have you ever...?",
        content: generateTopicContent("Tajriba haqida", "Have you ever...?", "B1"),
      },
    ],
  },
  {
    title: "Shart Gaplar (Conditionals)",
    description: "If gaplarning barcha turlari",
    topics: [
      {
        title: "Zero Conditional",
        description: "If you heat water, it boils",
        content: generateTopicContent("Zero Conditional", "If you heat water, it boils", "B1"),
      },
      {
        title: "First Conditional",
        description: "If it rains, I will stay home",
        content: generateTopicContent("First Conditional", "If it rains, I will stay home", "B1"),
      },
      {
        title: "Second Conditional",
        description: "If I were rich, I would travel",
        content: generateTopicContent("Second Conditional", "If I were rich, I would travel", "B1"),
      },
      {
        title: "Third Conditional",
        description: "If I had known, I would have come",
        content: generateTopicContent("Third Conditional", "If I had known, I would have come", "B1"),
      },
      {
        title: "Mixed Conditionals",
        description: "Aralash shart gaplar",
        content: generateTopicContent("Mixed Conditionals", "Aralash shart gaplar", "B1"),
      },
      {
        title: "Unless, In case, As long as",
        description: "Boshqa shart iboralari",
        content: generateTopicContent("Shart iboralari", "Unless, In case, As long as", "B1"),
      },
      {
        title: "Amaliy mashqlar",
        description: "Shart gaplarni qo'llash",
        content: generateTopicContent("Amaliy mashqlar", "Shart gaplarni qo'llash", "B1"),
      },
    ],
  },
  {
    title: "Majhul Daraja (Passive Voice)",
    description: "Passive gaplar tuzish",
    topics: [
      {
        title: "Passive asoslari",
        description: "Active vs Passive",
        content: generateTopicContent("Passive asoslari", "Active vs Passive", "B1"),
      },
      {
        title: "Present Simple Passive",
        description: "English is spoken...",
        content: generateTopicContent("Present Simple Passive", "English is spoken...", "B1"),
      },
      {
        title: "Past Simple Passive",
        description: "The book was written...",
        content: generateTopicContent("Past Simple Passive", "The book was written...", "B1"),
      },
      {
        title: "Present Perfect Passive",
        description: "It has been done...",
        content: generateTopicContent("Perfect Passive", "It has been done...", "B1"),
      },
      {
        title: "Modal + Passive",
        description: "It can be done, must be finished...",
        content: generateTopicContent("Modal Passive", "It can be done, must be finished...", "B1"),
      },
      {
        title: "By + agent",
        description: "The book was written by...",
        content: generateTopicContent("By agent", "The book was written by...", "B1"),
      },
      {
        title: "Amaliy mashqlar",
        description: "Passive gaplarni qo'llash",
        content: generateTopicContent("Passive mashqlar", "Passive gaplarni qo'llash", "B1"),
      },
    ],
  },
  {
    title: "Reported Speech",
    description: "O'zlashtirma nutq",
    topics: [
      {
        title: "Direct vs Indirect speech",
        description: "He said, 'I am...' vs He said that he was...",
        content: generateTopicContent("Direct vs Indirect", "He said, 'I am...' vs He said that he was...", "B1"),
      },
      {
        title: "Zamon o'zgarishlari",
        description: "Backshift rules",
        content: generateTopicContent("Zamon o'zgarishlari", "Backshift rules", "B1"),
      },
      {
        title: "Olmosh va vaqt o'zgarishlari",
        description: "today → that day, here → there",
        content: generateTopicContent("Olmosh o'zgarishlari", "today → that day, here → there", "B1"),
      },
      {
        title: "Say vs Tell",
        description: "Farqlarni tushunish",
        content: generateTopicContent("Say vs Tell", "Farqlarni tushunish", "B1"),
      },
      {
        title: "Reported questions",
        description: "She asked if/whether...",
        content: generateTopicContent("Reported questions", "She asked if/whether...", "B1"),
      },
      {
        title: "Reporting verbs",
        description: "suggest, advise, promise, refuse...",
        content: generateTopicContent("Reporting verbs", "suggest, advise, promise, refuse...", "B1"),
      },
    ],
  },
  {
    title: "Ilg'or Grammatika",
    description: "Murakkab grammatik strukturalar",
    topics: [
      {
        title: "Gerunds vs Infinitives",
        description: "I enjoy swimming vs I want to swim",
        content: generateTopicContent("Gerunds vs Infinitives", "I enjoy swimming vs I want to swim", "B1"),
      },
      {
        title: "Verb patterns",
        description: "stop doing vs stop to do",
        content: generateTopicContent("Verb patterns", "stop doing vs stop to do", "B1"),
      },
      {
        title: "Causative: have/get something done",
        description: "I had my car repaired",
        content: generateTopicContent("Causative", "I had my car repaired", "B1"),
      },
      {
        title: "Relative clauses (defining/non-defining)",
        description: "Vergul bilan va vergulsiz",
        content: generateTopicContent("Relative clauses", "Vergul bilan va vergulsiz", "B1"),
      },
      {
        title: "Participle clauses",
        description: "Walking down the street, I saw...",
        content: generateTopicContent("Participle clauses", "Walking down the street, I saw...", "B1"),
      },
      {
        title: "Emphasis: It is/was... that",
        description: "It was John who called",
        content: generateTopicContent("Emphasis", "It was John who called", "B1"),
      },
    ],
  },
  {
    title: "Akademik va Professional Ingliz Tili",
    description: "Rasmiy til ko'nikmalari",
    topics: [
      {
        title: "Formal vs Informal language",
        description: "Uslub farqlari",
        content: generateTopicContent("Formal vs Informal", "Uslub farqlari", "B1"),
      },
      {
        title: "Business vocabulary",
        description: "Biznes atamalar",
        content: generateTopicContent("Business vocabulary", "Biznes atamalar", "B1"),
      },
      {
        title: "Email va xat yozish",
        description: "Professional yozma muloqot",
        content: generateTopicContent("Email yozish", "Professional yozma muloqot", "B1"),
      },
      {
        title: "Presentation skills",
        description: "Taqdimot qilish",
        content: generateTopicContent("Presentation skills", "Taqdimot qilish", "B1"),
      },
      {
        title: "Debate va munozara",
        description: "Fikr bildirish iboralari",
        content: generateTopicContent("Debate va munozara", "Fikr bildirish iboralari", "B1"),
      },
      {
        title: "Essay yozish",
        description: "Insho strukturasi va uslubi",
        content: generateTopicContent("Essay yozish", "Insho strukturasi va uslubi", "B1"),
      },
    ],
  },
]

// Generate roadmap based on course settings
export function generateMockRoadmap(course: Course): MockModule[] {
  let baseRoadmap: MockModule[]

  if (course.level === "A1") {
    baseRoadmap = englishA1Roadmap
  } else if (course.level === "A2") {
    baseRoadmap = englishA2Roadmap
  } else {
    baseRoadmap = englishB1Roadmap
  }

  const moduleCount = getModuleCount(course.level, course.dailyTime)
  let roadmap = baseRoadmap.slice(0, moduleCount)

  const topicsPerModule = getTopicsPerModule(course.dailyTime)
  roadmap = roadmap.map((module) => ({
    ...module,
    topics: module.topics.slice(0, topicsPerModule),
  }))

  if (course.interests.includes("IT va texnologiya") || course.profession?.toLowerCase().includes("it")) {
    roadmap = addITTopics(roadmap, course.level)
  }
  if (course.interests.includes("Biznes") || course.profession?.toLowerCase().includes("biznes")) {
    roadmap = addBusinessTopics(roadmap, course.level)
  }

  return roadmap
}

function addITTopics(roadmap: MockModule[], level: string): MockModule[] {
  return roadmap.map((module, index) => {
    if (index === roadmap.length - 1) {
      return {
        ...module,
        topics: [
          ...module.topics,
          {
            title: "IT sohasida muloqot",
            description: "Dasturlash, kompyuter va texnologiya haqida gapirish",
            content: generateTopicContent(
              "IT sohasida muloqot",
              "Dasturlash, kompyuter va texnologiya haqida gapirish",
              level,
            ),
          },
        ],
      }
    }
    return module
  })
}

function addBusinessTopics(roadmap: MockModule[], level: string): MockModule[] {
  return roadmap.map((module, index) => {
    if (index === roadmap.length - 1) {
      return {
        ...module,
        topics: [
          ...module.topics,
          {
            title: "Biznes muzokaralar",
            description: "Uchrashuvlar, taqdimotlar va muzokaralar olib borish",
            content: generateTopicContent(
              "Biznes muzokaralar",
              "Uchrashuvlar, taqdimotlar va muzokaralar olib borish",
              level,
            ),
          },
        ],
      }
    }
    return module
  })
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

  if (dailyTime >= 120) return Math.min(base + 1, 7)
  if (dailyTime >= 60) return base
  if (dailyTime <= 30) return Math.max(base - 1, 3)

  return base
}

function getTopicsPerModule(dailyTime: number): number {
  if (dailyTime >= 120) return 7
  if (dailyTime >= 60) return 6
  if (dailyTime >= 45) return 5
  return 4
}
