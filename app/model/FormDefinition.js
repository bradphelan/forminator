(function() {

  Ext.define('app.model.FormDefinition', {
    extend: 'Ext.data.Model',
    requires: ['Ext.TitleBar', 'Ext.field.Select', 'Ext.form.FieldSet', 'app.model.form.Option', 'app.model.form.Radio', 'app.model.form.Select', 'app.model.form.Text', 'app.model.form.Field', 'app.model.form.Array', 'app.model.form.Boolean', 'app.model.form.Sketch', 'app.model.form.Range', 'app.model.Page', 'app.view.Page', 'app.view.FormPagesLister', 'Ext.Panel', 'Ext.form.Panel', 'Ext.field.Radio', 'Ext.Label', 'Ext.data.identifier.Uuid'],
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
      if (item.type === "array") {
        return 'app.model.form.Array';
      } else if (item.type === "sketch") {
        return 'app.model.form.Sketch';
      } else if (item.type === 'boolean') {
        return 'app.model.form.Boolean';
      } else if (item.options != null) {
        return 'app.model.form.Radio';
      } else if (item.range != null) {
        return 'app.model.form.Range';
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
          page.items = Ext.create('Ext.data.Store', {
            data: page.items.map(function(item) {
              return Ext.create(_this.itemTypeMap(item), item);
            })
          });
          return Ext.create('app.model.Page', page);
        })
      }));
      this.set('title', json.title);
      return this.set('summary', json.summary);
    },
    createModelField: function(item) {
      return {
        name: item.name,
        label: item.label,
        type: item.type != null ? item.type : 'string',
        defaultValue: item.defaultValue
      };
    },
    createModelFields: function() {
      var fields, item, page, _i, _j, _len, _len1, _ref, _ref1;
      fields = [];
      _ref = this.json.pages;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        page = _ref[_i];
        _ref1 = page.items;
        for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
          item = _ref1[_j];
          fields.push(this.createModelField(item));
        }
      }
      return fields;
    },
    createModelClassName: function() {
      return "app.model.FormDefinition.ImplicitModel-" + (this.getId());
    },
    getModelClass: function() {
      return Ext.getClass(this.createModelClassName());
    },
    createModelClass: function() {
      if (this.getModelClass() == null) {
        Ext.define(this.createModelClassName(), {
          extend: 'Ext.data.Model',
          config: {
            fields: this.createModelFields()
          },
          set: function(fieldName, newValue) {
            var oldValue, r;
            oldValue = this.get(fieldName);
            r = this.callParent([fieldName, newValue]);
            if (oldValue !== newValue) {
              this.fireEvent("change:" + fieldName, this, fieldName, newValue, oldValue);
              this.fireEvent("change", this);
            }
            return r;
          }
        });
      }
      return this.createModelClassName();
    },
    createForm: function() {
      var pagesUI, record;
      record = Ext.create(this.createModelClass());
      pagesUI = Ext.create('app.view.FormPagesLister', {
        title: this.get('title'),
        pages: this.get('pages'),
        record: record
      });
      pagesUI.setActiveItem(0);
      return pagesUI.setRecord(record);
    }
  });

}).call(this);
