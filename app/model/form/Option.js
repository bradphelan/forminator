(function() {

  Ext.define('app.model.form.Option', {
    extend: 'app.model.form.Field',
    config: {
      fields: [
        {
          name: 'options',
          type: 'array'
        }
      ]
    },
    options: function() {
      return this.get('options').map(function(option) {
        if ((option.text != null) && (option.value != null)) {
          return option;
        } else {
          return {
            text: option,
            value: option
          };
        }
      });
    }
  });

}).call(this);
