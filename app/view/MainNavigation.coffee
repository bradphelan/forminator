Ext.define  'app.view.MainNavigation'
  extend: 'Ext.navigation.View'
  requires: [
    'app.view.FormKiosk'
    'app.view.ModalFormData'
  ]
  config:
    items: [
      xtype: "formkiosk"
    ]

  initialize: ->
    @autowire [
      'submitForm'
      'executeForm'
    ]

  doExecuteForm: (record)->
    @push record.createForm()

  doSubmitForm: (record) ->
    @pop()
    @add
      xtype: 'modalformdata'
      record: record

