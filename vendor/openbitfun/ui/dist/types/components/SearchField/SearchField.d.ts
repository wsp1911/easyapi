import { type MouseEventHandler, type ReactNode } from "react";
import { type InputProps } from "../Input";
export interface SearchFieldProps extends Omit<InputProps, "leading" | "trailing" | "type"> {
    /** Embedded delegates the field surface to its container; panel joins the input and footer in a frosted surface. */
    variant?: "default" | "embedded" | "panel";
    clearLabel?: string;
    /** Panel-only second row for caller-owned status and actions; search logic stays with the caller. */
    footer?: ReactNode;
    leadingIcon?: ReactNode;
    onClear?: MouseEventHandler<HTMLButtonElement>;
    onSearch?: (value: string) => void;
    shortcut?: ReactNode;
    /** Custom inline content before the clear action, e.g. match counts or a busy indicator. */
    trailing?: ReactNode;
    /** Terminal xs IconButton(s), after shortcut content, with an inset matching the input row's vertical clearance. */
    trailingAction?: ReactNode;
}
export declare const SearchField: import("react").ForwardRefExoticComponent<SearchFieldProps & import("react").RefAttributes<HTMLInputElement>>;
