import { type ButtonHTMLAttributes, type ReactNode } from "react";
export type MobileIconButtonAppearance = "plain" | "surface" | "floating";
export type MobileIconButtonSize = "sm" | "md";
export interface MobileIconButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "aria-label" | "children"> {
    "aria-label": string;
    appearance?: MobileIconButtonAppearance;
    icon: ReactNode;
    loading?: boolean;
    selected?: boolean;
    size?: MobileIconButtonSize;
}
export declare const MobileIconButton: import("react").ForwardRefExoticComponent<MobileIconButtonProps & import("react").RefAttributes<HTMLButtonElement>>;
