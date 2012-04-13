Ext.define  'app.view.MainNavigation'
  singleton: true
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
    ]

  doSubmitForm: (record) ->
    app.view.MainNavigation.add
      xtype: 'modalformdata'
      record: record

