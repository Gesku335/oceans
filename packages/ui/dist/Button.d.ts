import type { ButtonHTMLAttributes } from 'react';
export type ButtonVariant = 'primary' | 'inverse' | 'quiet';
export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: ButtonVariant;
}
/**
 * Кнопка (§10.8): primary — брендовый синий, inverse — белая на синем,
 * quiet — текстовая. Тач-цель ≥44px (§10.10), фокус 2px ocean-600.
 */
export declare function Button({ variant, className, type, ...rest }: ButtonProps): import("react").JSX.Element;
//# sourceMappingURL=Button.d.ts.map