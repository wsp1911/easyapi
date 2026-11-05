import { type HTMLAttributes, type ReactNode } from "react";
export interface NumberBadgeProps extends Omit<HTMLAttributes<HTMLSpanElement>, "children"> {
    /** The caller owns formatting and any accessible contextual label. */
    value: ReactNode;
}
export declare const NumberBadge: import("react").ForwardRefExoticComponent<NumberBadgeProps & import("react").RefAttributes<HTMLSpanElement>>;
