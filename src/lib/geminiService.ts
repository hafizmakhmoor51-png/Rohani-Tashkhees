import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function getSpiritualAnalysis(data: {
  name: string;
  motherName: string;
  dob: string;
  abjadName: number;
  abjadMother: number;
  zodiac: string;
  element: string;
  purpose?: string;
}) {
  const prompt = `
    You are an expert in Ilm-ul-Adad (Numerology), Ilm-e-Jafar, Ilm-e-Raml, and Astrology.
    Provide a detailed spiritual analysis (Rohani Tashkhis) in URDU for the following person:
    - Name: ${data.name} (Abjad: ${data.abjadName})
    - Mother's Name: ${data.motherName} (Abjad: ${data.abjadMother})
    - Date of Birth: ${data.dob}
    - Zodiac Sign: ${data.zodiac}
    - Element: ${data.element}
    ${data.purpose ? `- Specific Problem/Purpose: ${data.purpose}` : ""}

    The analysis should include exactly these sections with these Urdu headings:
    1. [شخصیت اور مزاج] (Personality and Temperament)
    2. [روحانی قوتیں اور کمزوریاں] (Spiritual Strengths and Weaknesses)
    3. [مستقبل کی رہنمائی] (Future Guidance)
    4. [تجویز کردہ روحانی عمل اور وظائف] (Recommended Spiritual Practices and Wazifa)
    ${data.purpose ? `   - Special focus on the problem mentioned: ${data.purpose}` : ""}
    5. [خوش قسمت رنگ، پتھر اور دن] (Lucky Colors, Stones, and Days)

    Use a mystical, respectful, and authoritative tone. Format the response in clear Urdu. Do not use markdown bolding (**) inside the Urdu text as it can sometimes mess up RTL rendering in some fonts, just use plain text with the headings provided.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
    });

    return response.text;
  } catch (error) {
    console.error("Error getting spiritual analysis:", error);
    return "معذرت، اس وقت روحانی تجزیہ حاصل کرنے میں دشواری ہو رہی ہے۔ براہ کرم دوبارہ کوشش کریں۔";
  }
}
