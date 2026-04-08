import { GoogleGenAI } from "@google/genai";

// Initialize with a fallback to avoid crashing on load if key is missing
const apiKey = process.env.GEMINI_API_KEY || "";
const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

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
  // If API Key is missing, use local rule-based logic
  if (!apiKey || !ai) {
    return getLocalSpiritualAnalysis(data);
  }

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
    return getLocalSpiritualAnalysis(data); // Fallback to local logic on error
  }
}

function getLocalSpiritualAnalysis(data: any) {
  const { element, zodiac, abjadName, purpose } = data;

  const personalityMap: any = {
    'آتشی (Fire)': 'آپ کی شخصیت میں جوش اور ولولہ کوٹ کوٹ کر بھرا ہوا ہے۔ آپ ایک لیڈر کی طرح سوچتے ہیں اور کسی بھی کام کو ادھورا چھوڑنا آپ کی فطرت میں نہیں۔ آپ کا مزاج تھوڑا گرم ہو سکتا ہے لیکن آپ دل کے صاف ہیں۔',
    'بادی (Air)': 'آپ ایک مفکر اور دانشور انسان ہیں۔ آپ کی سوچ بہت گہری ہے اور آپ نئی چیزیں سیکھنے کے شوقین ہیں۔ آپ کا مزاج متغیر رہتا ہے لیکن آپ کی گفتگو میں ایک خاص کشش پائی جاتی ہے۔',
    'آبی (Water)': 'آپ ایک حساس اور ہمدرد انسان ہیں۔ آپ دوسروں کے دکھ درد کو محسوس کرتے ہیں اور آپ کی روحانی بصیرت بہت تیز ہے۔ آپ کا مزاج ٹھنڈا ہے لیکن آپ کے اندر جذبات کا سمندر ٹھاٹھیں مار رہا ہے۔',
    'خاکی (Earth)': 'آپ ایک عملی اور حقیقت پسند انسان ہیں۔ آپ محنت پر یقین رکھتے ہیں اور آپ کی شخصیت میں ایک خاص ٹھہراؤ ہے۔ آپ وفادار ہیں اور رشتوں کو نبھانا جانتے ہیں۔'
  };

  const strengthMap: any = {
    'حمل': 'آپ کی سب سے بڑی قوت آپ کی ہمت ہے۔ آپ کسی بھی چیلنج سے نہیں ڈرتے۔ کمزوری یہ ہے کہ آپ جلد بازی میں فیصلے کر لیتے ہیں۔',
    'ثور': 'آپ کی قوت آپ کا صبر اور استقامت ہے۔ کمزوری یہ ہے کہ آپ کبھی کبھی بہت ضدی ہو جاتے ہیں۔',
    'جوزا': 'آپ کی قوت آپ کی ذہانت اور بات چیت کا فن ہے۔ کمزوری یہ ہے کہ آپ ایک وقت میں کئی کاموں میں الجھ جاتے ہیں۔',
    'سرطان': 'آپ کی قوت آپ کی وفاداری اور محبت ہے۔ کمزوری یہ ہے کہ آپ بہت جلد جذباتی ہو جاتے ہیں۔',
    'اسد': 'آپ کی قوت آپ کا اعتماد اور سخاوت ہے۔ کمزوری یہ ہے کہ آپ تعریف کے بہت بھوکے ہیں۔',
    'سنبلہ': 'آپ کی قوت آپ کی باریک بینی اور ترتیب ہے۔ کمزوری یہ ہے کہ آپ خود پر بہت زیادہ تنقید کرتے ہیں۔',
    'میزان': 'آپ کی قوت آپ کا انصاف اور توازن ہے۔ کمزوری یہ ہے کہ آپ فیصلے کرنے میں بہت وقت لیتے ہیں۔',
    'عقرب': 'آپ کی قوت آپ کا ارادہ اور گہرائی ہے۔ کمزوری یہ ہے کہ آپ بہت جلد شک کرنے لگتے ہیں۔',
    'قوس': 'آپ کی قوت آپ کی سچائی اور مہم جوئی ہے۔ کمزوری یہ ہے کہ آپ کبھی کبھی بہت لاپرواہ ہو جاتے ہیں۔',
    'جدی': 'آپ کی قوت آپ کی نظم و ضبط اور محنت ہے۔ کمزوری یہ ہے کہ آپ بہت زیادہ سنجیدہ رہتے ہیں۔',
    'دلو': 'آپ کی قوت آپ کی انفرادیت اور انسانیت ہے۔ کمزوری یہ ہے کہ آپ لوگوں سے کٹ کر رہنا پسند کرتے ہیں۔',
    'حوت': 'آپ کی قوت آپ کی تخلیقی صلاحیت اور روحانیت ہے۔ کمزوری یہ ہے کہ آپ خوابوں کی دنیا میں زیادہ رہتے ہیں۔'
  };

  const wazifaMap: any = {
    'آتشی (Fire)': 'یا سلامُ، یا مومنُ (111 مرتبہ روزانہ)۔ یہ وظیفہ آپ کے غصے کو ٹھنڈا کرے گا اور سکون عطا کرے گا۔',
    'بادی (Air)': 'یا علیمُ، یا خبیرُ (313 مرتبہ روزانہ)۔ یہ وظیفہ آپ کی سوچ کو وسعت دے گا اور ذہنی الجھنیں دور کرے گا۔',
    'آبی (Water)': 'یا لطیفُ، یا ودودُ (101 مرتبہ روزانہ)۔ یہ وظیفہ آپ کے دل کو سکون دے گا اور محبت پیدا کرے گا۔',
    'خاکی (Earth)': 'یا رزاقُ، یا فتاحُ (308 مرتبہ روزانہ)۔ یہ وظیفہ آپ کے کاموں میں برکت اور کامیابی لائے گا۔'
  };

  const luckyMap: any = {
    'حمل': 'سرخ، یاقوت، منگل',
    'ثور': 'سفید، زمرد، جمعہ',
    'جوزا': 'سبز، عقیق، بدھ',
    'سرطان': 'سلور، موتی، پیر',
    'اسد': 'سنہرا، روبی، اتوار',
    'سنبلہ': 'نیلا، نیلم، بدھ',
    'میزان': 'گلابی، اوپل، جمعہ',
    'عقرب': 'سیاہ، مرجان، منگل',
    'قوس': 'پیلا، پکھراج، جمعرات',
    'جدی': 'بھورا، گارنیٹ، ہفتہ',
    'دلو': 'آسمانی، فیروزہ، ہفتہ',
    'حوت': 'جامنی، ایمتھسٹ، جمعرات'
  };

  let analysis = `
[شخصیت اور مزاج]
${personalityMap[element] || 'آپ کی شخصیت متوازن ہے اور آپ زندگی کے ہر پہلو کو سمجھنے کی صلاحیت رکھتے ہیں۔'}

[روحانی قوتیں اور کمزوریاں]
${strengthMap[zodiac] || 'آپ کی روحانی قوتیں آپ کے ارادے میں پوشیدہ ہیں۔ آپ کو اپنی کمزوریوں پر قابو پانے کے لیے مراقبہ کی ضرورت ہے۔'}

[مستقبل کی رہنمائی]
آنے والا وقت آپ کے لیے نئی راہیں کھولے گا۔ آپ کو اپنے فیصلوں میں حکمت اور دانائی سے کام لینا ہوگا۔ صدقہ و خیرات کو اپنا معمول بنائیں تاکہ آنے والی رکاوٹیں دور ہوں۔

[تجویز کردہ روحانی عمل اور وظائف]
${purpose ? `آپ کے خاص مقصد (${purpose}) کے لیے: ` : ''}
${wazifaMap[element] || 'یا اللہ، یا رحمن (100 مرتبہ روزانہ)۔'}
پنجوقتہ نماز کی پابندی کریں اور تلاوت قرآن پاک کو اپنا معمول بنائیں۔

[خوش قسمت رنگ، پتھر اور دن]
رنگ، پتھر اور دن: ${luckyMap[zodiac] || 'سبز، عقیق، جمعہ'}
  `;

  return analysis.trim();
}
