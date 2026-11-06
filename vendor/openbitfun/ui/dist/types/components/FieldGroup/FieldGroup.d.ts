import { type HTMLAttributes, type ReactNode } from "react";
import { type FieldSurface } from "../../internal/fieldSurface";
export type FieldGroupAppearance = "plain" | "subtle";
export type FieldGroupFieldSurface = FieldSurface;
export type FieldRowAlignment = "center" | "start";
export type FieldRowPadding = "none" | "md";
export type FormSectionHeading = "h2" | "h3" | "h4";
export interface FormSectionProps extends Omit<HTMLAttributes<HTMLElement>, "title"> {
    actions?: ReactNode;
    description?: ReactNode;
    /** Keep compact section summaries beside the title instead of below it. */
    descriptionLayout?: "stacked" | "inline";
    headingAs?: FormSectionHeading;
    leading?: ReactNode;
    title?: ReactNode;
}
export interface FieldGroupProps extends HTMLAttributes<HTMLDivElement> {
    appearance?: FieldGroupAppearance;
    dividers?: boolean;
    /** Lets text and picker field shells reuse the surrounding grouped surface. */
    fieldSurface?: FieldGroupFieldSurface;
}
export interface FieldRowProps extends HTMLAttributes<HTMLDivElement> {
    align?: FieldRowAlignment;
    padding?: FieldRowPadding;
}
export declare const FormSection: import("react").ForwardRefExoticComponent<FormSectionProps & import("react").RefAttributes<HTMLElement>>;
export declare const FieldGroup: import("react").ForwardRefExoticComponent<FieldGroupProps & import("react").RefAttributes<HTMLDivElement>>;
export declare const FieldRow: import("react").ForwardRefExoticComponent<FieldRowProps & import("react").RefAttributes<HTMLDivElement>>;
