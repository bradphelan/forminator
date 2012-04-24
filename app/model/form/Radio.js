(function() {

  Ext.define('app.model.form.Radio', {
    extend: 'app.model.form.Option',
    requires: ['app.view.RadioField'],
    config: {
      componentClass: 'app.view.RadioField',
      fields: [
        {
          name: "labelWidth",
          type: "string",
          defaultValue: "90%"
        }
      ]
    },
    createTitle: function() {
      if (this.get('title') != null) {
        return this.get('title');
      } else {
        return this.createLabel();
      }
    },
    createInstructions: function() {
      var i;
      i = this.callParent();
      if (i != null) {
        return i;
      } else {
        return "&nbsp;";
      }
    }
  });

}).call(this);
