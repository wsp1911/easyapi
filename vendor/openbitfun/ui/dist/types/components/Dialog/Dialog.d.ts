import { type HTMLAttributes, type ReactNode, type RefObject } from "react";
import { type IconButtonProps } from "../IconButton";
export type DialogCloseReason = "close-button" | "escape-key" | "pointer-outside";
export type DialogFooterAppearance = "attached" | "floating";
export type DialogSize = "sm" | "md" | "lg" | "xl" | "2xl";
export type SheetPlacement = "left" | "right" | "bottom";
export type SheetSize = "sm" | "md" | "lg";
interface OverlaySurfaceProps extends Omit<HTMLAttributes<HTMLDivElement>, "children"> {
    autoFocus?: boolean;
    restoreFocus?: boolean;
    portalTarget?: HTMLElement | null;
    overlayProps?: HTMLAttributes<HTMLDivElement> & {
        [key: `data-${string}`]: string | number | boolean | undefined;
    };
    children: ReactNode;
    closeOnEscape?: boolean;
    closeOnPointerOutside?: boolean;
    initialFocusRef?: RefObject<HTMLElement | null>;
    kind: "dialog" | "sheet";
    onOpenChange: (open: false, reason: DialogCloseReason) => void;
    /** Called after the closed surface has finished exiting and unmounted. */
    onExitComplete?: () => void;
    open: boolean;
    placement?: SheetPlacement;
    preventScroll?: boolean;
    role?: "dialog" | "alertdialog";
    size: DialogSize | SheetSize;
    trapFocus?: boolean;
}
export interface DialogProps extends Omit<OverlaySurfaceProps, "kind" | "placement" | "size"> {
    size?: DialogSize;
}
export declare const Dialog: import("react").ForwardRefExoticComponent<DialogProps & import("react").RefAttributes<HTMLDivElement>>;
export interface SheetProps extends Omit<OverlaySurfaceProps, "kind" | "placement" | "size"> {
    placement?: SheetPlacement;
    size?: SheetSize;
}
export declare const Sheet: import("react").ForwardRefExoticComponent<SheetProps & import("react").RefAttributes<HTMLDivElement>>;
export interface DialogHeaderProps extends HTMLAttributes<HTMLDivElement> {
    separator?: boolean;
}
export declare const DialogHeader: import("react").ForwardRefExoticComponent<DialogHeaderProps & import("react").RefAttributes<HTMLDivElement>>;
export declare const DialogHeading: import("react").ForwardRefExoticComponent<HTMLAttributes<HTMLDivElement> & import("react").RefAttributes<HTMLDivElement>>;
export declare const DialogTitle: import("react").ForwardRefExoticComponent<HTMLAttributes<HTMLHeadingElement> & import("react").RefAttributes<HTMLHeadingElement>>;
export declare const DialogDescription: import("react").ForwardRefExoticComponent<HTMLAttributes<HTMLParagraphElement> & import("react").RefAttributes<HTMLParagraphElement>>;
export declare const DialogHeaderActions: import("react").ForwardRefExoticComponent<HTMLAttributes<HTMLDivElement> & import("react").RefAttributes<HTMLDivElement>>;
export interface DialogCloseProps extends Omit<IconButtonProps, "aria-label" | "icon" | "onClick"> {
    "aria-label"?: string;
    icon?: ReactNode;
}
export declare const DialogClose: import("react").ForwardRefExoticComponent<DialogCloseProps & import("react").RefAttributes<HTMLButtonElement>>;
export interface DialogBodyProps extends HTMLAttributes<HTMLDivElement> {
    inset?: "none" | "standard";
}
export declare const DialogBody: import("react").ForwardRefExoticComponent<DialogBodyProps & import("react").RefAttributes<HTMLDivElement>>;
export interface DialogFooterProps extends HTMLAttributes<HTMLElement> {
    appearance?: DialogFooterAppearance;
    separator?: boolean;
}
export declare const DialogFooter: import("react").ForwardRefExoticComponent<DialogFooterProps & import("react").RefAttributes<HTMLElement>>;
export {};
