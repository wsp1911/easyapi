import { type HTMLAttributes, type ReactNode } from "react";
export interface MobileComposerProps extends Omit<HTMLAttributes<HTMLDivElement>, "children" | "onActivate"> {
    "aria-label"?: string;
    children: ReactNode;
    endActions?: ReactNode;
    expanded?: boolean;
    leading?: ReactNode;
    onActivate?: () => void;
    startActions?: ReactNode;
}
export declare const MobileComposer: import("react").ForwardRefExoticComponent<MobileComposerProps & import("react").RefAttributes<HTMLDivElement>>;
