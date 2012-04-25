(function() {

  Ext.define("app.view.RadioField", {
    extend: "app.view.FormField",
    updateValue: function(value, oldValue) {
      var field, fields, _i, _len, _results;
      this.callParent(arguments);
      fields = this.query('radiofield');
      _results = [];
      for (_i = 0, _len = fields.length; _i < _len; _i++) {
        field = fields[_i];
        if (field.getValue() === value) {
          _results.push(field.setChecked(true));
        } else {
          _results.push(void 0);
        }
      }
      return _results;
    },
    createRadio: function(option) {
      return {
        xtype: 'radiofield',
        labelWidth: this.getFactory().get('labelWidth'),
        value: option.value,
        label: Ext.String.capitalize(option.text),
        name: this.getName()
      };
    },
    createRadios: function() {
      var items,
        _this = this;
      return items = this.getFactory().options().map(function(option) {
        return {
          xtype: 'panel',
          items: [
            _this.createRadio(option), {
              xtype: 'label',
              html: option.help,
              cls: 'assist'
            }
          ]
        };
      });
    },
    createField: function() {
      var panel;
      panel = Ext.create("Ext.Panel", {
        items: this.createRadios()
      });
      panel.on({
        check: {
          fn: this.doChange,
          scope: this,
          delegate: "field"
        },
        uncheck: {
          fn: this.doChange,
          scope: this,
          delegate: "field"
        }
      });
      return panel;
    },
    doChange: function(checkBox, e) {
      return this.setValue(checkBox.getValue());
    }
  });

}).call(this);
