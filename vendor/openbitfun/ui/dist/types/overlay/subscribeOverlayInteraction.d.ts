import type { RefObject } from "react";
import { type OverlayInteractionType } from "./OverlayCoordinator";
/** Custom keyboard/outside behavior shares the painted layer's event ownership. */
export declare function subscribeOverlayInteraction<K extends OverlayInteractionType>(surfaceRef: RefObject<HTMLElement | null>, type: K, listener: (event: DocumentEventMap[K]) => void): () => void;
