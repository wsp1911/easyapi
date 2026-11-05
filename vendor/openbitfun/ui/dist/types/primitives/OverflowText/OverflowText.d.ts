import { type HTMLAttributes } from "react";
export type OverflowTextBehavior = "fade" | "marquee";
export interface OverflowTextProps extends HTMLAttributes<HTMLElement> {
    /** Full application-tooltip text, even when the label fits. Empty opts out. Never a native title. */
    title?: string;
    /** Preserve paragraph/div semantics when adopting the shared text behavior. */
    as?: "span" | "p" | "div";
    /** Clamp a multiline preview; its full text uses the same hover/focus tooltip. */
    lines?: number;
    /** Plain text defaults to marquee; rich composition defaults to a static fade. */
    behavior?: OverflowTextBehavior;
    /** Single-line resting treatment; multiline clamps keep their existing layout. */
    overflowStyle?: "fade" | "ellipsis";
    /** Interaction-only text ignores virtual active state on itself and its owner. */
    marqueeTrigger?: "interaction-or-active" | "interaction";
    /** Runs an overflowing marquee while its owning control is virtually active. */
    marqueeActive?: boolean;
}
export declare const OverflowText: import("react").ForwardRefExoticComponent<OverflowTextProps & import("react").RefAttributes<HTMLElement>>;
