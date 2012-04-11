(function() {
  var _this = this;

  Ext.define("app.view.FormKiosk", {
    extend: "Ext.Panel",
    xtype: "formkiosk",
    requires: ['app.model.FormDefinition', 'app.model.SampleForms'],
    config: {
      layout: 'vbox',
      title: 'Forminator',
      items: [
        {
          xtype: 'titlebar',
          title: 'Select a form'
        }, {
          xtype: 'list',
          flex: 1,
          itemTpl: '{title}',
          listeners: {
            initialize: function(me, opts) {
              return me.setStore(Ext.create('app.model.SampleForms'));
            },
            itemtap: function(list, index, item, record, e, opts) {
              return app.view.MainNavigation.push(record.createForm());
            }
          }
        }
      ]
    }
  });

}).call(this);
