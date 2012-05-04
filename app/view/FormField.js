(function() {

  Ext.define("app.view.FormField", {
    extend: "Ext.Panel",
    config: {
      record: null,
      name: null,
      value: null,
      label: "",
      type: "string"
    },
    initialize: function() {
      this.getRecord().on("change:" + (this.getName()), this.doRecordChange, this);
      this.cachedField = this.createField();
      this.add({
        xtype: 'panel',
        padding: '0 0 10px 0',
        items: [
          {
            xtype: 'panel',
            html: this.getLabel()
          }, this.cachedField
        ]
      });
      this.noProp = true;
      this.setValue(this.getRecord().get(this.getName()));
      return this.noProp = false;
    },
    updateValue: function(value, oldValue) {
      if (!this.noProp) {
        this.noProp = true;
        this.getRecord().set(this.getName(), value);
        return this.noProp = false;
      }
    },
    doRecordChange: function(obj, fieldName, newValue, oldValue) {
      if (!this.noProp) {
        this.noProp = true;
        this.setValue(newValue);
        return this.noProp = false;
      }
    }
  });

}).call(this);
