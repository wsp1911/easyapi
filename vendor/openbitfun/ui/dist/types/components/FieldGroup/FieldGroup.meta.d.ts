export declare const fieldGroupMeta: {
    readonly category: "form";
    readonly description: "Composes titled form sections, grouped field surfaces, and independently padded rows without coupling product settings semantics into the library.";
    readonly maturity: "stable";
    readonly name: "FieldGroup";
    readonly props: readonly [{
        readonly name: "FormSection.title";
        readonly type: "ReactNode";
    }, {
        readonly name: "FormSection.description";
        readonly type: "ReactNode";
    }, {
        readonly defaultValue: "stacked";
        readonly name: "FormSection.descriptionLayout";
        readonly type: "stacked | inline";
    }, {
        readonly name: "FormSection.leading";
        readonly type: "ReactNode";
    }, {
        readonly name: "FormSection.actions";
        readonly type: "ReactNode";
    }, {
        readonly defaultValue: "h2";
        readonly name: "FormSection.headingAs";
        readonly type: "h2 | h3 | h4";
    }, {
        readonly defaultValue: "subtle";
        readonly name: "appearance";
        readonly type: "subtle | plain";
    }, {
        readonly defaultValue: "default";
        readonly name: "fieldSurface";
        readonly type: "default | ambient";
    }, {
        readonly defaultValue: "true";
        readonly name: "dividers";
        readonly type: "boolean";
    }, {
        readonly defaultValue: "center";
        readonly name: "FieldRow.align";
        readonly type: "center | start";
    }, {
        readonly defaultValue: "md";
        readonly name: "FieldRow.padding";
        readonly type: "none | md";
    }];
    readonly states: readonly ["subtle", "plain", "divided"];
    readonly tokens: readonly ["color.field.groupBackground", "color.content.primary", "color.border.subtle", "color.field.background", "color.field.backgroundHover", "layout.formSection.gap", "layout.formSection.headerGap", "layout.formSection.titleDescriptionGap", "type.heading.section.fontSize", "type.body.sm.fontSize", "type.formDescription.lineHeight", "layout.fieldGroup.radius", "layout.fieldGroup.rowPaddingBlock", "layout.fieldGroup.rowPaddingInline"];
};
