form0 =
  title: "Ugly Face Form"
  summary: """
  Ugly faces are dangerous. We need to
  collect information on this condition.
  Please assist us.
  """
  pages: [
    title: "How do you feel"
    help: """
      Tell me how you feel. I can fix it for you.
      Trust me I'm a doctor, I know all the drugs
    """
    items: [
      type: "integer"
      name: 'fieldA'
      xtype: "option"
      as: 'radio'
      options: [
        text: "bad"
        value: 0
      ,
        text: "good"
        value: 1
      ,
        text: "excelent"
        value: 2
      ]
    ]
  ,
    title: "What is your face like?"
    help: """
      An ugly face can make you sick. How is yours?
    """
    items: [
      xtype: "option"
      type: "integer"
      name: 'fieldB'
      as: 'select'
      options: [
        text: "ugly"
        value: 0
      ,
        text: "pretty"
        value: 1
      ]
    ]

  ]

form1 =
  title: "Pain Form"
  summary: """
  Pain is a pain in the popo. Help
  us remove pain. Am I annoying you
  yet..
  """
  pages: [
    title: "How do you feel today"
    help: """
    On average how do you feel today?
    """
    items: [
      xtype: "option"
      type: "integer"
      name: 'today'
      as: 'radio'
      options: [
        text: "bad"
        value: 0
      ,
        text: "good"
        value: 1
      ,
        text: "excelent"
        value: 2
      ]
    ]
  ,
    title: "How did you feel yesterday"
    help: """
    On average how did you feel yesterday?
    """
    items: [
      name: 'yesterday'
      type: "integer"
      xtype: "option"
      as: 'radio'
      options: [
        text: "bad"
        value: 0
      ,
        text: "good"
        value: 1
      ,
        text: "excelent"
        value: 2
      ]
    ]

  ,
    title: "How did you feel last week"
    help: """
    On average how did you feel last week?
    """
    items: [
      type: "integer"
      name: 'last_week'
      as: 'radio'
      xtype: "option"
      options: [
        text: "bad"
        value: 0
      ,
        text: "good"
        value: 1
      ,
        text: "excelent"
        value: 2
      ]
    ]
  ]


Ext.define 'app.model.SampleForms'
  extend: 'Ext.data.Store'

  requires: [
    'app.model.FormDefinition'
    'Ext.data.Store'
  ]

  constructor: (config)->
    @callParent(config)
    @setData [
        form0
      ,
        form1
      ]

  config:
    model: 'app.model.FormDefinition'

  

