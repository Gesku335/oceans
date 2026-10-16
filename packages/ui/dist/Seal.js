import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { clsx } from 'clsx';
/**
 * Штамп-печать OCEAN: дерево над волнами в круге, перемычки как у трафарета (§10.5).
 * Только два цветовых режима: белый на --ocean-700 или --ocean-700 на белом.
 */
export function Seal({ size, onBrand = true, press = false, className, title }) {
    const fg = onBrand ? 'var(--white)' : 'var(--ocean-700)';
    const bg = onBrand ? 'var(--ocean-700)' : 'var(--white)';
    return (_jsx("span", { role: "img", "aria-label": title ?? 'Печать OCEAN', className: clsx('inline-flex shrink-0 rounded-[var(--radius-seal)]', press && 'seal-press', className), style: { width: size, height: size, backgroundColor: bg }, children: _jsxs("svg", { viewBox: "0 0 96 96", width: size, height: size, "aria-hidden": "true", focusable: "false", children: [_jsx("circle", { cx: "48", cy: "48", r: "44", fill: "none", stroke: fg, strokeWidth: "4" }), _jsx("path", { d: "M48 26v10 M48 42v8 M48 56v14", stroke: fg, strokeWidth: "5", strokeLinecap: "round" }), _jsx("path", { d: "M48 26 36 14 M48 26 60 14 M48 26 48 10", stroke: fg, strokeWidth: "5", strokeLinecap: "round" }), _jsx("path", { d: "M48 44 34 34 M48 44 62 34", stroke: fg, strokeWidth: "5", strokeLinecap: "round" }), _jsx("path", { d: "M24 78c6-5 12-5 18 0s12 5 18 0 10-4 14-2", fill: "none", stroke: fg, strokeWidth: "4", strokeLinecap: "round" })] }) }));
}
//# sourceMappingURL=Seal.js.map