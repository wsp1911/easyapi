import { type ButtonHTMLAttributes, type ReactNode } from "react";
export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode;
    /** Static labels inherit whitespace and line height without clipping, marquee, or overflow tooltips. */
    labelBehavior?: "overflow" | "static";
    leadingIcon?: ReactNode;
    loading?: boolean;
    size?: "xs" | "sm" | "md" | "lg";
    tone?: "danger" | "neutral";
    trailingIcon?: ReactNode;
    variant?: "fill" | "glass" | "outline" | "primary" | "quiet" | "secondary" | "text";
}
export declare const Button: import("react").ForwardRefExoticComponent<ButtonProps & import("react").RefAttributes<HTMLButtonElement>>;
