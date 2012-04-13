Ext.define 'app.controller.Forms'
  extend: 'Ext.app.Controller'

  currentRecord: null

  config:
    refs:
      formlist: '#formlist'
      formsummary: '#formsummary'
      executeFormButton: '#executeFormButton'
    currentRecord: null

    control:
      formlist:
        itemtap: 'doSelectForm'
      executeFormButton:
        tap: 'doExecuteForm'

  doSelectForm: (list, index, item, record, e) ->
    formsummary = @getFormsummary()
    @currentRecord = record
    formsummary.setRecord(record)
    formsummary.initialize()

  doExecuteForm: ->
    console.log "yay"
    app.view.MainNavigation.push @currentRecord.createForm()

