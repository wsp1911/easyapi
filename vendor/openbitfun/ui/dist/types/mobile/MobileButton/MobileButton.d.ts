import { type ButtonHTMLAttributes, type ReactNode } from "react";
export type MobileButtonAppearance = "primary" | "secondary" | "plain" | "danger";
export type MobileButtonSize = "sm" | "md" | "lg";
export interface MobileButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    appearance?: MobileButtonAppearance;
    block?: boolean;
    leading?: ReactNode;
    loading?: boolean;
    size?: MobileButtonSize;
    trailing?: ReactNode;
}
export declare const MobileButton: import("react").ForwardRefExoticComponent<MobileButtonProps & import("react").RefAttributes<HTMLButtonElement>>;
