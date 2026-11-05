import { type InputHTMLAttributes, type ReactNode } from "react";
export type CheckboxSize = "sm" | "md" | "lg";
export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "children" | "size" | "type"> {
    /** Native presentation keeps the browser-drawn control and focus behavior. */
    appearance?: "custom" | "native";
    children?: ReactNode;
    description?: ReactNode;
    indeterminate?: boolean;
    invalid?: boolean;
    label?: ReactNode;
    onCheckedChange?: (checked: boolean) => void;
    /** Preserve the selection's contrast while preventing user input. */
    readOnly?: boolean;
    size?: CheckboxSize;
}
export declare const Checkbox: import("react").ForwardRefExoticComponent<CheckboxProps & import("react").RefAttributes<HTMLInputElement>>;
