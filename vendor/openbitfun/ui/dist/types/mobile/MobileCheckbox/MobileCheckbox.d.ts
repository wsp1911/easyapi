import { type InputHTMLAttributes, type ReactNode } from "react";
export type MobileCheckboxAppearance = "plain" | "surface";
export interface MobileCheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "children" | "size" | "type"> {
    appearance?: MobileCheckboxAppearance;
    checked?: boolean;
    defaultChecked?: boolean;
    description?: ReactNode;
    indeterminate?: boolean;
    invalid?: boolean;
    label: ReactNode;
    onCheckedChange?: (checked: boolean) => void;
}
/** A check row. A checkbox in a mobile list is a row, not a box beside a caption: the whole row is
    the target, so the box keeps the web control's geometry and the row supplies the touch size. */
export declare const MobileCheckbox: import("react").ForwardRefExoticComponent<MobileCheckboxProps & import("react").RefAttributes<HTMLInputElement>>;
