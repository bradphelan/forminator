(function() {

  Ext.define('app.model.form.Option', {
    extend: 'Ext.data.Model',
    config: {
      fields: [
        {
          name: 'name',
          type: 'string'
        }, {
          name: 'label',
          type: 'string',
          defaultValue: null
        }, {
          name: 'options',
          type: 'array'
        }, {
          name: 'as',
          type: 'string'
        }
      ]
    },
    createLabel: function() {
      if (this.get('label') != null) {
        return this.get('label');
      } else {
        return this.get('name').replace(/_/, '<br/> ');
      }
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
    },
    createField: function() {
      throw "Abstract class";
    }
  });

}).call(this);
