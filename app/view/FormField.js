(function() {

  Ext.define("app.view.FormField", {
    extend: "Ext.Panel",
    config: {
      factory: null,
      record: null,
      name: null,
      value: null
    },
    initialize: function() {
      this.setName(this.getFactory().get('name'));
      this.getRecord().on("change:" + (this.getName()), this.doRecordChange, this);
      this.add({
        xtype: 'fieldset',
        items: [this.createField()],
        instructions: this.getFactory().createInstructions(),
        title: this.getFactory().createTitle()
      });
      this.setId(this.getFactory().idForComponent());
      return this.setValue(this.getRecord().get(this.getName()));
    },
    updateValue: function(value, oldValue) {
      return this.getRecord().set(this.getName(), value);
    },
    doRecordChange: function(obj, fieldName, newValue, oldValue) {
      return this.setValue(newValue);
    }
  });

}).call(this);
