import type { HTMLAttributes, ReactNode } from "react";
import { type FlowChatToolStatus } from "./FlowChatToolCard";
export interface SearchToolCardDetail {
    label: ReactNode;
    value: ReactNode;
}
export interface SearchToolCardResult {
    description?: ReactNode;
    icon?: "directory" | "file" | "link";
    key: string;
    meta?: ReactNode;
    onOpen?: () => void;
    title: ReactNode;
    url?: string;
}
export interface GrepSearchResultLine {
    gapBefore?: boolean;
    kind: "match" | "context";
    lineNumber: number;
    text: string;
}
export type GrepSearchResultBlock = {
    kind: "file";
    path: string;
    lines: readonly GrepSearchResultLine[];
} | {
    kind: "text";
    text: string;
};
interface SearchResultsToolCardBaseProps extends Omit<HTMLAttributes<HTMLDivElement>, "children" | "onClick" | "results"> {
    action?: ReactNode;
    details?: readonly SearchToolCardDetail[];
    icon: ReactNode;
    isExpanded?: boolean;
    moreResultsLabel?: ReactNode;
    onToggle?: () => void;
    resultContent?: ReactNode;
    resultText?: string;
    results?: readonly SearchToolCardResult[];
    status: FlowChatToolStatus;
    statusDescription?: string;
    resultSummary?: ReactNode;
    summary: ReactNode;
    toolCard: string;
}
export type SearchResultsToolCardProps = Omit<SearchResultsToolCardBaseProps, "icon" | "toolCard" | "resultContent">;
export interface GrepSearchToolCardProps extends SearchResultsToolCardProps {
    /** Structured content takes precedence over the legacy resultText preview. */
    resultBlocks?: readonly GrepSearchResultBlock[];
}
export declare function GrepSearchToolCard({ resultBlocks, ...props }: GrepSearchToolCardProps): import("react/jsx-runtime").JSX.Element;
export declare function GlobSearchToolCard(props: SearchResultsToolCardProps): import("react/jsx-runtime").JSX.Element;
export declare function DirectoryListToolCard(props: SearchResultsToolCardProps): import("react/jsx-runtime").JSX.Element;
export declare function WebSearchToolCard(props: SearchResultsToolCardProps): import("react/jsx-runtime").JSX.Element;
export {};
