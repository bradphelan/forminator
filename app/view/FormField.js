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
      this.add({
        xtype: 'panel',
        padding: '0 0 10px 0',
        items: [
          {
            xtype: 'panel',
            html: this.getLabel()
          }, this.createField()
        ]
      });
      this.noProp = true;
      this.setValue(this.getRecord().get(this.getName()));
      return this.noProp = false;
    },
    updateValue: function(value, oldValue) {
      if (!this.noProp) {
        return this.getRecord().set(this.getName(), value);
      }
    },
    doRecordChange: function(obj, fieldName, newValue, oldValue) {
      return this.setValue(newValue);
    }
  });

}).call(this);
