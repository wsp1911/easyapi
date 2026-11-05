import type { ImgHTMLAttributes } from "react";
export interface OpenBitFunArtworkProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, "src" | "srcSet" | "sizes" | "width" | "height" | "alt" | "children"> {
    /** Omit when adjacent text already identifies OpenBitFun. */
    label?: string;
    /** Display size in CSS pixels; the original square proportions are preserved. */
    size?: number;
}
/** The original silver material on a transparent canvas, without an app tile. */
export declare function OpenBitFunSolidMark({ label, size, className, style, ...props }: OpenBitFunArtworkProps): import("react/jsx-runtime").JSX.Element;
/** The same generated silver-on-black artwork used by installed applications. */
export declare function OpenBitFunAppIcon({ label, size, className, style, ...props }: OpenBitFunArtworkProps): import("react/jsx-runtime").JSX.Element;
