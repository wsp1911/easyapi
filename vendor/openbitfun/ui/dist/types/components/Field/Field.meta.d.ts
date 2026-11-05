export declare const fieldMeta: {
    readonly category: "form";
    readonly description: "Associates label content, optional actions, description, and adjacent controls with one primary form control.";
    readonly maturity: "stable";
    readonly name: "Field";
    readonly props: readonly [{
        readonly name: "label";
        readonly type: "ReactNode";
    }, {
        readonly name: "description";
        readonly type: "ReactNode";
    }, {
        readonly name: "error";
        readonly type: "ReactNode";
    }, {
        readonly name: "labelAction";
        readonly type: "ReactNode";
    }, {
        readonly name: "controlLeading";
        readonly type: "ReactNode";
    }, {
        readonly name: "controlTrailing";
        readonly type: "ReactNode";
    }, {
        readonly defaultValue: "auto";
        readonly name: "controlWidth";
        readonly type: "auto | fill";
    }, {
        readonly defaultValue: "auto";
        readonly name: "labelWidth";
        readonly type: "auto | sm | md | lg";
    }, {
        readonly defaultValue: "md";
        readonly name: "horizontalGap";
        readonly type: "md | lg";
    }, {
        readonly defaultValue: "false";
        readonly name: "required";
        readonly type: "boolean";
    }, {
        readonly defaultValue: "vertical";
        readonly name: "orientation";
        readonly type: "horizontal | vertical";
    }, {
        readonly name: "children";
        readonly type: "ReactElement";
    }];
    readonly states: readonly ["default", "invalid"];
    readonly tokens: readonly ["color.content.requiredIndicator", "color.content.primary", "color.content.secondary", "color.status.danger.content", "layout.field.rootGap", "layout.field.horizontalGap", "layout.field.horizontalGapWide", "layout.field.labelWidthSm", "layout.field.labelWidthMd", "layout.field.labelWidthLg", "layout.field.contentGap", "layout.field.labelGap", "layout.field.labelActionGap", "layout.field.controlGap", "type.label.selected.fontSize", "type.meta.fontSize", "type.fieldHelper.lineHeight", "type.support.fontSize"];
};
