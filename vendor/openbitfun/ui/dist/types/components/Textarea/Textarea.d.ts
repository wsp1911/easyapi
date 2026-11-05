import { type TextareaHTMLAttributes } from "react";
export interface TextareaProps extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "className"> {
    autoResize?: boolean;
    className?: string;
    errorMessage?: string;
    font?: "mono" | "sans";
    hint?: string;
    invalid?: boolean;
    label?: string;
    layout?: "auto" | "fill";
    onValueChange?: (value: string) => void;
    resize?: "none" | "vertical";
    showCount?: boolean;
    variant?: "default" | "filled" | "outlined";
}
export declare const Textarea: import("react").ForwardRefExoticComponent<TextareaProps & import("react").RefAttributes<HTMLTextAreaElement>>;
