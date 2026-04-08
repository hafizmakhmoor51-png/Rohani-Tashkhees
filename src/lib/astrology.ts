/**
 * Astrology logic to determine Zodiac signs and elements
 */

export interface ZodiacInfo {
  sign: string;
  urduSign: string;
  element: string;
  urduElement: string;
  planet: string;
  urduPlanet: string;
}

export function getZodiacInfo(date: Date): ZodiacInfo {
  const month = date.getMonth() + 1;
  const day = date.getDate();

  if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) {
    return { sign: 'Aries', urduSign: 'حمل', element: 'Fire', urduElement: 'آتشی', planet: 'Mars', urduPlanet: 'مریخ' };
  } else if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) {
    return { sign: 'Taurus', urduSign: 'ثور', element: 'Earth', urduElement: 'خاکی', planet: 'Venus', urduPlanet: 'زہرہ' };
  } else if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) {
    return { sign: 'Gemini', urduSign: 'جوزا', element: 'Air', urduElement: 'بادی', planet: 'Mercury', urduPlanet: 'عطارد' };
  } else if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) {
    return { sign: 'Cancer', urduSign: 'سرطان', element: 'Water', urduElement: 'آبی', planet: 'Moon', urduPlanet: 'قمر' };
  } else if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) {
    return { sign: 'Leo', urduSign: 'اسد', element: 'Fire', urduElement: 'آتشی', planet: 'Sun', urduPlanet: 'شمس' };
  } else if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) {
    return { sign: 'Virgo', urduSign: 'سنبلہ', element: 'Earth', urduElement: 'خاکی', planet: 'Mercury', urduPlanet: 'عطارد' };
  } else if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) {
    return { sign: 'Libra', urduSign: 'میزان', element: 'Air', urduElement: 'بادی', planet: 'Venus', urduPlanet: 'زہرہ' };
  } else if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) {
    return { sign: 'Scorpio', urduSign: 'عقرب', element: 'Water', urduElement: 'آبی', planet: 'Mars/Pluto', urduPlanet: 'مریخ' };
  } else if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) {
    return { sign: 'Sagittarius', urduSign: 'قوس', element: 'Fire', urduElement: 'آتشی', planet: 'Jupiter', urduPlanet: 'مشتری' };
  } else if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) {
    return { sign: 'Capricorn', urduSign: 'جدی', element: 'Earth', urduElement: 'خاکی', planet: 'Saturn', urduPlanet: 'زحل' };
  } else if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) {
    return { sign: 'Aquarius', urduSign: 'دلو', element: 'Air', urduElement: 'بادی', planet: 'Saturn/Uranus', urduPlanet: 'زحل' };
  } else {
    return { sign: 'Pisces', urduSign: 'حوت', element: 'Water', urduElement: 'آبی', planet: 'Jupiter/Neptune', urduPlanet: 'مشتری' };
  }
}
