import type { ReactNode } from "react";
import { type MobileListRowAppearance } from "../MobileListRow";
import { type MobileSheetProps } from "../MobileSheet";
export interface MobileChoiceSheetOption {
    className?: string;
    description?: ReactNode;
    disabled?: boolean;
    label: ReactNode;
    leading?: ReactNode;
    trailing?: ReactNode;
    value: string;
}
export interface MobileChoiceSheetProps extends Omit<MobileSheetProps, "children" | "footer" | "onSelect"> {
    cancelLabel?: ReactNode;
    emptyContent?: ReactNode;
    onSelect: (value: string) => void;
    optionAppearance?: MobileListRowAppearance;
    options: readonly MobileChoiceSheetOption[];
    selectedValue?: string;
}
/** A mobile bottom sheet for short, mutually exclusive product choices. */
export declare function MobileChoiceSheet({ cancelLabel, className, emptyContent, onOpenChange, onSelect, optionAppearance, options, selectedValue, ...sheetProps }: MobileChoiceSheetProps): import("react/jsx-runtime").JSX.Element;
