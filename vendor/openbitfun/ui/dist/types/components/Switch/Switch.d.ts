import { type InputHTMLAttributes } from "react";
export interface SwitchProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "children" | "type"> {
    onCheckedChange?: (checked: boolean) => void;
}
export declare const Switch: import("react").ForwardRefExoticComponent<SwitchProps & import("react").RefAttributes<HTMLInputElement>>;
