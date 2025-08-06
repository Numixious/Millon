
import { Scale, ScaleDetail } from '../types';

// Updated to match the scale names and categories from the provided image.
export const SCALE_DETAILS: Record<Scale, ScaleDetail> = {
    // شاخص های اصلاح
    'X': { name: 'افشاء', category: 'شاخص های اصلاح' },
    'Y': { name: 'مطلوبیت', category: 'شاخص های اصلاح' },
    'Z': { name: 'بدنمایی', category: 'شاخص های اصلاح' },
    // الگوهای بالینی شخصیت
    '1': { name: 'اسکیزوئید', category: 'الگوهای بالینی شخصیت' },
    '2A': { name: 'دوری گزین', category: 'الگوهای بالینی شخصیت' },
    '2B': { name: 'افسرده', category: 'الگوهای بالینی شخصیت' },
    '3': { name: 'وابسته', category: 'الگوهای بالینی شخصیت' },
    '4': { name: 'نمایشی', category: 'الگوهای بالینی شخصیت' },
    '5': { name: 'خود شیفته', category: 'الگوهای بالینی شخصیت' },
    '6A': { name: 'ضد اجتماعی', category: 'الگوهای بالینی شخصیت' },
    '6B': { name: 'دیگر آزار', category: 'الگوهای بالینی شخصیت' },
    '7': { name: 'وسواسی', category: 'الگوهای بالینی شخصیت' },
    '8A': { name: 'منفی گرا', category: 'الگوهای بالینی شخصیت' },
    '8B': { name: 'خود آزار', category: 'الگوهای بالینی شخصیت' },
    // آسیب شدید شخصیت
    'S': { name: 'اسکیزوتایپال', category: 'آسیب شدید شخصیت' },
    'C': { name: 'مرزی', category: 'آسیب شدید شخصیت' },
    'P': { name: 'پارانوئید', category: 'آسیب شدید شخصیت' },
    // نشانگان بالینی
    'A': { name: 'اختلال اضطراب', category: 'نشانگان بالینی' },
    'H': { name: 'شبه جسمی', category: 'نشانگان بالینی' },
    'N': { name: 'مانیک', category: 'نشانگان بالینی' },
    'D': { name: 'افسرده خویی', category: 'نشانگان بالینی' },
    'B': { name: 'وابستگی به الکل', category: 'نشانگان بالینی' },
    'T': { name: 'وابستگی به مواد', category: 'نشانگان بالینی' },
    'R': { name: 'استرس پس از ضربه', category: 'نشانگان بالینی' },
    // نشانگان شدید
    'SS': { name: 'اختلال فکر', category: 'نشانگان شدید' },
    'CC': { name: 'افسردگی اساسی', category: 'نشانگان شدید' },
    'PP': { name: 'اختلال هذیانی', category: 'نشانگان شدید' },
};

// Based on publicly available scoring keys. Mapped to the structure in the image.
// This is for educational/illustrative purposes.
export const SCORING_KEY: Record<Scale, { [key: number]: 'yes' | 'no' }> = {
    'X': { 157: 'no', 11: 'yes', 37: 'yes', 78: 'yes', 107: 'yes' },
    'Y': { 16: 'yes', 57: 'yes', 59: 'yes', 80: 'yes', 97: 'yes', 139: 'yes', 172: 'yes' },
    'Z': { 1: 'yes', 4: 'yes', 15: 'yes', 20: 'yes', 24: 'yes', 25: 'yes', 34: 'yes', 44: 'yes', 55: 'yes', 56: 'yes', 58: 'yes', 60: 'yes', 62: 'yes', 70: 'yes', 73: 'yes', 74: 'yes', 79: 'yes', 86: 'yes', 104: 'yes', 107: 'yes', 112: 'yes', 122: 'yes', 123: 'yes', 128: 'yes', 130: 'yes', 142: 'yes', 148: 'yes', 149: 'yes', 150: 'yes' },
    
    // Personality Patterns (re-mapped from MCMI-III standards to image codes)
    '1': { 10: 'no', 27: 'yes', 46: 'no', 48: 'yes', 57: 'no', 80: 'no', 88: 'no', 92: 'yes', 105: 'no', 108: 'yes', 111: 'no', 151: 'yes', 165: 'yes' }, // Schizoid
    '2A': { 18: 'yes', 29: 'yes', 40: 'yes', 58: 'yes', 69: 'yes', 84: 'yes', 108: 'yes', 127: 'yes', 135: 'yes', 158: 'yes', 174: 'yes' }, // Avoidant
    '2B': { 4: 'yes', 15: 'yes', 20: 'yes', 24: 'yes', 62: 'yes', 79: 'yes', 86: 'yes', 104: 'yes', 112: 'yes', 122: 'yes', 123: 'yes', 128: 'yes', 142: 'yes', 148: 'yes', 149: 'yes' }, // Depressive
    '3': { 16: 'yes', 19: 'no', 45: 'yes', 70: 'no', 72: 'yes', 94: 'yes', 108: 'yes', 120: 'yes', 135: 'yes', 144: 'yes', 151: 'yes' }, // Dependent
    '4': { 3: 'yes', 21: 'yes', 31: 'yes', 32: 'yes', 57: 'yes', 80: 'yes', 88: 'yes', 96: 'yes', 110: 'yes', 144: 'yes', 174: 'yes' }, // Histrionic (was 4A)
    '5': { 5: 'yes', 26: 'yes', 50: 'yes', 93: 'yes', 103: 'yes', 126: 'yes', 139: 'yes', 144: 'yes', 146: 'yes', 167: 'yes' }, // Narcissistic (was 4B)
    '6A': { 17: 'yes', 38: 'yes', 49: 'yes', 53: 'yes', 85: 'yes', 101: 'yes', 113: 'yes', 116: 'yes', 126: 'yes', 167: 'yes' }, // Antisocial (was 5)
    '6B': { 9: 'yes', 14: 'yes', 33: 'yes', 42: 'yes', 50: 'yes', 64: 'yes', 87: 'yes', 95: 'yes', 116: 'yes', 125: 'yes', 169: 'yes' }, // Sadistic/Aggressive (was 6A)
    '7': { 2: 'yes', 28: 'yes', 59: 'yes', 82: 'yes', 97: 'yes', 137: 'yes', 172: 'yes' }, // Compulsive (was 6B)
    '8A': { 7: 'yes', 22: 'yes', 36: 'yes', 60: 'no', 70: 'yes', 83: 'yes', 90: 'yes', 98: 'yes', 125: 'yes' }, // Negativistic (was 7)
    '8B': { 19: 'yes', 25: 'yes', 42: 'yes', 47: 'yes', 70: 'yes', 81: 'yes', 104: 'yes', 120: 'yes', 132: 'yes', 149: 'yes', 161: 'yes' }, // Self-Defeating (was 8A)

    // Severe Pathology
    'S': { 67: 'yes', 71: 'yes', 76: 'yes', 78: 'yes', 102: 'yes', 117: 'yes', 162: 'yes', 168: 'yes' }, // Schizotypal (was 8B)
    'C': { 3: 'yes', 12: 'yes', 22: 'yes', 36: 'yes', 54: 'yes', 83: 'yes', 98: 'yes', 106: 'yes', 120: 'yes', 134: 'yes', 154: 'yes', 171: 'yes' }, // Borderline (was S)
    'P': { 6: 'yes', 8: 'yes', 26: 'yes', 49: 'yes', 63: 'yes', 89: 'yes', 103: 'yes', 115: 'yes', 119: 'yes', 138: 'yes', 140: 'yes', 153: 'yes', 159: 'yes', 175: 'yes' }, // Paranoid (was C)

    // Clinical Syndromes
    'A': { 1: 'yes', 43: 'yes', 75: 'yes', 99: 'yes', 124: 'yes', 133: 'yes', 145: 'yes', 147: 'yes' },
    'H': { 1: 'yes', 11: 'yes', 37: 'yes', 55: 'yes', 74: 'yes', 75: 'yes', 107: 'yes' },
    'N': { 3: 'yes', 51: 'yes', 54: 'yes', 96: 'yes', 106: 'yes' },
    'D': { 4: 'yes', 15: 'yes', 24: 'yes', 62: 'yes', 73: 'yes', 79: 'yes', 112: 'yes', 123: 'yes', 128: 'yes', 130: 'yes', 142: 'yes', 148: 'yes' },
    'B': { 13: 'yes', 23: 'no', 39: 'yes', 52: 'yes', 77: 'yes', 100: 'yes', 131: 'yes', 136: 'yes' },
    'T': { 13: 'yes', 23: 'no', 39: 'yes', 52: 'yes', 66: 'yes', 91: 'yes', 118: 'yes', 136: 'yes', 152: 'yes' },
    'R': { 43: 'yes', 81: 'yes', 109: 'yes', 129: 'yes', 132: 'yes', 160: 'yes', 164: 'yes', 173: 'yes' },

    // Severe Clinical Syndromes (Placeholder keys, as they are not provided)
    'SS': { 71: 'yes', 76: 'yes', 102: 'yes', 117: 'yes', 134: 'yes', 153: 'yes', 159: 'yes', 162: 'yes', 168: 'yes' }, // Thought Disorder
    'CC': { 24: 'yes', 34: 'yes', 44: 'yes', 62: 'yes', 79: 'yes', 104: 'yes', 112: 'yes', 123: 'yes', 128: 'yes', 130: 'yes', 148: 'yes', 149: 'yes', 154: 'yes', 171: 'yes' }, // Major Depression
    'PP': { 8: 'yes', 63: 'yes', 67: 'yes', 115: 'yes', 119: 'yes', 140: 'yes', 159: 'yes' } // Delusional Disorder
};
