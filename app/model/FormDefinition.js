(function() {

  Ext.define('app.model.FormDefinition', {
    extend: 'Ext.data.Model',
    requires: ['Ext.TitleBar', 'Ext.field.Select', 'Ext.form.FieldSet', 'app.model.form.Option', 'app.model.Page', 'Ext.Panel', 'Ext.form.Panel', 'Ext.field.Radio', 'Ext.Label', 'Ext.data.identifier.Uuid'],
    config: {
      identifier: 'uuid',
      fields: [
        {
          name: 'pages',
          type: 'fields'
        }, {
          name: 'title',
          type: 'string'
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
      this.json = json;
      this.callParent();
      if (json.constructor === String) this.json = Ext.JSON.decode(json, true);
      json = Ext.clone(this.json);
      this.set('pages', Ext.create('Ext.data.Store', {
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
      return this.set('title', json.title);
    },
    pagesCount: function() {
      return this.get('pages').getData().length;
    },
    createModelClass: function() {
      var class_name, fields, item, page, _i, _j, _len, _len2, _ref, _ref2;
      fields = [];
      _ref = this.json.pages;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        page = _ref[_i];
        _ref2 = page.items;
        for (_j = 0, _len2 = _ref2.length; _j < _len2; _j++) {
          item = _ref2[_j];
          fields.push({
            name: item.name,
            type: item.type != null ? item.type : 'string'
          });
        }
      }
      class_name = "app.model.FormDefinition.ImplicitModel-" + (this.getId());
      if (Ext.getClass(class_name) == null) {
        Ext.define(class_name, {
          extend: 'Ext.data.Model',
          config: {
            fields: fields
          }
        });
      }
      return class_name;
    },
    createForm: function() {
      var pagesUI, record,
        _this = this;
      record = Ext.create(this.createModelClass());
      pagesUI = Ext.create('Ext.form.Panel', {
        padding: 0,
        title: this.get('title'),
        layout: 'card',
        listeners: {
          'change': {
            'delegate': 'field',
            fn: function(field) {
              console.log("Updating " + (field.getName()));
              return record.set(field.getName(), field.getValue());
            }
          },
          'check': {
            'delegate': 'field',
            fn: function(field) {
              console.log("Updating " + (field.getName()));
              return record.set(field.getName(), field.getValue());
            }
          },
          'uncheck': {
            'delegate': 'field',
            fn: function(field) {
              console.log("Updating " + (field.getName()));
              return record.set(field.getName(), field.getValue());
            }
          },
          'initialize': function() {
            console.log("initialized");
            return _this;
          }
        },
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
            xtype: 'label',
            html: page.get('help'),
            padding: 20
          });
          panel.add({
            xtype: 'fieldset',
            layout: 'vbox',
            centered: true,
            width: "75%",
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
                      console.log(pagesUI.getRecord());
                      console.log(pagesUI.getRecord().getData(true));
                      console.log(pagesUI.getValues());
                      return app.view.MainNavigation.pop();
                    }
                  }
                }
              ]
            });
          }
          return panel;
        })
      });
      pagesUI.setActiveItem(0);
      return pagesUI.setRecord(record);
    }
  });

}).call(this);
