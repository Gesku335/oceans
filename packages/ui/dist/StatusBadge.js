import { jsx as _jsx } from "react/jsx-runtime";
import { clsx } from 'clsx';
const toneClass = {
    neutral: 'border-[var(--border)] bg-[var(--ocean-50)] text-[var(--text)]',
    brand: 'border-[var(--ocean-200)] bg-[var(--ocean-100)] text-[var(--ocean-800)]',
    success: 'border-[var(--success)] bg-[var(--ocean-50)] text-[var(--success)]',
    warning: 'border-[var(--warning)] bg-[var(--warning-bg)] text-[var(--warning)]',
    danger: 'border-[var(--danger)] bg-[var(--ocean-50)] text-[var(--danger)]',
};
/**
 * Статус-бейдж (§10.8). Цвет никогда не единственный носитель смысла (§10.3):
 * тон всегда сопровождается текстом (children обязателен).
 */
export function StatusBadge({ tone = 'neutral', className, ...rest }) {
    return (_jsx("span", { className: clsx('inline-flex items-center gap-1 rounded-[var(--radius-control)] border px-[var(--space-2)] py-[var(--space-1)]', 'font-[var(--font-ui)] text-[12px] leading-4 font-medium', toneClass[tone], className), ...rest }));
}
//# sourceMappingURL=StatusBadge.js.map