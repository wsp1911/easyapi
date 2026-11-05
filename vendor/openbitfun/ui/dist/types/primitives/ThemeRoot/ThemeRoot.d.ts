import type { HTMLAttributes, ReactNode } from "react";
export type ColorScheme = "light" | "dark";
export type ContrastMode = "standard" | "high";
export type DensityMode = "compact" | "comfortable" | "touch";
export type TokenOverrideName = `--openbitfun-${string}`;
export type TokenOverrides = Partial<Record<TokenOverrideName, string | number>>;
export interface ThemeRootProps extends HTMLAttributes<HTMLDivElement> {
    children?: ReactNode;
    colorScheme?: ColorScheme;
    contrast?: ContrastMode;
    density?: DensityMode;
    tokenOverrides?: TokenOverrides;
}
export declare function ThemeRoot({ children, className, colorScheme, contrast, density, style, tokenOverrides, ...props }: ThemeRootProps): import("react/jsx-runtime").JSX.Element;
