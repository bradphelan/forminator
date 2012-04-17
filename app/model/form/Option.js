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
    options: function() {
      return this.get('options').map(function(option) {
        if ((option.name != null) && (option.value != null)) {
          return option;
        } else {
          return {
            text: option,
            value: option
          };
        }
      });
    },
    createField: function() {
      throw "Abstract class";
    }
  });

}).call(this);
