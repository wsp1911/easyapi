import { type HTMLAttributes, type ReactNode, type RefObject } from "react";
import type { OverlayDismissReason } from "../../overlay/types";
export type MobileSheetCloseReason = OverlayDismissReason;
export interface MobileSheetProps extends Omit<HTMLAttributes<HTMLDivElement>, "children" | "title"> {
    autoFocus?: boolean;
    children: ReactNode;
    closeOnEscape?: boolean;
    closeOnPointerOutside?: boolean;
    description?: ReactNode;
    footer?: ReactNode;
    headerAction?: ReactNode;
    initialFocusRef?: RefObject<HTMLElement | null>;
    onOpenChange: (open: false, reason: MobileSheetCloseReason) => void;
    open: boolean;
    preventScroll?: boolean;
    showHandle?: boolean;
    title: ReactNode;
    trapFocus?: boolean;
}
export declare const MobileSheet: import("react").ForwardRefExoticComponent<MobileSheetProps & import("react").RefAttributes<HTMLDivElement>>;
