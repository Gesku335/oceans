import { jsx as _jsx } from "react/jsx-runtime";
import { clsx } from 'clsx';
import { formatMoney } from '@ocean/shared';
/**
 * Деньги (§10.8): целые копейки → «1 240 ₽». Табличные цифры, правый край, NBSP.
 */
export function Money({ minor, className, ...rest }) {
    return (_jsx("span", { className: clsx('money', className), ...rest, children: formatMoney(minor) }));
}
//# sourceMappingURL=Money.js.map