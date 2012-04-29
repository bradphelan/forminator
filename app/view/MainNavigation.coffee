Ext.define  'app.view.MainNavigation'
  extend: 'Ext.navigation.View'
  requires: [
    'app.view.FormKiosk'
    'app.view.ModalFormData'
    'app.view.Sketch'
  ]

  initialize: ->
    @callParent(arguments)
    # Hide the nav bar we want to
    # craft our own solution
    # @getNavigationBar().hide()
    @autowire [
      'submitForm'
      'executeForm'
    ]

    @push
      xtype: "formkiosk"

  doExecuteForm: (record)->
    @push record.createForm()

  doSubmitForm: (record) ->
    @pop()
    panel = Ext.create 'app.view.ModalFormData'
      record: record
    Ext.Viewport.add panel

    Ext.Ajax.request
      params:
        JSON.stringify(record.getData(), undefined, 2)
      method: "POST"
      headers:
        'Content-Type': 'application/json;charset=utf-8'
      url: "/form.json"
      success: (response)=>
        console.log "Submitted form to server ok"
      error: =>
        console.log "Nein"
        
        

