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
    createRadioField: function() {
      var _this = this;
      console.log("foo");
      console.log(this.get('name'));
      return {
        xtype: 'panel',
        items: this.get('options').map(function(option) {
          return {
            xtype: 'radiofield',
            value: option.value,
            label: option.text,
            name: _this.get('name')
          };
        })
      };
    },
    createSelectField: function() {
      return {
        xtype: 'selectfield',
        name: this.get('name'),
        label: 'choose',
        options: this.get('options')
      };
    },
    createPickerField: function() {
      return {
        xtype: 'picker',
        name: this.get('name'),
        label: 'choose',
        options: this.get('options')
      };
    },
    createField: function() {
      switch (this.get('as')) {
        case 'radio':
          return this.createRadioField();
        case 'select':
          return this.createSelectField();
      }
    }
  });

}).call(this);
