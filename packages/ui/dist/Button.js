import { jsx as _jsx } from "react/jsx-runtime";
import { clsx } from 'clsx';
/**
 * Кнопка (§10.8): primary — брендовый синий, inverse — белая на синем,
 * quiet — текстовая. Тач-цель ≥44px (§10.10), фокус 2px ocean-600.
 */
export function Button({ variant = 'primary', className, type = 'button', ...rest }) {
    return (_jsx("button", { type: type, className: clsx('inline-flex min-h-[44px] items-center justify-center gap-2 rounded-[var(--radius-control)] px-[var(--space-4)]', 'font-[var(--font-ui)] text-[16px] font-medium transition-colors', 'focus-visible:outline-2 focus-visible:outline-[var(--ocean-600)] focus-visible:outline-offset-2', 'disabled:cursor-not-allowed disabled:opacity-50', variant === 'primary' &&
            'bg-[var(--primary)] text-[var(--on-primary)] border border-[var(--primary)] hover:bg-[var(--ocean-800)]', variant === 'inverse' &&
            'bg-[var(--white)] text-[var(--ocean-700)] border border-transparent hover:bg-[var(--ocean-100)]', variant === 'quiet' &&
            'bg-transparent text-[var(--text)] border border-[var(--border)] hover:bg-[var(--ocean-50)]', className), ...rest }));
}
//# sourceMappingURL=Button.js.map