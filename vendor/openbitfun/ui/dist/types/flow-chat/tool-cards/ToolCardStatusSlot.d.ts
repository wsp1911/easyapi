import type { FlowChatToolStatus } from "./FlowChatToolCard";
import { type ToolProcessingDotsSize } from "./ToolProcessingDots";
export interface ToolCardStatusSlotProps {
    className?: string;
    defaultIcon?: "status" | "tool";
    size?: ToolProcessingDotsSize;
    status: FlowChatToolStatus;
    toolIcon?: React.ReactNode;
}
export declare function hasVisibleToolCardStatusGlyph(status: FlowChatToolStatus): boolean;
export declare function ToolCardStatusSlot({ className, defaultIcon, size, status, toolIcon, }: ToolCardStatusSlotProps): import("react/jsx-runtime").JSX.Element | null;
