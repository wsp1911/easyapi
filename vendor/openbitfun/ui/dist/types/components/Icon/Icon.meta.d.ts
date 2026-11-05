export declare const iconMeta: {
    readonly category: "primitive";
    readonly description: "Lucide icons with shared size, tone and accessibility, plus reviewed brand-derived mode, reasoning, thinking and Git artwork.";
    readonly maturity: "stable";
    readonly name: "Icon";
    readonly props: readonly [{
        readonly name: "name";
        readonly type: "IconName";
    }, {
        readonly name: "glyph";
        readonly type: "LucideIcon";
    }, {
        readonly defaultValue: "lg";
        readonly name: "size";
        readonly type: "2xs | xs | sm | md | lg";
    }, {
        readonly defaultValue: "inherit";
        readonly name: "tone";
        readonly type: "inherit | primary | secondary | muted | disabled | info | success | warning | danger";
    }, {
        readonly name: "label";
        readonly type: "string";
    }];
    readonly states: readonly ["default"];
    readonly tokens: readonly ["opacity.iconArtwork", "color.content.primary", "color.content.secondary", "color.content.muted", "color.content.disabled", "color.status.info.content", "color.status.success.content", "color.status.warning.content", "color.status.danger.content", "control.icon.size2xs", "control.icon.sizeXs", "control.icon.sizeSm", "control.icon.sizeMd", "control.icon.sizeLg"];
};
