(function() {

  Ext.define("app.view.TextField", {
    extend: "app.view.FormField",
    updateValue: function(value, oldValue) {
      var field;
      this.callParent(arguments);
      field = this.down('textfield');
      return field.setValue(value);
    },
    requires: ['Ext.field.DatePicker', 'Ext.field.Password', 'Ext.field.Email', 'Ext.field.Number', 'Ext.field.TextArea', 'Ext.field.Url'],
    mapXType: function() {
      switch (this.getType()) {
        case 'password':
          return 'passwordfield';
        case 'email':
          return 'emailfield';
        case 'date':
          return 'datepickerfield';
        case 'url':
          return 'urlfield';
        case 'integer':
        case 'int':
          return 'numberfield';
        case 'float':
          return 'numberfield';
        default:
          return 'textfield';
      }
    },
    createField: function() {
      var panel;
      panel = Ext.create("Ext.Panel", {
        items: [
          {
            xtype: this.mapXType(),
            name: this.getName(),
            label: null,
            labelWrap: true,
            labelAlign: 'top'
          }
        ]
      });
      panel.on({
        change: {
          fn: this.doChange,
          scope: this,
          delegate: this.mapXType()
        }
      });
      return panel;
    },
    doChange: function(field, e) {
      return this.setValue(field.getValue());
    }
  });

}).call(this);
