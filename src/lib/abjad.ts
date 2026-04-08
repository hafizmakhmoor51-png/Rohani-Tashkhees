/**
 * Abjad calculation logic for Urdu/Arabic characters
 */

const abjadMap: Record<string, number> = {
  'ا': 1, 'آ': 1, 'ب': 2, 'پ': 2, 'ت': 400, 'ٹ': 400, 'ث': 500, 'ج': 3, 'چ': 3, 'ح': 8, 'خ': 600,
  'د': 4, 'ڈ': 4, 'ذ': 700, 'ر': 200, 'ڑ': 200, 'ز': 7, 'ژ': 7, 'س': 60, 'ش': 300, 'ص': 90, 'ض': 800,
  'ط': 9, 'ظ': 900, 'ع': 70, 'غ': 1000, 'ف': 80, 'ق': 100, 'ک': 20, 'گ': 20, 'ل': 30, 'م': 40, 'ن': 50,
  'و': 6, 'ہ': 5, 'ھ': 5, 'ی': 10, 'ے': 10, 'ء': 1, ' ': 0
};

export function calculateAbjad(text: string): number {
  let total = 0;
  for (const char of text) {
    total += abjadMap[char] || 0;
  }
  return total;
}

export function getElementByAbjad(total: number): string {
  const remainder = total % 4;
  switch (remainder) {
    case 1: return 'آتشی (Fire)';
    case 2: return 'بادی (Air)';
    case 3: return 'آبی (Water)';
    case 0: return 'خاکی (Earth)';
    default: return 'نامعلوم';
  }
}
