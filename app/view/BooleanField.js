(function() {

  Ext.define("app.view.BooleanField", {
    extend: "app.view.FormField",
    updateValue: function(value, oldValue) {
      this.callParent(arguments);
      return this.cachedField.setChecked(value);
    },
    requires: ['Ext.field.Checkbox'],
    createField: function() {
      var field,
        _this = this;
      field = Ext.create('Ext.field.Checkbox', {
        name: this.getName(),
        label: null,
        labelWrap: false,
        labelAlign: "left"
      });
      field.on({
        check: function(field) {
          return _this.doChange(field);
        },
        uncheck: function(field) {
          return _this.doChange(field);
        }
      });
      return field;
    },
    doChange: function(field) {
      return this.setValue(field.isChecked());
    }
  });

}).call(this);
