import type { HTMLAttributes, ReactNode } from 'react';
export interface ChipProps extends HTMLAttributes<HTMLSpanElement> {
    children: ReactNode;
    active?: boolean;
}
/** Чип-фильтр/метка (§10.8). Активный — брендовый фон, не только цвет (иконка/текст). */
export declare function Chip({ active, className, ...rest }: ChipProps): import("react").JSX.Element;
//# sourceMappingURL=Chip.d.ts.map