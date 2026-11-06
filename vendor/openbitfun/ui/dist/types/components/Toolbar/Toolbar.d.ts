import { type HTMLAttributes, type ReactNode } from "react";
export type ToolbarSize = "sm" | "md";
export type ToolbarLeadingOverflow = "visible" | "scroll";
export type ToolbarGroupGap = "sm" | "md";
export interface ToolbarProps extends Omit<HTMLAttributes<HTMLDivElement>, "children"> {
    bordered?: boolean;
    center?: ReactNode;
    leading?: ReactNode;
    leadingOverflow?: ToolbarLeadingOverflow;
    size?: ToolbarSize;
    trailing?: ReactNode;
}
export interface ToolbarGroupProps extends HTMLAttributes<HTMLDivElement> {
    gap?: ToolbarGroupGap;
}
export type ToolbarBadgeProps = HTMLAttributes<HTMLSpanElement>;
export type ToolbarSeparatorProps = HTMLAttributes<HTMLSpanElement>;
export declare const Toolbar: import("react").ForwardRefExoticComponent<ToolbarProps & import("react").RefAttributes<HTMLDivElement>>;
export declare const ToolbarGroup: import("react").ForwardRefExoticComponent<ToolbarGroupProps & import("react").RefAttributes<HTMLDivElement>>;
export declare const ToolbarBadge: import("react").ForwardRefExoticComponent<ToolbarBadgeProps & import("react").RefAttributes<HTMLSpanElement>>;
export declare const ToolbarSeparator: import("react").ForwardRefExoticComponent<ToolbarSeparatorProps & import("react").RefAttributes<HTMLSpanElement>>;
