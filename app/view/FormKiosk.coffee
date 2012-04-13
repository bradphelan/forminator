Ext.define "app.view.FormKiosk"
  extend: "Ext.Panel"
  xtype: "formkiosk"

  requires: [
    'app.model.FormDefinition'
    'app.model.SampleForms'
    'app.view.FormSummary'
  ]

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
        xtype: 'list'
        id: "formlist"
        flex: 1
        itemTpl: '{title}'
        listeners:
          initialize: (me, opts)=>
            me.setStore Ext.create 'app.model.SampleForms'
          itemtap: (list, index, item, record, e, opts) =>
            #console.log FormKiosk.formSummary()
            #app.view.MainNavigation.push record.createForm()
      ,
        xtype: 'formsummary'
        id: "formsummary"
        flex: 2
      ]
    ]

    formSummary: ->
        console.log Ext.ComponentQuery.query("#formsummary")



