import type { HTMLAttributes, ReactNode } from "react";
import { type FlowChatToolStatus } from "./FlowChatToolCard";
import { type ToolCardStatusSlotProps } from "./ToolCardStatusSlot";
import type { ToolCardInteraction } from './ToolCardInteraction';
import { type AgentWaitTargets } from './AgentWaitTargetRail';
interface ActivityToolCardBaseProps extends Omit<HTMLAttributes<HTMLDivElement>, "children" | "onClick"> {
    action?: ReactNode;
    defaultIcon?: ToolCardStatusSlotProps["defaultIcon"];
    extra?: ReactNode;
    icon: ReactNode;
    interaction?: ToolCardInteraction;
    status: FlowChatToolStatus;
    statusDescription?: string;
    resultSummary?: ReactNode;
    details?: ReactNode;
    detailsTitle?: ReactNode;
    resultLabel?: string;
    summary?: ReactNode;
    summaryTitle?: string;
    toolCard: string;
}
export type ActivityToolCardProps = Omit<ActivityToolCardBaseProps, "icon" | "toolCard">;
export declare function AgentWaitToolCard({ agents, ...props }: ActivityToolCardProps & {
    agents?: AgentWaitTargets;
}): import("react/jsx-runtime").JSX.Element;
export declare function GetToolSpecToolCard(props: ActivityToolCardProps): import("react/jsx-runtime").JSX.Element;
export declare function SkillToolCard(props: ActivityToolCardProps): import("react/jsx-runtime").JSX.Element;
export declare function TerminalControlToolCard(props: ActivityToolCardProps): import("react/jsx-runtime").JSX.Element;
export {};
