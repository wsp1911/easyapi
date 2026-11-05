import type { VoiceCallLabels, VoiceCallPhase } from "./VoiceCallPanel";
export interface VoiceCallHeaderProps {
    title: string;
    labels: Pick<VoiceCallLabels, "back" | "close">;
    phase?: VoiceCallPhase;
    onBack: () => void;
    onClose: () => void;
}
/** Shared call navigation, including the original circular back action. */
export declare function VoiceCallHeader({ title, labels, phase, onBack, onClose }: VoiceCallHeaderProps): import("react/jsx-runtime").JSX.Element;
