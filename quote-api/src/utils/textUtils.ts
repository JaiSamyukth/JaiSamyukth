// Approximate character widths for a typical sans-serif font (Inter)
// based on relative frequencies. This is a heuristic approach since we don't have a DOM.
function getApproximateTextWidth(text: string, fontSize: number): number {
  let width = 0;
  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    // Uppercase and wide characters
    if (/[A-Z@WM]/.test(char)) {
      width += fontSize * 0.7;
    }
    // Narrow characters
    else if (/[ijl1trfI\.,\s]/.test(char)) {
      width += fontSize * 0.3;
    }
    // Everything else
    else {
      width += fontSize * 0.55;
    }
  }
  return width;
}

export function wrapText(text: string, maxWidth: number, fontSize: number): string[] {
  const words = text.split(' ');
  const lines: string[] = [];
  let currentLine = '';

  for (let i = 0; i < words.length; i++) {
    const word = words[i];
    const testLine = currentLine ? `${currentLine} ${word}` : word;
    const testWidth = getApproximateTextWidth(testLine, fontSize);

    if (testWidth > maxWidth && currentLine !== '') {
      lines.push(currentLine);
      currentLine = word;
    } else {
      currentLine = testLine;
    }
  }

  if (currentLine) {
    lines.push(currentLine);
  }

  return lines;
}
