import { type ReactNode, type SelectHTMLAttributes } from "react";
import { type LayerPlacement } from "../../internal/useAnchoredLayer";
export type SelectValue = string | number;
export type SelectSize = "sm" | "md" | "lg";
export type SelectPlacement = Extract<LayerPlacement, "top" | "bottom">;
export interface SelectOption {
    disabled?: boolean;
    group?: string;
    label: string;
    /** Optional help shown on hover for the option and selected value. */
    tooltip?: string;
    testAttributes?: Record<`data-${string}`, string | number | boolean | undefined>;
    testId?: string;
    value: SelectValue;
}
export interface SelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, "children" | "defaultValue" | "onChange" | "size" | "value"> {
    defaultOpen?: boolean;
    defaultValue?: SelectValue;
    invalid?: boolean;
    leading?: ReactNode;
    onOpenChange?: (open: boolean) => void;
    onValueChange?: (value: SelectValue) => void;
    open?: boolean;
    options: readonly SelectOption[];
    placement?: SelectPlacement;
    placeholder?: string;
    /** Size the expanded surface to its trigger or the full option labels. */
    popupWidth?: "trigger" | "content";
    size?: SelectSize;
    value?: SelectValue;
    /** Fill the available field width or fit the currently selected label. */
    width?: "full" | "content";
}
export declare const Select: import("react").ForwardRefExoticComponent<SelectProps & import("react").RefAttributes<HTMLSelectElement>>;
