import { type ButtonHTMLAttributes } from "react";
export interface MobileScrimProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children"> {
    "aria-label": string;
    visible?: boolean;
}
export declare const MobileScrim: import("react").ForwardRefExoticComponent<MobileScrimProps & import("react").RefAttributes<HTMLButtonElement>>;
