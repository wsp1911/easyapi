import { type ReactNode, type TextareaHTMLAttributes } from "react";
export interface MobileTextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    invalid?: boolean;
    leading?: ReactNode;
    trailing?: ReactNode;
}
export declare const MobileTextarea: import("react").ForwardRefExoticComponent<MobileTextareaProps & import("react").RefAttributes<HTMLTextAreaElement>>;
