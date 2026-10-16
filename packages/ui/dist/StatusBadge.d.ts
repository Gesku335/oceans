import type { HTMLAttributes, ReactNode } from 'react';
export type BadgeTone = 'neutral' | 'brand' | 'success' | 'warning' | 'danger';
export interface StatusBadgeProps extends HTMLAttributes<HTMLSpanElement> {
    tone?: BadgeTone;
    children: ReactNode;
}
/**
 * Статус-бейдж (§10.8). Цвет никогда не единственный носитель смысла (§10.3):
 * тон всегда сопровождается текстом (children обязателен).
 */
export declare function StatusBadge({ tone, className, ...rest }: StatusBadgeProps): import("react").JSX.Element;
//# sourceMappingURL=StatusBadge.d.ts.map