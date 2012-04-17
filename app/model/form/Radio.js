(function() {

  Ext.define('app.model.form.Radio', {
    extend: 'app.model.form.Option',
    createField: function() {
      var _this = this;
      return {
        xtype: 'panel',
        items: this.get('options').map(function(option) {
          return {
            xtype: 'radiofield',
            value: option.value,
            label: option.text,
            name: _this.get('name')
          };
        })
      };
    }
  });

}).call(this);
