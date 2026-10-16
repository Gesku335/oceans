/**
 * Деньги: только целые копейки (minor units, RUB). Никаких float (§CLAUDE.md).
 * Формат вывода: «1 240 ₽», «1 240,50 ₽» — неразрывные пробелы в разрядах (§10.8 Money).
 */

/** Целое число копеек. */
export type MinorUnits = number;

const NBSP = '\u00A0';

/** Бросает, если значение не целое копейки или выходит за безопасный диапазон. */
export function assertMinor(value: number): asserts value is MinorUnits {
  if (!Number.isInteger(value)) {
    throw new TypeError(`Дены только целыми копейками, получено: ${value}`);
  }
  if (!Number.isSafeInteger(value)) {
    throw new RangeError(`Вне безопасного диапазона целых: ${value}`);
  }
}

function groupDigits(intPart: string): string {
  return intPart.replace(/\B(?=(\d{3})+(?!\d))/g, NBSP);
}

/**
 * Форматирует копейки в «1 240 ₽» (без копеек, если .00) или «1 240,50 ₽».
 * Отрицательные суммы (штрафы, возвраты) — с минусом.
 */
export function formatMoney(minor: MinorUnits): string {
  assertMinor(minor);
  const sign = minor < 0 ? '−' : '';
  const abs = Math.abs(minor);
  const rub = groupDigits(String(Math.floor(abs / 100)));
  const kop = abs % 100;
  return kop === 0 ? `${sign}${rub}${NBSP}₽` : `${sign}${rub},${String(kop).padStart(2, '0')}${NBSP}₽`;
}

/** Сумма без float-артефактов: все слагаемые — целые копейки. */
export function sumMoney(values: readonly MinorUnits[]): MinorUnits {
  let total = 0;
  for (const v of values) {
    assertMinor(v);
    total += v;
    assertMinor(total);
  }
  return total;
}

/** Разность в копейках. */
export function subtractMoney(a: MinorUnits, b: MinorUnits): MinorUnits {
  return sumMoney([a, -b]);
}

/**
 * Рублёвое значение с строкой вида «1240.50» → копейки (для ввода форм, не для расчётов).
 * Принимает только не более 2 знаков после запятой/точки.
 */
export function rubToMinor(input: string): MinorUnits {
  const normalized = input.replace(/\s|\u00A0/g, '').replace(',', '.');
  const m = /^(-?)(\d+)(?:\.(\d{1,2}))?$/.exec(normalized);
  if (!m) throw new TypeError(`Некорректная сумма в рублях: ${input}`);
  const [, sign, rub, kop = ''] = m;
  const minor = Number(rub) * 100 + Number(kop.padEnd(2, '0'));
  return sign === '-' ? -minor : minor;
}
