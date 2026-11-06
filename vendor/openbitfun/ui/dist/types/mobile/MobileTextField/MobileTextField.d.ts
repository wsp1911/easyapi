import { type InputHTMLAttributes, type ReactNode } from "react";
export type MobileTextFieldAppearance = "soft" | "surface";
export interface MobileTextFieldProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
    appearance?: MobileTextFieldAppearance;
    inputClassName?: string;
    invalid?: boolean;
    leading?: ReactNode;
    trailing?: ReactNode;
}
export declare const MobileTextField: import("react").ForwardRefExoticComponent<MobileTextFieldProps & import("react").RefAttributes<HTMLInputElement>>;
