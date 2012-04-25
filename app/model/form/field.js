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
          name: 'title',
          type: 'string',
          defaultValue: null
        }, {
          name: 'help',
          type: 'string',
          defaultValue: null
        }, {
          name: "labelWidth",
          type: "string",
          defaultValue: "30%"
        }
      ]
    },
    idForComponent: function() {
      return "form-field-" + (this.get('name'));
    },
    createTitle: function() {
      return this.get('title');
    },
    createLabel: function() {
      var l;
      l = this.get('label') != null ? this.get('label') : this.get('name');
      return Ext.String.capitalize(l.replace(/_/, ' '));
    },
    createInstructions: function() {
      return this.get('help');
    },
    isVisible: function(record) {
      var visibleExpression, __record__;
      visibleExpression = this.get('show_if');
      if (visibleExpression != null) {
        __record__ = record;
        try {
          return eval(SkipLogic.parse(visibleExpression));
        } catch (error) {
          return alert("Error processing skip logic\n\n  " + visibleExpression + "\n\nPlease check your form schema.");
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
    createComponent: function(record) {
      return Ext.create(this.getComponentClass(), {
        factory: this,
        record: record
      });
    }
  });

}).call(this);
