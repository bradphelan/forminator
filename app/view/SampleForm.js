(function() {
  var formDef, json;

  json = {
    pages: [
      {
        title: "Page 0",
        items: [
          {
            xtype: "option",
            name: 'fieldA',
            as: 'radio',
            options: [
              {
                text: "bad",
                value: 0
              }, {
                text: "good",
                value: 1
              }, {
                text: "excelent",
                value: 2
              }
            ]
          }
        ]
      }, {
        title: "Page 1",
        items: [
          {
            xtype: "option",
            name: 'fieldB',
            as: 'select',
            options: [
              {
                text: "ugly",
                value: 0
              }, {
                text: "pretty",
                value: 1
              }
            ]
          }
        ]
      }
    ]
  };

  Ext.require('app.model.FormDefinition');

  json = Ext.JSON.encode(json);

  formDef = Ext.create('app.model.FormDefinition', json);

  Ext.define("app.view.SampleForm", {
    extend: "Ext.Panel",
    config: {
      layout: "fit",
      items: [formDef.createForm()]
    }
  });

}).call(this);
