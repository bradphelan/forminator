(function() {

  Ext.define('app.model.FormDefinition', {
    extend: 'Ext.data.Model',
    requires: ['Ext.TitleBar', 'Ext.field.Select', 'Ext.form.FieldSet', 'app.model.form.Option', 'app.model.form.Radio', 'app.model.form.Select', 'app.model.form.Text', 'app.model.form.Field', 'app.model.Page', 'app.view.Page', 'app.view.Form', 'Ext.Panel', 'Ext.form.Panel', 'Ext.field.Radio', 'Ext.Label', 'Ext.data.identifier.Uuid'],
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
        return 'app.model.form.Radio';
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
      var pagesUI, record;
      record = Ext.create(this.createModelClass());
      pagesUI = Ext.create('app.view.Form', {
        title: this.get('title'),
        pages: this.get('pages'),
        record: record
      });
      pagesUI.setActiveItem(0);
      return pagesUI.setRecord(record);
    }
  });

}).call(this);
