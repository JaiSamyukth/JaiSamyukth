export interface ThemeInfo {
  theme: string;
  header: string;
  accent: string;
}

export function getDailyTheme(dateOverride?: Date): ThemeInfo {
  // Use current UTC date or provided override
  const now = dateOverride || new Date();
  const month = now.getUTCMonth() + 1; // 1-12
  const day = now.getUTCDate();
  const dayOfWeek = now.getUTCDay(); // 0 (Sun) - 6 (Sat)
  
  const mmdd = `${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
  
  const birthdayDate = process.env.BIRTHDAY_DATE || '09-17'; // User's birthday
  
  // 1. Check Holidays & Special Events first
  if (mmdd === birthdayDate) {
    return { theme: 'Ambition', header: 'Happy Birthday, Jai.', accent: '#F59E0B' }; // Amber/Gold
  }
  
  if (mmdd === '01-01') return { theme: 'Reinvention', header: 'New Year, New Focus', accent: '#06B6D4' };
  if (mmdd === '02-14') return { theme: 'Connection', header: 'Human Things', accent: '#EC4899' }; // Pink
  if (mmdd === '04-01') return { theme: 'Funny', header: 'April Fools', accent: '#8B5CF6' }; // Purple
  if (mmdd === '10-31') return { theme: 'Dark Philosophy', header: 'Memento Mori', accent: '#F97316' }; // Orange
  if (mmdd === '12-25') return { theme: 'Kindness', header: 'Season of Giving', accent: '#10B981' }; // Green
  
  // 2. Weekday Themes
  switch (dayOfWeek) {
    case 1: // Monday
      return { theme: 'Momentum', header: 'Monday Momentum', accent: '#1D4ED8' }; // Deep Blue
    case 2: // Tuesday
      return { theme: 'Suffering', header: 'Embrace the Suck', accent: '#DC2626' }; // Red
    case 3: // Wednesday
      return { theme: 'Philosophy', header: 'Midweek Reflection', accent: '#8B5CF6' }; // Purple
    case 4: // Thursday
      return { theme: 'Connection', header: 'Human Things', accent: '#0EA5E9' }; // Light Blue
    case 5: // Friday
      return { theme: 'Energy', header: 'Fuel for Friday', accent: '#EAB308' }; // Yellow
    case 6: // Saturday
      return { theme: 'Creation', header: 'Create Something', accent: '#14B8A6' }; // Teal
    case 0: // Sunday
      return { theme: 'Unfiltered Sunday', header: 'Unfiltered Sunday', accent: '#64748B' }; // Slate
    default:
      return { theme: 'Creation', header: "Today's Thought", accent: '#06B6D4' };
  }
}
