/**
 * Деньги: только целые копейки (minor units, RUB). Никаких float (§CLAUDE.md).
 * Формат вывода: «1 240 ₽», «1 240,50 ₽» — неразрывные пробелы в разрядах (§10.8 Money).
 */
/** Целое число копеек. */
export type MinorUnits = number;
/** Бросает, если значение не целое копейки или выходит за безопасный диапазон. */
export declare function assertMinor(value: number): asserts value is MinorUnits;
/**
 * Форматирует копейки в «1 240 ₽» (без копеек, если .00) или «1 240,50 ₽».
 * Отрицательные суммы (штрафы, возвраты) — с минусом.
 */
export declare function formatMoney(minor: MinorUnits): string;
/** Сумма без float-артефактов: все слагаемые — целые копейки. */
export declare function sumMoney(values: readonly MinorUnits[]): MinorUnits;
/** Разность в копейках. */
export declare function subtractMoney(a: MinorUnits, b: MinorUnits): MinorUnits;
/**
 * Рублёвое значение с строкой вида «1240.50» → копейки (для ввода форм, не для расчётов).
 * Принимает только не более 2 знаков после запятой/точки.
 */
export declare function rubToMinor(input: string): MinorUnits;
//# sourceMappingURL=money.d.ts.map