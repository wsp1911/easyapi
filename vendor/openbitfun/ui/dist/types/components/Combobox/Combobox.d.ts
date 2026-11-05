import { type HTMLAttributes, type ReactNode } from "react";
import { type LayerPlacement } from "../../internal/useAnchoredLayer";
import { type ListboxValue } from "../Listbox";
export type ComboboxValue = ListboxValue;
export type ComboboxSize = "sm" | "md" | "lg";
export type ComboboxPlacement = Extract<LayerPlacement, "top" | "bottom">;
export interface ComboboxOption {
    description?: ReactNode;
    disabled?: boolean;
    group?: string;
    label: string;
    leading?: ReactNode;
    metadata?: ReactNode;
    testId?: string;
    value: ComboboxValue;
}
interface PickerCommonProps extends Omit<HTMLAttributes<HTMLDivElement>, "defaultValue" | "onChange"> {
    clearable?: boolean;
    defaultOpen?: boolean;
    disabled?: boolean;
    errorMessage?: ReactNode;
    filterOption?: (option: ComboboxOption, query: string) => boolean;
    invalid?: boolean;
    label?: ReactNode;
    loading?: boolean;
    onCreateValue?: (input: string) => ComboboxValue | void;
    onOpenChange?: (open: boolean) => void;
    open?: boolean;
    options?: readonly ComboboxOption[];
    placement?: ComboboxPlacement;
    placeholder?: ReactNode;
    required?: boolean;
    size?: ComboboxSize;
}
export interface ComboboxProps extends PickerCommonProps {
    defaultValue?: ComboboxValue;
    onValueChange?: (value: ComboboxValue) => void;
    value?: ComboboxValue;
}
export interface MultiSelectProps extends PickerCommonProps {
    defaultValue?: readonly ComboboxValue[];
    maxVisibleTags?: number;
    onValueChange?: (value: ComboboxValue[]) => void;
    /** Replaces selected tags with a compact, caller-localized summary. */
    selectionSummary?: ReactNode;
    showSelectAll?: boolean;
    value?: readonly ComboboxValue[];
}
export declare const Combobox: import("react").ForwardRefExoticComponent<ComboboxProps & import("react").RefAttributes<HTMLDivElement>>;
export declare const MultiSelect: import("react").ForwardRefExoticComponent<MultiSelectProps & import("react").RefAttributes<HTMLDivElement>>;
export {};
