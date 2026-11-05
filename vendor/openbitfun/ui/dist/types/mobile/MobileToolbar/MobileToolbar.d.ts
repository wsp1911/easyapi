import { type HTMLAttributes, type ReactNode } from "react";
export type MobileToolbarAppearance = "surface" | "plain";
export interface MobileToolbarProps extends HTMLAttributes<HTMLDivElement> {
    appearance?: MobileToolbarAppearance;
    children?: ReactNode;
    label?: string;
    leading?: ReactNode;
    safeArea?: boolean;
    sticky?: boolean;
    trailing?: ReactNode;
}
/** The action bar under a mobile screen. It separates from the content by fill and elevation rather
    than a rule, the same way the rest of the mobile surfaces do. */
export declare function MobileToolbar({ appearance, children, className, label, leading, safeArea, sticky, trailing, ...props }: MobileToolbarProps): import("react/jsx-runtime").JSX.Element;
