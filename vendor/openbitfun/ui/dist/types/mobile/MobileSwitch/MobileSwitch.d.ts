import { type InputHTMLAttributes, type ReactNode } from "react";
export type MobileSwitchAppearance = "plain" | "surface";
export interface MobileSwitchProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "children" | "size" | "type"> {
    appearance?: MobileSwitchAppearance;
    checked?: boolean;
    defaultChecked?: boolean;
    description?: ReactNode;
    label: ReactNode;
    onCheckedChange?: (checked: boolean) => void;
}
/** A settings row: the label and its explanation are the tap target, the switch is the control.
    The switch itself is the web Switch's track and thumb, so both entries read as one product. */
export declare const MobileSwitch: import("react").ForwardRefExoticComponent<MobileSwitchProps & import("react").RefAttributes<HTMLInputElement>>;
