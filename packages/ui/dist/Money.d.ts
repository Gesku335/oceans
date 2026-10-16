import type { HTMLAttributes } from 'react';
import { type MinorUnits } from '@ocean/shared';
export interface MoneyProps extends Omit<HTMLAttributes<HTMLSpanElement>, 'children'> {
    minor: MinorUnits;
}
/**
 * Деньги (§10.8): целые копейки → «1 240 ₽». Табличные цифры, правый край, NBSP.
 */
export declare function Money({ minor, className, ...rest }: MoneyProps): import("react").JSX.Element;
//# sourceMappingURL=Money.d.ts.map