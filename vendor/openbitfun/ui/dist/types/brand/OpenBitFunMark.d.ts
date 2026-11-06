import { type CSSProperties, type HTMLAttributes } from "react";
export interface OpenBitFunMarkProps extends Omit<HTMLAttributes<HTMLSpanElement>, "children"> {
    /** Omit when adjacent text already names the product. */
    label?: string;
    size?: CSSProperties["width"];
    motion?: "none" | "breathe";
    active?: boolean;
}
/** The authored transparent mark; currentColor follows the consuming surface. */
export declare function OpenBitFunMark({ label, size, motion, active, className, style, ...props }: OpenBitFunMarkProps): import("react/jsx-runtime").JSX.Element;
