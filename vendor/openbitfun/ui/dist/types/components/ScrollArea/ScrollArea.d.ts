import { type HTMLAttributes } from "react";
export type ScrollAreaOrientation = "vertical" | "horizontal" | "both";
export type ScrollbarVisibility = "auto" | "hover" | "always" | "hidden";
export type ScrollAreaEdgeFade = "none" | "vertical";
export type ScrollAreaOverscrollBehaviorY = "auto" | "contain";
export interface ScrollAreaProps extends HTMLAttributes<HTMLDivElement> {
    "data-openbitfun-component"?: string;
    "data-openbitfun-part"?: string;
    orientation?: ScrollAreaOrientation;
    /** Fade only the vertical edges with more content beyond the viewport. */
    edgeFade?: ScrollAreaEdgeFade;
    /** Let vertical scrolling continue to an ancestor when this viewport reaches an edge. */
    overscrollBehaviorY?: ScrollAreaOverscrollBehaviorY;
    /** Auto preserves track space; hover also removes idle mouse tracks. Touch remains visible. */
    scrollbarVisibility?: ScrollbarVisibility;
}
export declare const ScrollArea: import("react").ForwardRefExoticComponent<ScrollAreaProps & import("react").RefAttributes<HTMLDivElement>>;
