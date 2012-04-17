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
        }, {
          name: 'label',
          type: 'string',
          defaultValue: null
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
    createLabel: function() {
      if (this.get('label') != null) {
        return this.get('label');
      } else {
        return this.get('name').replace(/_/, '<br/> ');
      }
    },
    createField: function() {
      return {
        xtype: this.mapXType(),
        name: this.get('name'),
        label: this.createLabel() + " <i>(" + this.get('type') + ")</i>",
        labelWrap: true
      };
    }
  });

}).call(this);
