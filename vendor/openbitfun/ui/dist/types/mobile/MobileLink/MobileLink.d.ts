import { type AnchorHTMLAttributes } from "react";
export type MobileLinkAppearance = "inline" | "surface";
export interface MobileLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
    appearance?: MobileLinkAppearance;
}
export declare const MobileLink: import("react").ForwardRefExoticComponent<MobileLinkProps & import("react").RefAttributes<HTMLAnchorElement>>;
