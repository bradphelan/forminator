(function() {

  Ext.define('app.model.FormDefinition', {
    extend: 'Ext.data.Model',
    requires: ['Ext.TitleBar', 'Ext.field.Select', 'Ext.form.FieldSet'],
    config: {
      fields: [
        {
          name: 'pages',
          type: 'array'
        }
      ]
    },
    itemTypeMap: function(xtype) {
      switch (xtype) {
        case 'option':
          return 'app.model.form.Option';
        default:
          return raise("Argggh!");
      }
    },
    constructor: function(json) {
      var _this = this;
      this.callParent();
      if (json.constructor === String) json = Ext.JSON.decode(json, true);
      return this.set('pages', Ext.create('Ext.data.Store', {
        model: 'app.model.Page',
        data: json.pages.map(function(page) {
          var items;
          items = page.items.map(function(item) {
            return Ext.create(_this.itemTypeMap(item.xtype), item);
          });
          page.items = Ext.create('Ext.data.Store', {
            data: items
          });
          return Ext.create('app.model.Page', page);
        })
      }));
    },
    pagesCount: function() {
      return this.get('pages').getData().length;
    },
    createForm: function() {
      var pagesUI,
        _this = this;
      pagesUI = Ext.create('Ext.form.Panel', {
        padding: 0,
        layout: 'card',
        items: this.get('pages').getData().collect(function(page, index) {
          var panel;
          panel = Ext.create('Ext.Panel', {
            layout: 'vbox'
          });
          panel.add({
            xtype: 'titlebar',
            title: page.get('title'),
            items: [
              {
                iconCls: 'arrow_left',
                iconMask: true,
                align: 'left',
                listeners: {
                  tap: function() {
                    return pagesUI.setActiveItem(index - 1);
                  }
                }
              }, {
                iconCls: 'arrow_right',
                iconMask: true,
                align: 'right',
                listeners: {
                  tap: function() {
                    return pagesUI.setActiveItem(index + 1);
                  }
                }
              }
            ]
          });
          panel.add({
            xtype: 'fieldset',
            layout: 'vbox',
            items: page.get('items').getData().collect(function(item) {
              return item.createField();
            })
          });
          if (index === _this.pagesCount() - 1) {
            panel.add({
              xtype: 'titlebar',
              docked: 'bottom',
              title: 'You are done!',
              items: [
                {
                  iconCls: 'action',
                  iconMask: true,
                  align: 'right',
                  text: 'SUBMIT!',
                  listeners: {
                    tap: function() {
                      return console.log(pagesUI.getValues());
                    }
                  }
                }
              ]
            });
          }
          return panel;
        })
      });
      return pagesUI.setActiveItem(0);
    }
  });

}).call(this);
