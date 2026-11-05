import { type HTMLAttributes } from "react";
export type SpinnerSize = "xs" | "sm" | "md" | "lg";
export type SpinnerVariant = "bars" | "matrix";
export interface SpinnerProps extends Omit<HTMLAttributes<HTMLSpanElement>, "children"> {
    size?: SpinnerSize;
    variant?: SpinnerVariant;
}
export declare const Spinner: import("react").ForwardRefExoticComponent<SpinnerProps & import("react").RefAttributes<HTMLSpanElement>>;
export interface LoadingStateProps extends HTMLAttributes<HTMLDivElement> {
    size?: SpinnerSize;
}
export declare const LoadingState: import("react").ForwardRefExoticComponent<LoadingStateProps & import("react").RefAttributes<HTMLDivElement>>;
