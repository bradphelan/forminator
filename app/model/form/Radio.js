(function() {
  var __slice = [].slice;

  Ext.define('app.model.form.Radio', {
    extend: 'app.model.form.Option',
    constructor: function() {
      var config;
      config = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      console.log(config);
      return this.callParent(config);
    },
    config: {
      fields: [
        {
          name: "labelWidth",
          type: "string",
          defaultValue: "90%"
        }
      ]
    },
    createTitle: function() {
      if (this.get('title') != null) {
        return this.get('title');
      } else {
        return this.createLabel();
      }
    },
    createRadios: function() {
      var items,
        _this = this;
      items = this.options().map(function(option) {
        var component;
        component = {
          xtype: 'radiofield',
          labelWidth: _this.get('labelWidth'),
          value: option.value,
          label: Ext.String.capitalize(option.text),
          name: _this.get('name')
        };
        if (option.help != null) {
          return {
            xtype: 'panel',
            items: [
              component, {
                xtype: 'label',
                html: option.help,
                cls: 'assist'
              }
            ]
          };
        } else {
          return component;
        }
      });
      return items;
    },
    createField: function() {
      return {
        xtype: 'panel',
        items: this.createRadios()
      };
    }
  });

}).call(this);
