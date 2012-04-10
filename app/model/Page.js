(function() {

  Ext.define('app.model.Page', {
    extend: 'Ext.data.Model',
    config: {
      fields: [
        {
          name: 'title',
          type: 'string'
        }, {
          name: 'items',
          type: 'array'
        }, {
          name: 'help',
          type: 'string'
        }
      ]
    }
  });

}).call(this);
