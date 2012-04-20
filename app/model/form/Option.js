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
      var i;
      i = 0;
      return this.get('options').map(function(option) {
        option = (function() {
          if ((option.text != null) && (option.value != null)) {
            return option;
          } else if (option.constructor === String) {
            return {
              text: option,
              value: i
            };
          } else if (!(option.value != null)) {
            option.value = i;
            return option;
          } else {
            throw "Arggh";
          }
        })();
        i += 1;
        return option;
      });
    }
  });

}).call(this);
