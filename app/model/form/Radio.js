(function() {
  var __slice = [].slice;

  Ext.define('app.model.form.Radio', {
    extend: 'app.model.form.Option',
    asFieldSet: true,
    createItems: function() {
      var items, label, text,
        _this = this;
      items = this.options().map(function(option) {
        var component;
        component = {
          xtype: 'radiofield',
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
      if (this.get('help') != null) {
        text = this.get('help');
      } else {
        text = this.createLabel();
      }
      label = {
        xtype: 'label',
        cls: "assist-radio",
        html: text
      };
      return items = [label].concat(__slice.call(items));
    },
    createField: function() {
      return {
        xtype: 'panel',
        items: this.createItems()
      };
    }
  });

}).call(this);
