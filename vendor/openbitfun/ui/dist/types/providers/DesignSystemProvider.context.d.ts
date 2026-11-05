import type { ColorScheme, ContrastMode, DensityMode } from "../primitives/ThemeRoot";
import type { OverlayLayerStack } from "../overlay/LayerStack";
import type { OverlayPortalTarget } from "../overlay/types";
export interface DesignSystemMessages {
    clearSelection: string;
    confirmAction: string;
    confirmCancel: string;
    createValue: string;
    dialogClose: string;
    loading: string;
    noOptions: string;
    searchOptions: string;
    selectAll: string;
    selectPlaceholder: string;
    toolCardOpenDetails: string;
    toolCardExpandDetails: string;
    toolCardCollapseDetails: string;
}
export interface DesignSystemContextValue {
    colorScheme: ColorScheme;
    contrast: ContrastMode;
    density: DensityMode;
    locale: string;
    messages: DesignSystemMessages;
    portalHost?: OverlayPortalTarget;
    tooltipDelay: number;
}
export declare const defaultDesignSystemMessages: DesignSystemMessages;
export declare const defaultDesignSystemContext: DesignSystemContextValue;
export declare const DesignSystemContext: import("react").Context<DesignSystemContextValue>;
export declare const LayerStackContext: import("react").Context<OverlayLayerStack | null>;
