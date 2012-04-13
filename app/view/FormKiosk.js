(function() {
  var _this = this;

  Ext.define("app.view.FormKiosk", {
    extend: "Ext.Panel",
    xtype: "formkiosk",
    requires: ['app.model.FormDefinition', 'app.model.SampleForms', 'app.view.FormSummary'],
    config: {
      layout: 'vbox',
      title: 'Forminator',
      items: [
        {
          xtype: 'titlebar',
          title: 'Select a form'
        }, {
          xtype: 'panel',
          layout: 'hbox',
          flex: 1,
          items: [
            {
              xtype: 'list',
              id: "formlist",
              flex: 1,
              itemTpl: '{title}',
              listeners: {
                initialize: function(me, opts) {
                  return me.setStore(Ext.create('app.model.SampleForms'));
                },
                itemtap: function(list, index, item, record, e, opts) {}
              }
            }, {
              xtype: 'formsummary',
              id: "formsummary",
              flex: 2
            }
          ]
        }
      ],
      formSummary: function() {
        return console.log(Ext.ComponentQuery.query("#formsummary"));
      }
    }
  });

}).call(this);
