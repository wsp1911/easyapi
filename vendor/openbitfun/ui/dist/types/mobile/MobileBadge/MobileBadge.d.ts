import { type HTMLAttributes, type ReactNode } from "react";
export type MobileBadgeTone = "neutral" | "info" | "success" | "warning" | "danger";
export interface MobileBadgeProps extends HTMLAttributes<HTMLSpanElement> {
    dot?: boolean;
    leading?: ReactNode;
    tone?: MobileBadgeTone;
}
export declare function MobileBadge({ children, className, dot, leading, tone, ...props }: MobileBadgeProps): import("react/jsx-runtime").JSX.Element;
