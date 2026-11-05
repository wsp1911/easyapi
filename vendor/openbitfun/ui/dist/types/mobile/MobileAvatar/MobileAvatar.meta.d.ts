export declare const mobileAvatarMeta: {
    readonly category: "mobile";
    readonly description: "A touch-scale identity mark that carries character artwork, an image, initials, or a status dot.";
    readonly maturity: "stable";
    readonly name: "MobileAvatar";
    readonly props: readonly [{
        readonly name: "src";
        readonly type: "string";
    }, {
        readonly name: "alt";
        readonly type: "string";
    }, {
        readonly name: "name";
        readonly type: "string";
    }, {
        readonly name: "children";
        readonly type: "ReactNode";
    }, {
        readonly defaultValue: "md";
        readonly name: "size";
        readonly type: "\"xs\" | \"sm\" | \"md\" | \"lg\"";
    }, {
        readonly defaultValue: "circle";
        readonly name: "shape";
        readonly type: "\"circle\" | \"rounded\"";
    }, {
        readonly name: "status";
        readonly type: "\"online\" | \"away\" | \"busy\" | \"offline\"";
    }, {
        readonly name: "statusLabel";
        readonly type: "string";
    }];
    readonly states: readonly ["image", "artwork", "initials", "online", "away", "busy", "offline"];
    readonly tokens: readonly ["color.action.neutral.surface", "color.content.disabled", "color.content.muted", "color.content.secondary", "color.status.danger.emphasis", "color.status.success.emphasis", "color.status.warning.emphasis", "color.surface.canvas", "control.height.lg", "control.height.sm", "radius.base", "radius.pill", "space.6", "type.label.selected.fontSize", "type.label.selected.fontWeight"];
};
