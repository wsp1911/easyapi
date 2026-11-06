import { type InputHTMLAttributes, type ReactNode } from "react";
export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "className" | "size"> {
    className?: string;
    /** Hide the browser reveal button when the caller provides a visibility control. */
    hideNativePasswordReveal?: boolean;
    invalid?: boolean;
    leading?: ReactNode;
    onValueChange?: (value: string) => void;
    shape?: "rounded" | "pill";
    size?: "xs" | "sm" | "md" | "lg";
    trailing?: ReactNode;
}
export declare const Input: import("react").ForwardRefExoticComponent<InputProps & import("react").RefAttributes<HTMLInputElement>>;
