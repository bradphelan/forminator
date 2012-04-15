Ext.define "app.view.FormKiosk"
  extend: "Ext.Panel"
  xtype: "formkiosk"

  currentRecord: null

  requires: [
    'app.model.FormDefinition'
    'app.view.FormSummary'
    'app.view.FormList'
  ]

  initialize: ->
    @callParent(arguments)
    @autowire [
      'selectForm'
    ]

  doSelectForm: (record) ->
    formsummary = @query("formsummary")[0]
    @currentRecord = record
    formsummary.setRecord(record)
    formsummary.initialize()

  config:
    layout: 'vbox'
    title: 'Forminator'
    items: [
      xtype: 'titlebar'
      title: 'Select a form'
    ,
      xtype: 'panel'
      layout: 'hbox'
      flex: 1
      items: [
        xtype: 'formlist'
      ,
        xtype: 'formsummary'
        flex: 2
      ]
    ]
