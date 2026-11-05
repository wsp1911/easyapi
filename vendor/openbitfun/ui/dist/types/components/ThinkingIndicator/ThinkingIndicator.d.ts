import { type HTMLAttributes } from "react";
import type { IconSize } from "../Icon";
export interface ThinkingIndicatorProps extends Omit<HTMLAttributes<HTMLSpanElement>, "children" | "aria-label"> {
    /** The host owns activity; completing or stopping returns to the original mark. */
    active?: boolean;
    label?: string;
    size?: IconSize;
}
/** Form the original mark, hold it, then dissolve it in reverse order. */
export declare const ThinkingIndicator: import("react").ForwardRefExoticComponent<ThinkingIndicatorProps & import("react").RefAttributes<HTMLSpanElement>>;
