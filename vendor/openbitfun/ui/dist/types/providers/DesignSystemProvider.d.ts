import { type ReactNode } from "react";
import type { ColorScheme, ContrastMode, DensityMode } from "../primitives/ThemeRoot";
import type { OverlayPortalTarget } from "../overlay/types";
import { type DesignSystemMessages } from "./DesignSystemProvider.context";
export interface DesignSystemProviderProps {
    children: ReactNode;
    colorScheme?: ColorScheme;
    contrast?: ContrastMode;
    density?: DensityMode;
    locale?: string;
    messages?: Partial<DesignSystemMessages>;
    portalHost?: OverlayPortalTarget;
    tooltipDelay?: number;
    /** Set at the document root to route legacy HTML title hints through Tooltip. */
    nativeTooltipPolicy?: "native" | "application";
}
export declare function DesignSystemProvider({ children, colorScheme, contrast, density, locale, messages, portalHost, tooltipDelay, nativeTooltipPolicy, }: DesignSystemProviderProps): import("react/jsx-runtime").JSX.Element;
