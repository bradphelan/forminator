(function() {

  Ext.define('app.model.form.Field', {
    extend: 'Ext.data.Model',
    config: {
      fields: [
        {
          name: 'name',
          type: 'string'
        }, {
          name: 'type',
          type: 'string',
          defaultValue: 'string'
        }, {
          name: 'defaultValue',
          type: 'string',
          defaultValue: null
        }, {
          name: 'label',
          type: 'string',
          defaultValue: null
        }, {
          name: 'show_if',
          type: 'string',
          defaultValue: null
        }, {
          name: "labelWidth",
          type: "string",
          defaultValue: "30%"
        }, {
          name: "range",
          type: "object",
          defaultValue: null
        }
      ]
    },
    createLabel: function() {
      var l;
      l = this.get('label') != null ? this.get('label') : this.get('name');
      return Ext.String.capitalize(l.replace(/_/, ' '));
    },
    isVisible: function(record) {
      var visibleExpression, __record__;
      visibleExpression = this.get('show_if');
      if (visibleExpression != null) {
        __record__ = record;
        try {
          return eval(SkipLogic.parse(visibleExpression));
        } catch (error) {
          alert("Error processing skip logic\n\n  " + visibleExpression + "\n\nPlease check your form schema.");
          throw error;
        }
      } else {
        return true;
      }
    },
    isSet: function(record) {
      return record.get(this.get('name')) != null;
    },
    findComponent: function(context) {
      return context.down("[id=" + (this.idForComponent()) + "]");
    },
    idForComponent: function() {
      return "form-field-" + (this.get('name'));
    },
    createComponent: function(record) {
      var config;
      config = {
        label: this.createLabel(),
        record: record,
        name: this.get('name'),
        id: this.idForComponent()
      };
      config = Ext.merge(this.getData(), config);
      console.log(config);
      return Ext.create(this.getComponentClass(), config);
    }
  });

}).call(this);
