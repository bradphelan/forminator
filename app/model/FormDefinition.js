(function() {

  Ext.define('app.model.FormDefinition', {
    extend: 'Ext.data.Model',
    requires: ['Ext.TitleBar', 'Ext.field.Select', 'Ext.form.FieldSet', 'app.model.form.Option', 'app.model.form.Radio', 'app.model.form.Select', 'app.model.form.Text', 'app.model.form.Field', 'app.model.Page', 'Ext.Panel', 'Ext.form.Panel', 'Ext.field.Radio', 'Ext.Label', 'Ext.data.identifier.Uuid'],
    config: {
      identifier: 'uuid',
      fields: [
        {
          name: 'pages',
          type: 'fields'
        }, {
          name: 'title',
          type: 'string'
        }, {
          name: 'summary',
          type: 'string'
        }
      ]
    },
    itemTypeMap: function(item) {
      if (item.options != null) {
        if (item.options.length > 6) {
          return 'app.model.form.Select';
        } else {
          return 'app.model.form.Radio';
        }
      } else {
        return 'app.model.form.Text';
      }
    },
    constructor: function(json) {
      var _this = this;
      this.json = json;
      this.callParent();
      if (json.constructor === String) {
        this.json = Ext.JSON.decode(json, true);
      }
      json = Ext.clone(this.json);
      this.set('pages', Ext.create('Ext.data.Store', {
        model: 'app.model.Page',
        data: json.pages.map(function(page) {
          var items;
          items = page.items.map(function(item) {
            return Ext.create(_this.itemTypeMap(item), item);
          });
          page.items = Ext.create('Ext.data.Store', {
            data: items
          });
          return Ext.create('app.model.Page', page);
        })
      }));
      this.set('title', json.title);
      return this.set('summary', json.summary);
    },
    pagesCount: function() {
      return this.get('pages').getData().length;
    },
    createModelClass: function() {
      var class_name, fields, item, page, _i, _j, _len, _len1, _ref, _ref1;
      fields = [];
      _ref = this.json.pages;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        page = _ref[_i];
        _ref1 = page.items;
        for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
          item = _ref1[_j];
          fields.push({
            name: item.name,
            label: item.label,
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
              return record.set(field.getName(), field.getValue());
            }
          },
          'check': {
            'delegate': 'field',
            fn: function(field) {
              return record.set(field.getName(), field.getValue());
            }
          },
          'uncheck': {
            'delegate': 'field',
            fn: function(field) {
              return record.set(field.getName(), field.getValue());
            }
          },
          'initialize': function() {
            return _this;
          }
        },
        items: this.get('pages').getData().collect(function(page, index) {
          var fieldSetContext, fieldsets, newFieldSet, panel;
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
          fieldsets = [];
          newFieldSet = function() {
            fieldsets.push({
              xtype: 'fieldset',
              layout: 'vbox',
              items: []
            });
            return fieldsets;
          };
          fieldSetContext = function(item, fn) {
            var closeFieldSet;
            closeFieldSet = false;
            if (item.asFieldSet != null) {
              newFieldSet();
              closeFieldSet = true;
            } else if (fieldsets.length === 0) {
              newFieldSet();
            }
            fn(fieldsets[fieldsets.length - 1].items);
            if (item.asFieldSet != null) {
              return newFieldSet();
            }
          };
          page.get('items').getData().each(function(item) {
            return fieldSetContext(item, function(items) {
              return items.push(item.createComponent());
            });
          });
          panel.add({
            xtype: 'panel',
            layout: 'vbox',
            items: fieldsets
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
                  bubbleEvents: 'submitForm',
                  align: 'right',
                  text: 'SUBMIT!',
                  listeners: {
                    tap: function(me) {
                      return me.fireEvent('submitForm', record);
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
