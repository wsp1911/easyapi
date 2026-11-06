export declare const mobileCardMeta: {
    readonly category: "mobile";
    readonly description: "A responsive mobile content surface with optional elevation and density.";
    readonly maturity: "stable";
    readonly name: "MobileCard";
    readonly props: readonly [{
        readonly defaultValue: "surface";
        readonly name: "appearance";
        readonly type: "\"plain\" | \"surface\" | \"elevated\"";
    }, {
        readonly defaultValue: "md";
        readonly name: "padding";
        readonly type: "\"none\" | \"sm\" | \"md\" | \"lg\"";
    }];
    readonly states: readonly ["plain", "surface", "elevated"];
    readonly tokens: readonly ["color.border.subtle", "color.surface.panel", "color.surface.raised", "radius.xl", "shadow.base", "space.4"];
};
