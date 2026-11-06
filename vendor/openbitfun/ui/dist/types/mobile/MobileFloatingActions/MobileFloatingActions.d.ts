import { type HTMLAttributes, type ReactNode } from "react";
export interface MobileFloatingActionsProps extends Omit<HTMLAttributes<HTMLDivElement>, "children"> {
    leading?: ReactNode;
    trailing?: ReactNode;
}
export declare const MobileFloatingActions: import("react").ForwardRefExoticComponent<MobileFloatingActionsProps & import("react").RefAttributes<HTMLDivElement>>;
