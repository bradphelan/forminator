(function() {

  Ext.define("app.view.TextField", {
    extend: "app.view.FormField",
    updateSubValue: function(value) {
      var field;
      field = this.down('textfield');
      return field.setValue(value);
    },
    requires: ['Ext.form.DatePicker', 'Ext.form.Password', 'Ext.form.Email', 'Ext.form.Number', 'Ext.form.TextArea', 'Ext.form.Url'],
    mapXType: function() {
      switch (this.getFactory().get('type')) {
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
            label: this.getFactory().createLabel(),
            labelWrap: true
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