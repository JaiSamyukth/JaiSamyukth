import quotesData from '../data/quotes.json';

export interface Quote {
  quote: string;
  author: string;
  theme: string;
}

export interface SelectedQuote extends Quote {
  index: number;
  totalInTheme: number;
}

const FALLBACK_QUOTE: SelectedQuote = {
  quote: "Build things worth remembering.",
  author: "Unknown",
  theme: "Creation",
  index: 1,
  totalInTheme: 1
};

export function selectQuote(theme: string, overrideCategory?: string): SelectedQuote {
  const targetTheme = overrideCategory || theme;
  
  // Filter quotes by theme (case insensitive)
  const availableQuotes = (quotesData as Quote[]).filter(
    (q) => q.theme.toLowerCase() === targetTheme.toLowerCase()
  );
  
  if (availableQuotes.length === 0) {
    // If override category fails or no quotes for theme, try dropping back to Creation
    if (targetTheme.toLowerCase() !== 'creation') {
      return selectQuote('Creation');
    }
    return FALLBACK_QUOTE;
  }
  
  // Pick random quote
  const randomIndex = Math.floor(Math.random() * availableQuotes.length);
  const selected = availableQuotes[randomIndex];
  
  return {
    ...selected,
    index: randomIndex + 1,
    totalInTheme: availableQuotes.length
  };
}
