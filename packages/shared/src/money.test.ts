import { describe, expect, it } from 'vitest';
import { assertMinor, formatMoney, rubToMinor, subtractMoney, sumMoney } from './money.js';

const NBSP = '\u00A0';
const RUBLE = '₽';

describe('formatMoney', () => {
  it('целые рубли — без копеек, с неразрывным пробелом перед ₽', () => {
    expect(formatMoney(124000)).toBe(`1${NBSP}240${NBSP}${RUBLE}`);
  });

  it('копейки — через запятую', () => {
    expect(formatMoney(124050)).toBe(`1${NBSP}240,50${NBSP}${RUBLE}`);
  });

  it('группировка разрядов', () => {
    expect(formatMoney(100000000)).toBe(`1${NBSP}000${NBSP}000${NBSP}${RUBLE}`);
    expect(formatMoney(123456789)).toBe(`1${NBSP}234${NBSP}567,89${NBSP}${RUBLE}`);
  });

  it('меньше рубля', () => {
    expect(formatMoney(50)).toBe(`0,50${NBSP}${RUBLE}`);
    expect(formatMoney(0)).toBe(`0${NBSP}${RUBLE}`);
  });

  it('отрицательные (штрафы, возвраты) — с минусом U+2212', () => {
    expect(formatMoney(-124050)).toBe(`−1${NBSP}240,50${NBSP}${RUBLE}`);
  });

  it('обычных пробелов в выводе нет — только NBSP', () => {
    expect(formatMoney(124050)).not.toMatch(/[\u0020]/);
  });

  it('бросает на нецелом', () => {
    expect(() => formatMoney(12.5)).toThrow(TypeError);
  });
});

describe('assertMinor', () => {
  it('пропускает целые в безопасном диапазоне', () => {
    expect(() => assertMinor(0)).not.toThrow();
    expect(() => assertMinor(Number.MAX_SAFE_INTEGER)).not.toThrow();
  });
  it('бросает на float и за пределами safe integer', () => {
    expect(() => assertMinor(1.01)).toThrow(TypeError);
    expect(() => assertMinor(Number.MAX_SAFE_INTEGER + 10)).toThrow(RangeError);
  });
});

describe('sumMoney / subtractMoney', () => {
  it('без float-артефактов', () => {
    expect(sumMoney([10, 20, 33])).toBe(63);
    expect(sumMoney([])).toBe(0);
    expect(subtractMoney(10000, 33)).toBe(9967);
  });
  it('переполнение при суммировании — RangeError', () => {
    expect(() => sumMoney([Number.MAX_SAFE_INTEGER, 1])).toThrow(RangeError);
  });
});

describe('rubToMinor', () => {
  it('парсит ввод форм', () => {
    expect(rubToMinor('1240')).toBe(124000);
    expect(rubToMinor('1240.5')).toBe(124050);
    expect(rubToMinor('1 240,50')).toBe(124050);
    expect(rubToMinor(`1${NBSP}240,50`)).toBe(124050);
    expect(rubToMinor('-99.99')).toBe(-9999);
  });
  it('roundtrip с formatMoney', () => {
    for (const m of [0, 1, 99, 100, 124050, -124050, 999999999]) {
      const digits = formatMoney(m)
        .replace(new RegExp(`${RUBLE}|${NBSP}`, 'g'), '')
        .replace('−', '-')
        .replace(',', '.');
      expect(rubToMinor(digits)).toBe(m);
    }
  });
  it('отвергает мусор', () => {
    expect(() => rubToMinor('abc')).toThrow(TypeError);
    expect(() => rubToMinor('1.234')).toThrow(TypeError);
    expect(() => rubToMinor('')).toThrow(TypeError);
  });
});
