import type { HTMLAttributes } from "react";
type StackGap = "0" | "1" | "2" | "3" | "4" | "5" | "6" | "8" | "10" | "12";
export interface StackProps extends HTMLAttributes<HTMLDivElement> {
    align?: "start" | "center" | "end" | "stretch";
    direction?: "horizontal" | "vertical";
    gap?: StackGap;
    justify?: "start" | "center" | "end" | "between";
    wrap?: boolean;
}
export declare function Stack({ align, className, direction, gap, justify, style, wrap, ...props }: StackProps): import("react/jsx-runtime").JSX.Element;
export {};
