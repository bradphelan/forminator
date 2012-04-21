(function() {
  var __slice = [].slice;

  Ext.define('app.model.form.Radio', {
    extend: 'app.model.form.Option',
    constructor: function() {
      var config;
      config = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      return this.callParent(config);
    },
    config: {
      fields: [
        {
          name: "labelWidth",
          type: "string",
          defaultValue: "80%"
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
      });
      return items;
    },
    createInstructions: function() {
      var i;
      i = this.callParent();
      if (i != null) {
        return i;
      } else {
        return "&nbsp;";
      }
    },
    createField: function() {
      return {
        xtype: 'panel',
        items: this.createRadios()
      };
    }
  });

}).call(this);
