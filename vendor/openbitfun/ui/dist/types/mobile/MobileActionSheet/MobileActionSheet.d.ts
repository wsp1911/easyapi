import type { ReactNode } from "react";
import { type MobileSheetProps } from "../MobileSheet";
export interface MobileActionSheetItem {
    description?: ReactNode;
    disabled?: boolean;
    id: string;
    label: ReactNode;
    leading?: ReactNode;
    tone?: "neutral" | "danger";
    trailing?: ReactNode;
}
export interface MobileActionSheetProps extends Omit<MobileSheetProps, "children" | "footer"> {
    actions: readonly MobileActionSheetItem[];
    cancelLabel?: ReactNode;
    closeOnAction?: boolean;
    onAction: (id: string) => void;
}
/** A consistent mobile action list presented inside a dismissible sheet. */
export declare function MobileActionSheet({ actions, cancelLabel, closeOnAction, onAction, onOpenChange, ...sheetProps }: MobileActionSheetProps): import("react/jsx-runtime").JSX.Element;
