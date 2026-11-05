import { type HTMLAttributes, type ReactElement, type ReactNode } from "react";
interface FieldControlProps {
    "aria-describedby"?: string;
    "aria-invalid"?: boolean | "true" | "false";
    id?: string;
    required?: boolean;
}
export type FieldControlWidth = "auto" | "fill";
export type FieldHorizontalGap = "md" | "lg";
export type FieldLabelWidth = "auto" | "sm" | "md" | "lg";
export interface FieldProps extends Omit<HTMLAttributes<HTMLDivElement>, "children"> {
    children: ReactElement<FieldControlProps>;
    controlLeading?: ReactNode;
    controlTrailing?: ReactNode;
    controlWidth?: FieldControlWidth;
    description?: ReactNode;
    /** Validation message rendered below the control; also marks the control invalid. */
    error?: ReactNode;
    horizontalGap?: FieldHorizontalGap;
    label: ReactNode;
    labelAction?: ReactNode;
    labelWidth?: FieldLabelWidth;
    orientation?: "horizontal" | "vertical";
    required?: boolean;
}
export declare const Field: import("react").ForwardRefExoticComponent<FieldProps & import("react").RefAttributes<HTMLDivElement>>;
export {};
