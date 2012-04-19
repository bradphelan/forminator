(function() {
  var __slice = [].slice;

  Ext.define('app.model.form.Radio', {
    extend: 'app.model.form.Option',
    asFieldSet: true,
    createItems: function() {
      var items, label, text,
        _this = this;
      items = this.options().map(function(option) {
        return {
          xtype: 'radiofield',
          value: option.value,
          label: option.text,
          name: _this.get('name')
        };
      });
      if (this.get('help') != null) {
        text = get('help');
      } else {
        text = this.createLabel();
      }
      label = {
        xtype: 'label',
        html: "<i style='padding: 0.6em'>" + text + "</i>"
      };
      return items = [label].concat(__slice.call(items));
    },
    createField: function() {
      return {
        xtype: 'panel',
        items: this.createItems()
      };
    }
  });

}).call(this);
