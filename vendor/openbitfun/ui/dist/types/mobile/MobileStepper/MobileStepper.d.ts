import { type HTMLAttributes, type ReactNode } from "react";
export interface MobileStepperProps extends Omit<HTMLAttributes<HTMLDivElement>, "onChange"> {
    decrementLabel: string;
    description?: ReactNode;
    disabled?: boolean;
    incrementLabel: string;
    invalid?: boolean;
    label?: ReactNode;
    max?: number;
    min?: number;
    onValueChange?: (value: number) => void;
    step?: number;
    unit?: ReactNode;
    value?: number;
}
/** The mobile form of a number input: a value that is usually nudged, so the two ends are buttons
    and the middle stays typable. Bounds disable the buttons rather than rejecting the tap. */
export declare function MobileStepper({ className, decrementLabel, description, disabled, incrementLabel, invalid, label, max, min, onValueChange, step, unit, value, ...props }: MobileStepperProps): import("react/jsx-runtime").JSX.Element;
