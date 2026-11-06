import { type HTMLAttributes, type ReactNode } from "react";
export type MobileAvatarShape = "circle" | "rounded";
export type MobileAvatarSize = "xs" | "sm" | "md" | "lg";
export type MobileAvatarStatus = "online" | "away" | "busy" | "offline";
export interface MobileAvatarProps extends HTMLAttributes<HTMLSpanElement> {
    alt?: string;
    children?: ReactNode;
    name?: string;
    shape?: MobileAvatarShape;
    size?: MobileAvatarSize;
    src?: string;
    status?: MobileAvatarStatus;
    statusLabel?: string;
}
/** A mobile identity mark: character artwork, an image, or initials. The status dot carries its own
    label when the caller supplies one, because a colour alone is not a status. */
export declare function MobileAvatar({ alt, children, className, name, shape, size, src, status, statusLabel, ...props }: MobileAvatarProps): import("react/jsx-runtime").JSX.Element;
