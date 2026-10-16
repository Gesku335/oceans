import { jsx as _jsx } from "react/jsx-runtime";
import { clsx } from 'clsx';
/** Чип-фильтр/метка (§10.8). Активный — брендовый фон, не только цвет (иконка/текст). */
export function Chip({ active = false, className, ...rest }) {
    return (_jsx("span", { className: clsx('inline-flex min-h-[32px] items-center gap-1 rounded-[var(--radius-control)] px-[var(--space-2)]', 'border font-[var(--font-ui)] text-[14px]', active
            ? 'border-[var(--primary)] bg-[var(--primary)] text-[var(--on-primary)] font-medium'
            : 'border-[var(--border)] bg-[var(--surface)] text-[var(--text)]', className), ...rest }));
}
//# sourceMappingURL=Chip.js.map