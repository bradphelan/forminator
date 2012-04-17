(function() {

  Ext.define('app.model.form.Field', {
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
    createLabel: function() {
      var l;
      l = this.get('label') != null ? this.get('label') : this.get('name');
      return l = "<span style=\"white-space: normal !important\">\n  " + l + "\n</span>";
    },
    createField: function() {
      throw "Abstract class";
    }
  });

}).call(this);
