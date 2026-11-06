import { type ButtonHTMLAttributes, type ReactNode } from "react";
export type MobileTagAppearance = "soft" | "accent";
export type MobileTagSize = "sm" | "md";
export interface MobileTagProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children"> {
    appearance?: MobileTagAppearance;
    children: ReactNode;
    leading?: ReactNode;
    selected?: boolean;
    size?: MobileTagSize;
    trailing?: ReactNode;
}
/** The mobile form of the web Capsule: a labelled pill that may carry a leading mark and a trailing
    slot. Selection is a fill, never a stroke — a bordered chip would make a filter row read as a
    row of inputs. */
export declare const MobileTag: import("react").ForwardRefExoticComponent<MobileTagProps & import("react").RefAttributes<HTMLButtonElement>>;
