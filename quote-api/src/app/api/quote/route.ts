import { NextRequest } from 'next/server';
import { getDailyTheme } from '../../../utils/themeEngine';
import { selectQuote } from '../../../utils/quoteSelector';
import { generateSVG } from '../../../utils/generateSVG';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  
  // Parse query params
  const categoryOverride = searchParams.get('category') || undefined;
  const hideAuthor = searchParams.get('hideAuthor') === 'true';
  const fontSize = parseInt(searchParams.get('fontSize') || '28', 10);
  const border = searchParams.get('border') !== 'false';
  
  const themeMode = searchParams.get('theme') === 'light' ? 'light' : 'dark';
  const customAccent = searchParams.get('accent') || undefined;
  const customFont = searchParams.get('font') || undefined;
  
  // Get theme & quote
  const themeInfo = getDailyTheme();
  const quoteData = selectQuote(themeInfo.theme, categoryOverride);
  
  // Day name for footer
  const now = new Date();
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const dayName = days[now.getUTCDay()];

  // Generate SVG
  const svg = generateSVG({
    themeInfo,
    quoteData,
    hideAuthor,
    fontSize: isNaN(fontSize) ? 28 : fontSize,
    border,
    dayName,
    themeMode,
    customAccent,
    customFont
  });

  return new Response(svg, {
    headers: {
      'Content-Type': 'image/svg+xml',
      'Cache-Control': 'no-store, max-age=0',
      // Allow cross-origin if embedded on other domains
      'Access-Control-Allow-Origin': '*'
    },
  });
}
