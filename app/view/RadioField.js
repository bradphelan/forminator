(function() {

  Ext.define("app.view.RadioField", {
    extend: "app.view.FormField",
    config: {
      options: "array"
    },
    updateValue: function(value, oldValue) {
      var field, fields, _i, _len, _results;
      this.callParent(arguments);
      fields = this.query('radiofield');
      _results = [];
      for (_i = 0, _len = fields.length; _i < _len; _i++) {
        field = fields[_i];
        if (value === null) {
          _results.push(field.setChecked(false));
        } else if (field.getValue() === value) {
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
        value: "" + option.value,
        label: option.text,
        labelWidth: "90%",
        labelWrap: true,
        name: this.getName()
      };
    },
    createRadios: function() {
      var _this = this;
      return this.getOptions().map(function(option) {
        return _this.createRadio(option);
      });
    },
    createField: function() {
      var panel;
      panel = Ext.create("Ext.form.FieldSet", {
        items: this.createRadios()
      });
      panel.on({
        check: {
          fn: this.doChange,
          scope: this,
          delegate: "field"
        }
      });
      return panel;
    },
    doChange: function(checkBox, e) {
      console.log("cb " + (checkBox.getSubmitValue()));
      return this.setValue(checkBox.getSubmitValue());
    }
  });

}).call(this);
