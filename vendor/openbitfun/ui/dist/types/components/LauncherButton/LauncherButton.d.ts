import { type ButtonHTMLAttributes, type ReactNode } from "react";
export interface LauncherButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode;
    leadingIcon?: ReactNode;
}
export declare const LauncherButton: import("react").ForwardRefExoticComponent<LauncherButtonProps & import("react").RefAttributes<HTMLButtonElement>>;
