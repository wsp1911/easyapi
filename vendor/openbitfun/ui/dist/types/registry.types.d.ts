export type ComponentMaturity = "experimental" | "beta" | "stable" | "deprecated";
export type ComponentPlatform = "web" | "mobile" | "tablet" | "desktop" | "watch";
export interface ComponentPropMeta {
    defaultValue?: string;
    name: string;
    type: string;
}
export interface ComponentMeta {
    category: "primitive" | "action" | "form" | "feedback" | "navigation" | "flow-chat" | "mobile" | "brand";
    description: string;
    maturity: ComponentMaturity;
    name: string;
    platforms?: readonly ComponentPlatform[];
    props: readonly ComponentPropMeta[];
    states: readonly string[];
    tokens: readonly string[];
}
