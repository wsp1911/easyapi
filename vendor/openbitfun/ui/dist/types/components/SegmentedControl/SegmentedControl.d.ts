import { type HTMLAttributes, type ReactNode } from "react";
export interface SegmentedControlOption {
    disabled?: boolean;
    icon?: ReactNode;
    label: ReactNode;
    value: string;
}
export interface SegmentedControlProps extends Omit<HTMLAttributes<HTMLDivElement>, "children" | "defaultValue" | "onChange"> {
    /** Buttons keep every option in Tab order and leave arrow keys to the owner. */
    interaction?: "radio" | "buttons";
    labelBehavior?: "overflow" | "static";
    defaultValue?: string;
    disabled?: boolean;
    distribution?: "content" | "fill";
    onValueChange?: (value: string) => void;
    options: readonly SegmentedControlOption[];
    size?: "sm" | "md";
    tone?: "accent" | "neutral";
    value?: string;
    variant?: "bar" | "pills";
}
export declare const SegmentedControl: import("react").ForwardRefExoticComponent<SegmentedControlProps & import("react").RefAttributes<HTMLDivElement>>;
