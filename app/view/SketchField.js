(function() {

  Ext.define("app.view.SketchFieldImpl", {
    extend: "Ext.field.Field",
    xtype: "sketchfield",
    config: {
      component: {
        xtype: "sketch",
        minHeight: 600,
        useToolbar: false
      }
    },
    initialize: function() {
      this.callParent();
      return this.getComponent().on({
        change: {
          scope: this,
          fn: this.onSketchChange
        }
      });
    },
    onSketchChange: function(sketchData) {
      this.setValue(sketchData);
      return this.fireEvent("change");
    },
    getValues: function() {
      return this.getComponent().pngData();
    },
    getValue: function() {
      return this.getValues();
    }
  });

  Ext.define("app.view.SketchField", {
    extend: "app.view.FormField",
    createField: function() {
      this.panel = Ext.create("app.view.SketchFieldImpl", {
        name: this.getName(),
        label: this.getFactory().createLabel(),
        labelWrap: true
      });
      this.panel.on("change", this.doChange, this);
      return this.panel;
    },
    doChange: function() {
      return this.setValue(this.panel.getValue());
    },
    updateValue: function(value, oldValue) {
      this.callParent(arguments);
      return console.log("warning: cannot update image sketches yet!");
    }
  });

}).call(this);
