import { type HTMLAttributes, type ReactNode } from "react";
export interface MobileSectionProps extends Omit<HTMLAttributes<HTMLElement>, "title"> {
    action?: ReactNode;
    description?: ReactNode;
    title?: ReactNode;
}
export declare const MobileSection: import("react").ForwardRefExoticComponent<MobileSectionProps & import("react").RefAttributes<HTMLElement>>;
