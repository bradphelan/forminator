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
          name: 'help',
          type: 'string',
          defaultValue: null
        }
      ]
    },
    createLabel: function() {
      var l;
      l = this.get('label') != null ? this.get('label') : this.get('name');
      return Ext.String.capitalize(l.replace(/_/, ' '));
    },
    createItems: function() {
      var items;
      items = [];
      items.push(this.createField());
      if (this.get('help') != null) {
        items.push({
          xtype: 'label',
          html: this.get('help'),
          cls: 'assist'
        });
      }
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
