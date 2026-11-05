import { type HTMLAttributes, type ReactNode } from "react";
export type MobileBannerTone = "neutral" | "info" | "warning" | "danger";
export interface MobileBannerProps extends HTMLAttributes<HTMLDivElement> {
    action?: ReactNode;
    icon?: ReactNode;
    tone?: MobileBannerTone;
}
export declare function MobileBanner({ action, children, className, icon, role, tone, ...props }: MobileBannerProps): import("react/jsx-runtime").JSX.Element;
