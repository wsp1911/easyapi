import { type HTMLAttributes, type ReactNode } from "react";
export type AvatarSize = "sm" | "md" | "lg";
export interface AvatarProps extends Omit<HTMLAttributes<HTMLSpanElement>, "children"> {
    alt?: string;
    children?: ReactNode;
    icon?: ReactNode;
    onError?: () => void;
    shape?: "circle" | "square";
    size?: AvatarSize;
    src?: string;
}
export interface AvatarGroupProps extends HTMLAttributes<HTMLDivElement> {
    children: ReactNode;
    maxCount?: number;
}
export declare function Avatar({ alt, children, className, icon, onError, shape, size, src, ...props }: AvatarProps): import("react/jsx-runtime").JSX.Element;
export declare function AvatarGroup({ children, className, maxCount, ...props }: AvatarGroupProps): import("react/jsx-runtime").JSX.Element;
