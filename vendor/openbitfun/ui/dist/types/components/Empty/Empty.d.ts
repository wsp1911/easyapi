import { type HTMLAttributes, type ReactNode } from "react";
export type EmptyMediaSize = "sm" | "md" | "lg";
export interface EmptyProps extends Omit<HTMLAttributes<HTMLDivElement>, "children" | "title"> {
    actions?: ReactNode;
    children?: ReactNode;
    description?: ReactNode;
    icon?: ReactNode;
    image?: ReactNode;
    imageSize?: EmptyMediaSize;
    title?: ReactNode;
}
export declare const Empty: import("react").ForwardRefExoticComponent<EmptyProps & import("react").RefAttributes<HTMLDivElement>>;
