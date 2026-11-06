import type { HTMLAttributes } from "react";
export interface ShimmerTextProps extends HTMLAttributes<HTMLSpanElement> {
    /** Animate while work is active; false keeps the same readable text. */
    active?: boolean;
}
/** A slow, softly feathered fade for short, host-provided activity labels. */
export declare function ShimmerText({ active, children, className, ...props }: ShimmerTextProps): import("react/jsx-runtime").JSX.Element;
