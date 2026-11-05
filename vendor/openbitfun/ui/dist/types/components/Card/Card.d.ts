import { type HTMLAttributes, type ReactNode } from "react";
export type CardAppearance = "neutral" | "raised" | "subtle";
export type CardGap = "none" | "sm" | "md" | "lg";
export type CardPadding = "none" | "sm" | "md";
export type CardRadius = "none" | "sm" | "md" | "lg";
export type CardAlignment = "start" | "center";
export type CardContentAlignment = "start" | "center" | "end";
export type CardBodyAlignment = CardContentAlignment | "stretch";
export type CardFooterAlignment = "start" | "center" | "end" | "between";
export interface CardProps extends HTMLAttributes<HTMLDivElement> {
    appearance?: CardAppearance;
    clip?: boolean;
    gap?: CardGap;
    padding?: CardPadding;
    radius?: CardRadius;
}
export interface CardHeaderProps extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
    actions?: ReactNode;
    align?: CardAlignment;
    contentAlign?: CardContentAlignment;
    description?: ReactNode;
    leading?: ReactNode;
    padding?: CardPadding;
    title?: ReactNode;
}
export interface CardBodyProps extends HTMLAttributes<HTMLDivElement> {
    align?: CardBodyAlignment;
    padding?: CardPadding;
}
export type CardMediaProps = HTMLAttributes<HTMLDivElement>;
export interface CardFooterProps extends HTMLAttributes<HTMLDivElement> {
    align?: CardFooterAlignment;
    padding?: CardPadding;
}
export declare const Card: import("react").ForwardRefExoticComponent<CardProps & import("react").RefAttributes<HTMLDivElement>>;
export declare const CardHeader: import("react").ForwardRefExoticComponent<CardHeaderProps & import("react").RefAttributes<HTMLDivElement>>;
export declare const CardBody: import("react").ForwardRefExoticComponent<CardBodyProps & import("react").RefAttributes<HTMLDivElement>>;
export declare const CardMedia: import("react").ForwardRefExoticComponent<CardMediaProps & import("react").RefAttributes<HTMLDivElement>>;
export declare const CardFooter: import("react").ForwardRefExoticComponent<CardFooterProps & import("react").RefAttributes<HTMLDivElement>>;
