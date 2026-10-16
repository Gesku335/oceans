import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';

/**
 * Автотест контраста токенов из tokens.css (§10.3, §10.10: WCAG 2.1 AA ≥4.5).
 * Значения парсим прямо из CSS — тест ловит рассинхрон токенов и расчётов.
 */
const css = readFileSync(fileURLToPath(new URL('./tokens.css', import.meta.url)), 'utf8');

function token(name: string): string {
  const m = new RegExp(`--${name}:\\s*(#[0-9a-fA-F]{6})`).exec(css);
  if (!m) throw new Error(`Токен --${name} не найден в tokens.css`);
  return m[1];
}

function hexToRgb(hex: string): [number, number, number] {
  const n = parseInt(hex.slice(1), 16);
  return [(n >> 16) & 0xff, (n >> 8) & 0xff, n & 0xff];
}

function relLuminance(hex: string): number {
  const ch = hexToRgb(hex).map((v) => {
    const s = v / 255;
    return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
  });
  const [r, g, b] = ch;
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

export function contrastRatio(a: string, b: string): number {
  const [l1, l2] = [relLuminance(a), relLuminance(b)].sort((x, y) => y - x);
  return (l1 + 0.05) / (l2 + 0.05);
}

const AA = 4.5;

describe('контраст дизайн-токенов (WCAG 2.1 AA)', () => {
  const pairs: Array<[string, string, string]> = [
    ['on-primary / ocean-700 (белый на бренде)', token('white'), token('ocean-700')],
    ['text (ocean-950) на white', token('ocean-950'), token('white')],
    ['text (ocean-950) на ocean-50', token('ocean-950'), token('ocean-50')],
    ['text-muted на white', token('text-muted'), token('white')],
    ['success на white', token('success'), token('white')],
    ['warning на warning-bg', token('warning'), token('warning-bg')],
    ['danger на white', token('danger'), token('white')],
    ['ocean-700 на white (печать на белом)', token('ocean-700'), token('white')],
    ['on-primary (ocean-700) на white — dark тема', token('ocean-700'), token('white')],
    ['text-muted (ocean-300) на ocean-950 — dark bg', token('ocean-300'), token('ocean-950')],
    ['text-muted (ocean-300) на ocean-900 — dark surface', token('ocean-300'), token('ocean-900')],
    ['white на ocean-950 — dark текст', token('white'), token('ocean-950')],
  ];

  for (const [label, fg, bg] of pairs) {
    it(`${label} ≥ ${AA}:1`, () => {
      expect(contrastRatio(fg, bg)).toBeGreaterThanOrEqual(AA);
    });
  }

  it('белый на ocean-700 ≈ 9.5:1 (AAA, как в §10.3)', () => {
    expect(contrastRatio(token('white'), token('ocean-700'))).toBeGreaterThan(9);
  });
});
