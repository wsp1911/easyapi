import { type SVGProps } from "react";
export interface OpenBitFunBrandMotionProps extends Omit<SVGProps<SVGSVGElement>, "children"> {
    active?: boolean;
    size?: number;
    label?: string;
    variant?: "flow" | "counter-rotate" | "construction";
}
export declare function OpenBitFunBrandMotion({ active, size, label, variant, className, style, ...props }: OpenBitFunBrandMotionProps): import("react/jsx-runtime").JSX.Element;
