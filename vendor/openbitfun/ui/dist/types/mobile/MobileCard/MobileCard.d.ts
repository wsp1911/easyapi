import { type HTMLAttributes } from "react";
export type MobileCardAppearance = "plain" | "surface" | "elevated";
export type MobileCardPadding = "none" | "sm" | "md" | "lg";
export interface MobileCardProps extends HTMLAttributes<HTMLDivElement> {
    appearance?: MobileCardAppearance;
    padding?: MobileCardPadding;
}
export declare const MobileCard: import("react").ForwardRefExoticComponent<MobileCardProps & import("react").RefAttributes<HTMLDivElement>>;
