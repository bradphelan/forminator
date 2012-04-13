(function() {
  var _this = this;

  Ext.define('app.view.FormList', {
    extend: 'Ext.List',
    requires: ['app.model.SampleForms'],
    xtype: 'formlist',
    config: {
      flex: 1,
      itemTpl: '{title}',
      bubbleEvents: 'selectForm',
      listeners: {
        initialize: function(me, opts) {
          return me.setStore(Ext.create('app.model.SampleForms'));
        },
        itemtap: function(list, index, item, record, e, opts) {
          return list.fireEvent('selectForm', record);
        }
      }
    }
  });

}).call(this);
