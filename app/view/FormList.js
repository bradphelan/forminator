(function() {

  Ext.define('app.view.FormList', {
    extend: 'Ext.dataview.List',
    requires: ['app.model.SampleForms'],
    xtype: 'formlist',
    config: {
      flex: 1,
      itemTpl: '{title}',
      bubbleEvents: 'selectForm'
    },
    initialize: function() {
      var _this = this;
      this.callParent(arguments);
      this.setStore(Ext.create('app.model.SampleForms'));
      return this.addListener({
        itemtap: function(list, index, item, record, e, opts) {
          return list.fireEvent('selectForm', record);
        },
        tap: function() {
          return alert('foo');
        }
      });
    }
  });

}).call(this);
