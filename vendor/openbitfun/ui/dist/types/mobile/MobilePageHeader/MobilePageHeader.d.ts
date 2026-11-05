import { type HTMLAttributes, type ReactNode } from "react";
export interface MobilePageHeaderProps extends Omit<HTMLAttributes<HTMLElement>, "title"> {
    actions?: ReactNode;
    centered?: boolean;
    leading?: ReactNode;
    subtitle?: ReactNode;
    title: ReactNode;
}
export declare const MobilePageHeader: import("react").ForwardRefExoticComponent<MobilePageHeaderProps & import("react").RefAttributes<HTMLElement>>;
