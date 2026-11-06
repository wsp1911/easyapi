import { type OverflowTextProps } from "../../primitives/OverflowText";
export interface RollingTextProps extends Omit<OverflowTextProps, "children"> {
    children: string | number;
    /** Change this identity to roll; text edits under the same identity stay still. */
    transitionKey?: string | number;
}
/** A single-line vertical replacement: old text exits up, new text enters below. */
export declare const RollingText: import("react").ForwardRefExoticComponent<RollingTextProps & import("react").RefAttributes<HTMLSpanElement>>;
