import { type ButtonHTMLAttributes, type ReactNode } from "react";
export interface IconButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "aria-label" | "children"> {
    "aria-label": string;
    icon: ReactNode;
    loading?: boolean;
    shape?: "circle" | "square";
    size?: "xs" | "standard" | "sm" | "md" | "lg";
    tone?: "danger" | "neutral";
    /** Use annotation with an xs size and Tooltip for supplemental label help. */
    variant?: "annotation" | "fill" | "glass" | "outline" | "primary" | "quiet";
}
export declare const IconButton: import("react").ForwardRefExoticComponent<IconButtonProps & import("react").RefAttributes<HTMLButtonElement>>;
