import type { HTMLAttributes, ReactNode } from "react";
import { type IconName } from "../../components/Icon/Icon";
import { type StatusPillTone } from "../../components/StatusPill";
import { type FlowChatToolStatus } from "./FlowChatToolCard";
import { type ToolCardField } from "./ToolCardDetails";
export interface SemanticToolCardAction {
    key: string;
    label: string;
    icon?: IconName;
    disabled?: boolean;
    /** Blocking decisions such as authorization stay visible and labelled. */
    intent?: "auxiliary" | "primary";
    onPress: () => void;
}
export interface SemanticToolCardRecord {
    key: string;
    title: ReactNode;
    leading?: ReactNode;
    description?: ReactNode;
    state?: ReactNode;
    fields?: readonly SemanticToolCardField[];
    actions?: readonly SemanticToolCardAction[];
}
export interface SemanticToolCardField extends ToolCardField {
    controls?: readonly SemanticToolCardAction[];
}
export interface SemanticToolCardSection {
    key: string;
    label: ReactNode;
    content: ReactNode;
    variant?: "code" | "prose";
}
/** Host adapters supply recorded facts and callbacks; the public view owns all anatomy. */
export interface SemanticToolCardProps extends Omit<HTMLAttributes<HTMLDivElement>, "title" | "onClick" | "children"> {
    action: ReactNode;
    summary?: ReactNode;
    resultSummary?: ReactNode;
    status: FlowChatToolStatus;
    statusDescription?: string;
    attention?: "ambient" | "prominent";
    outcome?: {
        label: ReactNode;
        tone: StatusPillTone;
    };
    fields?: readonly SemanticToolCardField[];
    sections?: readonly SemanticToolCardSection[];
    records?: readonly SemanticToolCardRecord[];
    recordsLabel?: ReactNode;
    ordered?: boolean;
    emptyContent?: ReactNode;
    notice?: ReactNode;
    error?: ReactNode;
    media?: ReactNode;
    connection?: {
        from: ReactNode;
        to: ReactNode;
    };
    actions?: readonly SemanticToolCardAction[];
    paramsText?: string;
    paramsLabel?: ReactNode;
    resultText?: string;
    resultLabel?: ReactNode;
    /** Details may be formatted lazily after the first expansion. */
    detailsAvailable?: boolean;
    isExpanded?: boolean;
    requiresConfirmation?: boolean;
    onToggle?: () => void;
    onDetailsChange?: () => void;
}
export declare function GoalToolCard(props: SemanticToolCardProps): import("react/jsx-runtime").JSX.Element;
export declare function AgentRosterToolCard({ deleting: _deleting, ...props }: SemanticToolCardProps & {
    deleting?: boolean;
}): import("react/jsx-runtime").JSX.Element;
export declare function SessionHistoryToolCard(props: SemanticToolCardProps): import("react/jsx-runtime").JSX.Element;
export declare function ImageAnalysisToolCard(props: SemanticToolCardProps): import("react/jsx-runtime").JSX.Element;
export declare function TimeToolCard(props: SemanticToolCardProps): import("react/jsx-runtime").JSX.Element;
export declare function McpResourceToolCard({ kind, ...props }: SemanticToolCardProps & {
    kind?: "resources" | "resource" | "prompts" | "prompt";
}): import("react/jsx-runtime").JSX.Element;
export declare function WorktreeToolCard(props: SemanticToolCardProps): import("react/jsx-runtime").JSX.Element;
export declare function PortForwardToolCard(props: SemanticToolCardProps): import("react/jsx-runtime").JSX.Element;
export declare function ReviewPlatformToolCard(props: SemanticToolCardProps): import("react/jsx-runtime").JSX.Element;
export declare function FrontendWorkbenchToolCard(props: SemanticToolCardProps): import("react/jsx-runtime").JSX.Element;
export declare function MiniAppFinalizeToolCard(props: SemanticToolCardProps): import("react/jsx-runtime").JSX.Element;
export declare function MarketplacePublishToolCard({ appearance, ...props }: SemanticToolCardProps & {
    appearance?: boolean;
}): import("react/jsx-runtime").JSX.Element;
export declare function PlaybookToolCard(props: SemanticToolCardProps): import("react/jsx-runtime").JSX.Element;
export declare function DesktopCardToolCard(props: SemanticToolCardProps): import("react/jsx-runtime").JSX.Element;
