(function() {
  var form0, form1;

  form0 = {
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

  form1 = {
    title: "Pain Form",
    pages: [
      {
        title: "How do you feel today",
        help: "On average how do you feel today?",
        items: [
          {
            xtype: "option",
            name: 'today',
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
        title: "How did you feel yesterday",
        help: "On average how did you feel yesterday?",
        items: [
          {
            xtype: "option",
            name: 'yesterday',
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
        title: "How did you feel last week",
        help: "On average how did you feel last week?",
        items: [
          {
            xtype: "option",
            name: 'last_week',
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
      }
    ]
  };

  Ext.define('app.model.SampleForms', {
    extend: 'Ext.data.Store',
    requires: ['app.model.FormDefinition', 'Ext.data.Store'],
    constructor: function(config) {
      this.callParent(config);
      return this.setData([form0, form1]);
    },
    config: {
      model: 'app.model.FormDefinition'
    }
  });

}).call(this);
