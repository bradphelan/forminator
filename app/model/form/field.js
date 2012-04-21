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
    createItems: function() {
      var items;
      items = [];
      items.push({
        xtype: 'fieldset',
        items: [this.createField()],
        instructions: this.get('help'),
        title: this.createTitle()
      });
      return items;
    },
    createComponent: function() {
      return {
        xtype: 'panel',
        items: this.createItems()
      };
    }
  });

}).call(this);
