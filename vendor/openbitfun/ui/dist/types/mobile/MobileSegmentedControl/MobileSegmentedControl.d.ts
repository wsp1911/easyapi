import { type HTMLAttributes, type ReactNode } from "react";
export interface MobileSegmentedControlOption<Value extends string = string> {
    disabled?: boolean;
    label: ReactNode;
    value: Value;
}
export interface MobileSegmentedControlProps<Value extends string = string> extends Omit<HTMLAttributes<HTMLDivElement>, "onChange"> {
    "aria-label": string;
    onChange: (value: Value) => void;
    options: readonly MobileSegmentedControlOption<Value>[];
    value: Value;
}
export declare function MobileSegmentedControl<Value extends string>({ "aria-label": ariaLabel, className, onChange, options, value, ...props }: MobileSegmentedControlProps<Value>): import("react/jsx-runtime").JSX.Element;
