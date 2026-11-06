import { type HTMLAttributes, type ReactNode } from "react";
export interface PageHeaderProps extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
    action?: ReactNode;
    align?: "center" | "start";
    description?: ReactNode;
    leading?: ReactNode;
    level?: 1 | 2 | 3 | 4 | 5 | 6;
    required?: boolean;
    size?: "display" | "lg" | "md" | "sm";
    title: ReactNode;
}
export declare const PageHeader: import("react").ForwardRefExoticComponent<PageHeaderProps & import("react").RefAttributes<HTMLDivElement>>;
