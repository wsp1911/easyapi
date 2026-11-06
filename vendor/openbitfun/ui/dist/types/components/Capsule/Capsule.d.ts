import { type HTMLAttributes, type ReactNode } from "react";
export interface CapsuleProps extends HTMLAttributes<HTMLSpanElement> {
    /** One IconButton (optionally wrapped in Tooltip), rendered beside the content. */
    action?: ReactNode;
    /** Reserve a fixed action slot inside a Button child's trailing padding. */
    actionPlacement?: "overlay" | "reserved";
    /** Match the size of the child Button, Input, or label surface. */
    size?: "xs" | "sm" | "md" | "lg";
}
/** Composes content with an independent circular glass action. */
export declare const Capsule: import("react").ForwardRefExoticComponent<CapsuleProps & import("react").RefAttributes<HTMLSpanElement>>;
