import { type ButtonHTMLAttributes, type ReactNode } from "react";
export type MobileListRowAppearance = "plain" | "surface";
export type MobileListRowTone = "neutral" | "danger";
export interface MobileListRowProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children"> {
    appearance?: MobileListRowAppearance;
    label: ReactNode;
    leading?: ReactNode;
    selected?: boolean;
    supportingText?: ReactNode;
    tone?: MobileListRowTone;
    trailing?: ReactNode;
}
export declare const MobileListRow: import("react").ForwardRefExoticComponent<MobileListRowProps & import("react").RefAttributes<HTMLButtonElement>>;
