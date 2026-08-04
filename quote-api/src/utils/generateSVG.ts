import { wrapText } from './textUtils';
import { SelectedQuote } from './quoteSelector';
import { ThemeInfo } from './themeEngine';

export interface SVGOptions {
  themeInfo: ThemeInfo;
  quoteData: SelectedQuote;
  hideAuthor: boolean;
  fontSize: number;
  border: boolean;
  dayName: string;
  themeMode: 'light' | 'dark';
  customAccent?: string;
  customFont?: string;
}

export function generateSVG(options: SVGOptions): string {
  const { themeInfo, quoteData, hideAuthor, fontSize, border, dayName, themeMode, customAccent, customFont } = options;
  
  // Clean up text
  const quoteText = quoteData.quote.replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  const authorText = quoteData.author.replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  
  // Text wrapping
  const maxWidth = 760;
  const lines = wrapText(quoteText, maxWidth, fontSize).slice(0, 5); // Max 5 lines
  
  const lineHeight = fontSize * 1.4;
  const totalTextHeight = lines.length * lineHeight;
  
  // Calculate dynamic height if needed (min 220)
  const minHeight = 220;
  const calculatedHeight = 100 + totalTextHeight + (hideAuthor ? 20 : 40);
  const height = Math.max(minHeight, calculatedHeight);
  
  // Y center for text block
  const startY = (height - totalTextHeight - (hideAuthor ? 0 : 30)) / 2 + (fontSize * 0.8);

  // Theme mode colors
  const isLight = themeMode === 'light';
  const backgroundColor = isLight ? '#F8FAFC' : '#0F172A';
  const textColor = isLight ? '#0F172A' : '#F8FAFC';
  const mutedColor = isLight ? '#64748B' : '#94A3B8';
  const borderColor = isLight ? '#E2E8F0' : '#1E293B';
  const accentColor = customAccent || themeInfo.accent;
  const fontFamily = customFont || 'Inter';

  // The outer stroke will be our custom blue or border color
  const borderStroke = border ? `stroke="${isLight ? '#3B82F6' : '#2563EB'}" stroke-width="2"` : '';

  const svg = `
<svg width="900" height="${height}" viewBox="0 0 900 ${height}" fill="none" xmlns="http://www.w3.org/2000/svg">
  <style>
    @import url('https://fonts.googleapis.com/css2?family=${fontFamily.replace(/ /g, '+')}:wght@400;600;700&amp;display=swap');
    .bg { fill: ${backgroundColor}; }
    .text-quote { font-family: '${fontFamily}', system-ui, sans-serif; font-size: ${fontSize}px; font-weight: 600; fill: ${textColor}; }
    .text-author { font-family: '${fontFamily}', system-ui, sans-serif; font-size: 18px; font-weight: 400; fill: ${mutedColor}; }
    .text-header { font-family: '${fontFamily}', system-ui, sans-serif; font-size: 16px; font-weight: 700; fill: ${accentColor}; }
    .badge-text { font-family: '${fontFamily}', system-ui, sans-serif; font-size: 12px; font-weight: 600; fill: #FFFFFF; }
    .footer { font-family: '${fontFamily}', system-ui, sans-serif; font-size: 12px; font-weight: 400; fill: #64748B; }
  </style>

  <rect width="900" height="${height}" rx="18" class="bg" ${borderStroke} />
  
  <!-- Header: Today's Thought -->
  <text x="40" y="40" class="text-header">${themeInfo.header}</text>

  <!-- Category Badge -->
  <rect x="750" y="24" width="110" height="24" rx="12" fill="${accentColor}" opacity="0.8" />
  <text x="805" y="40" text-anchor="middle" class="badge-text">${themeInfo.theme}</text>

  <!-- Quote Lines -->
  ${lines.map((line, i) => `<text x="40" y="${startY + (i * lineHeight)}" class="text-quote">${line}</text>`).join('\n  ')}

  <!-- Author -->
  ${!hideAuthor ? `<text x="40" y="${startY + (lines.length * lineHeight) + 15}" class="text-author">— ${authorText}</text>` : ''}

  <!-- Footer -->
  <text x="860" y="${height - 20}" text-anchor="end" class="footer">${dayName} • ${themeInfo.theme} • Quote ${quoteData.index}/${quoteData.totalInTheme}</text>
</svg>`;

  return svg.trim();
}
