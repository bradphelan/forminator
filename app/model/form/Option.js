(function() {

  Ext.define('app.model.form.Option', {
    extend: 'Ext.data.Model',
    config: {
      fields: [
        {
          name: 'name',
          type: 'string'
        }, {
          name: 'options',
          type: 'array'
        }, {
          name: 'as',
          type: 'string'
        }
      ]
    },
    createField: function() {
      throw "Abstract class";
    }
  });

}).call(this);
