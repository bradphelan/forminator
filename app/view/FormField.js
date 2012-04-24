(function() {

  Ext.define("app.view.FormField", {
    extend: "Ext.Panel",
    config: {
      factory: null,
      record: null,
      name: null,
      value: null,
      cls: 'x-auto-form-field'
    },
    initialize: function() {
      this.setName(this.getFactory().get('name'));
      this.doRecordChange();
      this.getRecord().on("change:" + (this.getName()), this.doRecordChange, this);
      this.add(this.createItems());
      return this.setId(this.getFactory().idForComponent());
    },
    createItems: function() {
      return [
        {
          xtype: 'fieldset',
          items: [this.createField()],
          instructions: this.getFactory().createInstructions(),
          title: this.getFactory().createTitle()
        }
      ];
    },
    updateSubValue: function(value) {
      throw "abstract method";
    },
    updateValue: function(value, oldValue) {
      this.getRecord().set(this.getName(), value);
      return this.updateSubValue(value);
    },
    handleInnerChangeEvent: function(field) {
      this.getRecord().set;
      return this.fireEvent('change');
    },
    doRecordChange: function() {
      return this.setValue(this.getRecord().get(this.getName()));
    }
  });

}).call(this);
