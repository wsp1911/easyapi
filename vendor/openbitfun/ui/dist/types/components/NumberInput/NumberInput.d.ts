import { type FocusEventHandler, type InputHTMLAttributes, type KeyboardEventHandler } from "react";
export interface NumberInputProps extends Pick<InputHTMLAttributes<HTMLInputElement>, "id" | "aria-label" | "aria-labelledby" | "aria-describedby" | "aria-invalid" | "required"> {
    className?: string;
    decrementLabel?: string;
    disabled?: boolean;
    disableWheel?: boolean;
    draggable?: boolean;
    /** Formats the unfocused value; editing and callbacks remain numeric. */
    formatValue?: (value: number) => string;
    incrementLabel?: string;
    label?: string;
    max?: number;
    min?: number;
    onBlur?: FocusEventHandler<HTMLInputElement>;
    onValueChange: (value: number) => void;
    onFocus?: FocusEventHandler<HTMLInputElement>;
    onKeyDown?: KeyboardEventHandler<HTMLInputElement>;
    precision?: number;
    showButtons?: boolean;
    size?: "sm" | "md" | "lg";
    step?: number;
    unit?: string;
    value: number;
    variant?: "default" | "compact" | "stepper";
}
export declare const NumberInput: import("react").ForwardRefExoticComponent<NumberInputProps & import("react").RefAttributes<HTMLInputElement>>;
