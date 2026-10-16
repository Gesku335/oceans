export type SealSize = 24 | 40 | 96;
export interface SealProps {
    size: SealSize;
    /** true — белая печать на ocean-700; false — ocean-700 на белом (§10.5). */
    onBrand?: boolean;
    /** «Оттиск» 240ms один раз при монтировании (§10.6). Reduced-motion отключает в CSS. */
    press?: boolean;
    className?: string;
    title?: string;
}
/**
 * Штамп-печать OCEAN: дерево над волнами в круге, перемычки как у трафарета (§10.5).
 * Только два цветовых режима: белый на --ocean-700 или --ocean-700 на белом.
 */
export declare function Seal({ size, onBrand, press, className, title }: SealProps): import("react").JSX.Element;
//# sourceMappingURL=Seal.d.ts.map