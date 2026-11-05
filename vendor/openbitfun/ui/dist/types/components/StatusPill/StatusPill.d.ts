import { type HTMLAttributes, type ReactNode } from "react";
export type StatusPillTone = "neutral" | "accent" | "info" | "success" | "warning" | "danger";
export interface StatusPillProps extends Omit<HTMLAttributes<HTMLSpanElement>, "children"> {
    children: ReactNode;
    leading?: ReactNode;
    tone?: StatusPillTone;
    shape?: "pill" | "rounded";
    /** Strong color for short labels such as chat modes; prose keeps the default. */
    emphasis?: boolean;
}
export declare const StatusPill: import("react").ForwardRefExoticComponent<StatusPillProps & import("react").RefAttributes<HTMLSpanElement>>;
