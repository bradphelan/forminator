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
    constructor: function() {
      this.callParent(arguments);
      return this.set('options', this.options());
    },
    options: function() {
      var i;
      i = 0;
      return this.get('options').map(function(option) {
        option = (function() {
          if (typeof option !== "object") {
            return {
              text: "" + option,
              value: i
            };
          } else if ((option.text != null) && (option.value != null)) {
            return option;
          } else if (option.text != null) {
            return {
              text: option.text,
              value: i
            };
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
