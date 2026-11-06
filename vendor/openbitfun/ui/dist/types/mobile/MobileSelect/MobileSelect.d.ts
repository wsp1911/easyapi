import { type ButtonHTMLAttributes, type ReactNode } from "react";
export type MobileSelectAppearance = "soft" | "surface";
export interface MobileSelectOption {
    description?: ReactNode;
    disabled?: boolean;
    label: ReactNode;
    leading?: ReactNode;
    value: string;
}
export interface MobileSelectProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children" | "disabled" | "onChange" | "value"> {
    appearance?: MobileSelectAppearance;
    cancelLabel?: ReactNode;
    defaultOpen?: boolean;
    defaultValue?: string;
    description?: ReactNode;
    disabled?: boolean;
    emptyContent?: ReactNode;
    invalid?: boolean;
    label?: ReactNode;
    onOpenChange?: (open: boolean) => void;
    onValueChange?: (value: string) => void;
    open?: boolean;
    options: readonly MobileSelectOption[];
    placeholder?: ReactNode;
    sheetTitle: ReactNode;
    value?: string;
}
/** A choice field. Mobile has no room for a popup listbox, so the field opens the choice sheet the
    rest of the mobile set already uses; the selected option is read from the field's own text. */
export declare function MobileSelect({ appearance, cancelLabel, className, defaultValue, defaultOpen, description, disabled, emptyContent, invalid, label, onOpenChange, onValueChange, open: controlledOpen, options, placeholder, sheetTitle, value, ...props }: MobileSelectProps): import("react/jsx-runtime").JSX.Element;
