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
    createLabel: function() {
      var l;
      l = this.get('label') != null ? this.get('label') : this.get('name');
      return Ext.String.capitalize(l.replace(/_/, ' '));
    },
    createTitle: function() {
      return this.get('title');
    },
    createInstructions: function() {
      return this.get('help');
    },
    createItems: function() {
      var help, items, title;
      items = [];
      title = this.createTitle();
      help = this.createInstructions();
      items.push({
        xtype: 'fieldset',
        items: [this.createField()],
        instructions: help,
        title: title
      });
      return items;
    },
    idForComponent: function() {
      return "form-field-" + (this.get('name'));
    },
    findComponent: function(root) {
      return root.down("[id=" + (this.idForComponent()) + "]");
    },
    createComponent: function() {
      return {
        xtype: 'panel',
        items: this.createItems(),
        id: this.idForComponent()
      };
    },
    isVisible: function(record) {
      var visibleExpression, __record__;
      visibleExpression = this.get('show_if');
      if (visibleExpression != null) {
        __record__ = record;
        return eval(SkipLogic.parse(visibleExpression));
      } else {
        return true;
      }
    },
    isSet: function(record) {
      return record.get(this.get('name')) != null;
    }
  });

}).call(this);
