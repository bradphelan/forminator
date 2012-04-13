(function() {
  var json;

  json = {
    title: "Ugly Face Form",
    pages: [
      {
        title: "How do you feel",
        help: "Tell me how you feel. I can fix it for you.\nTrust me I'm a doctor, I know all the drugs",
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
        title: "What is your face like?",
        help: "An ugly face can make you sick. How is yours?",
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

  json = Ext.JSON.encode(json);

  Ext.define("SampleFormBuilder", {
    requires: ['app.model.FormDefinition'],
    buildForm: function() {}
  });

  Ext.define("app.view.SampleForm", {
    extend: "Ext.Panel",
    requires: ['app.model.FormDefinition'],
    constructor: function(config) {
      var formDef;
      this.callParent(config);
      formDef = Ext.create('app.model.FormDefinition', json);
      return this.add(formDef.createForm());
    },
    config: {
      layout: "fit"
    }
  });

}).call(this);
