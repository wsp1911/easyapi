/** An explicit tooltip owns this subtree; text slots should not open another one. */
export declare const TooltipTriggerContext: import("react").Context<boolean>;
/** A legacy title fallback must yield to authored tooltips, not claim their trigger. */
export declare const TitleTooltipContext: import("react").Context<boolean>;
/** Multiple overflowing text slots can share the same owning control. */
export declare function registerTooltipTrigger(element: HTMLElement): () => void;
