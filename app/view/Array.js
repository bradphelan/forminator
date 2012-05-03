(function() {

  Ext.define("app.view.Array", {
    extend: "app.view.FormField",
    config: {
      fields: [],
      width: "100%",
      count: 0,
      min: 1,
      max: 1
    },
    itemTypeMap: function(item) {
      switch (item.type) {
        case 'password':
          return 'passwordfield';
        case 'email':
          return 'emailfield';
        case 'date':
          return 'datepickerfield';
        case 'url':
          return 'urlfield';
        case 'integer':
        case 'int':
          return 'numberfield';
        case 'float':
          return 'numberfield';
        case 'boolean':
          return 'checkboxfield';
        default:
          return 'textfield';
      }
    },
    flexTypeMap: function(item) {
      return item.flex || 1;
    },
    indexOfRow: function(row) {
      return this.panel.items.indexOf(row) - 1;
    },
    deleteRow: function(row) {
      var index, v, _ref;
      index = this.indexOfRow(row);
      v = this.getArray();
      [].splice.apply(v, [index, index - index + 1].concat(_ref = [])), _ref;
      this.panel.remove(row);
      if (v.length === 0) {
        return this.createRow();
      }
    },
    getArray: function() {
      var v;
      v = this.getRecord().get(this.getName());
      if (v == null) {
        v = [];
        this.getRecord().set(this.getName(), v);
      }
      return v;
    },
    doChange: function(row, field, newValue, oldValue) {
      var index, v;
      index = this.indexOfRow(row);
      v = this.getArray();
      (v[index] || (v[index] = {}))[field.name] = newValue;
      if (this.rowCount === v.length && this.rowCount < this.getMax()) {
        return this.createRow();
      }
    },
    defaultValueMap: function(f) {
      if (f.defaultValue) {
        return f.defaultValue;
      } else {
        switch (f.type) {
          case 'boolean':
            return false;
          case 'int':
          case 'integer':
          case 'float':
            return 0;
          default:
            return "";
        }
      }
    },
    createRow: function() {
      var data, i, row,
        _this = this;
      row = Ext.create('Ext.Panel', {
        layout: 'hbox'
      });
      i = this.rowCount;
      this.rowCount++;
      data = {};
      this.getArray().push(data);
      this.panel.add(row);
      this.getFields().map(function(f) {
        data[f.name] = f.defaultValue || null;
        return row.add({
          xtype: _this.itemTypeMap(f),
          label: null,
          margin: 1,
          value: _this.defaultValueMap(f),
          flex: _this.flexTypeMap(f),
          listeners: {
            change: function(field, newValue, oldValue, e) {
              return _this.doChange(row, f, newValue, oldValue);
            },
            check: function(field, e) {
              return _this.doChange(row, f, true, false);
            },
            uncheck: function(field, e) {
              return _this.doChange(row, f, false, true);
            }
          }
        });
      });
      return row.add({
        xtype: 'button',
        iconCls: 'delete',
        docked: "right",
        iconMask: true,
        listeners: {
          tap: function(button, e) {
            return _this.deleteRow(row);
          }
        }
      });
    },
    createField: function() {
      var header, i, _i, _ref,
        _this = this;
      this.panel = Ext.create('Ext.Panel');
      header = Ext.create('Ext.Panel', {
        layout: 'hbox'
      });
      this.panel.add(header);
      this.rowCount = 0;
      this.getFields().map(function(f) {
        return header.add({
          xtype: 'label',
          html: f.label || f.name,
          cls: 'x-table-title',
          flex: _this.flexTypeMap(f),
          align: "left"
        });
      });
      header.add({
        xtype: 'button',
        iconCls: 'delete',
        docked: "right",
        iconMask: true,
        disabled: true
      });
      for (i = _i = 0, _ref = this.getMin() - 1; 0 <= _ref ? _i <= _ref : _i >= _ref; i = 0 <= _ref ? ++_i : --_i) {
        this.createRow();
      }
      return this.panel;
    }
  });

}).call(this);
