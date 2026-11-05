import { type HTMLAttributes } from "react";
import { type LucideIcon } from "lucide-react";
export declare const iconNames: readonly ["arrow-down", "unselected", "chevron-left", "selected", "delete", "waitlist-message", "creative", "ultimate", "standard", "minimal", "reasoning-auto", "arrow-left", "arrow-right", "arrow-up", "arrow-up-right", "battery-full", "bell", "book-open", "book-search", "browser", "calendar-clock", "check-circle", "check-fill", "check-line", "chevron-down", "chevron-right", "chevron-up", "circle", "circle-arrow-right", "clock", "code", "command-mac", "commit", "device-mac", "download", "duplicate", "edit", "extension", "eye", "file-search-corner", "file-text", "file-up", "file-x-2", "files", "filter", "floating-window", "folder", "folder-open", "folder-search", "galaxy", "gear", "git", "git-pull-request", "history", "hourglass", "image", "info", "layers", "layers-plus", "level", "link", "list-todo", "message-circle-question", "message-square", "mic", "mini-app", "more", "mouse-pointer", "palette", "panels-top-left", "pin", "plus", "plug", "progress-25", "refresh", "route", "search", "scan-eye", "session", "settings", "show-session", "side-chat", "sidebar-left", "sidebar-right", "spark", "split", "square-terminal", "star", "store", "terminal", "target", "text-search", "thinking", "turn", "upload", "user", "users", "wrench", "workflow", "xmark"];
/** Legacy names remain renderable; new previews use the canonical catalog. */
export declare const iconAliases: {
    readonly download: "arrow-down";
    readonly circle: "unselected";
};
export declare const canonicalIconNames: ("search" | "split" | "link" | "circle" | "code" | "filter" | "image" | "target" | "terminal" | "standard" | "user" | "arrow-down" | "unselected" | "chevron-left" | "selected" | "delete" | "waitlist-message" | "creative" | "ultimate" | "minimal" | "reasoning-auto" | "arrow-left" | "arrow-right" | "arrow-up" | "arrow-up-right" | "battery-full" | "bell" | "book-open" | "book-search" | "browser" | "calendar-clock" | "check-circle" | "check-fill" | "check-line" | "chevron-down" | "chevron-right" | "chevron-up" | "circle-arrow-right" | "clock" | "command-mac" | "commit" | "device-mac" | "download" | "duplicate" | "edit" | "extension" | "eye" | "file-search-corner" | "file-text" | "file-up" | "file-x-2" | "files" | "floating-window" | "folder" | "folder-open" | "folder-search" | "galaxy" | "gear" | "git" | "git-pull-request" | "history" | "hourglass" | "info" | "layers" | "layers-plus" | "level" | "list-todo" | "message-circle-question" | "message-square" | "mic" | "mini-app" | "more" | "mouse-pointer" | "palette" | "panels-top-left" | "pin" | "plus" | "plug" | "progress-25" | "refresh" | "route" | "scan-eye" | "session" | "settings" | "show-session" | "side-chat" | "sidebar-left" | "sidebar-right" | "spark" | "square-terminal" | "star" | "store" | "text-search" | "thinking" | "turn" | "upload" | "users" | "wrench" | "workflow" | "xmark")[];
export type IconName = (typeof iconNames)[number];
export type IconSize = "2xs" | "xs" | "sm" | "md" | "lg";
export type IconTone = "inherit" | "primary" | "secondary" | "muted" | "disabled" | "info" | "success" | "warning" | "danger";
export type IconSource = {
    glyph: LucideIcon;
    name?: never;
} | {
    glyph?: never;
    name: IconName;
};
interface IconBaseProps extends Omit<HTMLAttributes<HTMLSpanElement>, "aria-label" | "children"> {
    label?: string;
    size?: IconSize;
    tone?: IconTone;
}
export type IconProps = IconBaseProps & IconSource;
export declare const Icon: import("react").ForwardRefExoticComponent<IconProps & import("react").RefAttributes<HTMLSpanElement>>;
export {};
