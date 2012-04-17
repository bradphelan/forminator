(function() {

  Ext.define('app.model.form.Text', {
    extend: 'Ext.data.Model',
    config: {
      fields: [
        {
          name: 'name',
          type: 'string'
        }, {
          name: 'type',
          type: 'string',
          defaultValue: 'string'
        }
      ]
    },
    requires: ['Ext.form.DatePicker', 'Ext.form.Password', 'Ext.form.Email', 'Ext.form.Number', 'Ext.form.TextArea', 'Ext.form.Url'],
    mapXType: function() {
      switch (this.get('type')) {
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
      return {
        xtype: this.mapXType(),
        name: this.get('name'),
        label: this.get('name') + " <i>(" + this.get('type') + ")</i>"
      };
    }
  });

}).call(this);
