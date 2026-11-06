import { type ReactElement, type ReactNode, type RefObject } from "react";
export type TooltipPlacement = "top" | "bottom" | "left" | "right";
export type TooltipTrigger = "hover" | "click" | "focus" | "hover-focus";
export interface TooltipProps {
    /** Single focusable trigger element the tooltip describes. */
    children?: ReactElement;
    className?: string;
    content: ReactNode;
    /** Open delay in milliseconds. Falls back to the provider value, then 450ms. */
    delay?: number;
    disabled?: boolean;
    /** Position near the mouse cursor instead of the trigger element. */
    followCursor?: boolean;
    /** Keep the tooltip open while hovered so its content can be selected or clicked. */
    interactive?: boolean;
    /** Click also opens immediately; another click, outside press, Escape, or scrolling dismisses it. */
    openOnClick?: boolean;
    /** Preferred side of the trigger; flips to the opposite side when space runs out. */
    placement?: TooltipPlacement;
    trigger?: TooltipTrigger;
    /** Bind to an existing control without adding a wrapper or another tab stop. */
    triggerRef?: RefObject<HTMLElement | null>;
    /** Reveal a virtually focused option, for example in an aria-activedescendant listbox. */
    active?: boolean;
    /** Refresh lazy content or decline opening when the trigger no longer needs a tooltip. */
    onBeforeShow?: () => boolean;
}
export declare function Tooltip({ children, className, content, delay, disabled, followCursor, interactive, openOnClick, placement, trigger, triggerRef: externalTriggerRef, active, onBeforeShow, }: TooltipProps): import("react/jsx-runtime").JSX.Element;
