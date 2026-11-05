import { type InputHTMLAttributes, type ReactNode } from "react";
export type RadioSize = "sm" | "md" | "lg";
export interface RadioProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "children" | "size" | "type"> {
    children?: ReactNode;
    description?: ReactNode;
    invalid?: boolean;
    label?: ReactNode;
    onCheckedChange?: (checked: boolean) => void;
    /** Preserve the selection's contrast while preventing user input. */
    readOnly?: boolean;
    size?: RadioSize;
}
export declare const Radio: import("react").ForwardRefExoticComponent<RadioProps & import("react").RefAttributes<HTMLInputElement>>;
