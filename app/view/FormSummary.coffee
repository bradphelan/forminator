Ext.define 'app.view.FormSummary'
  extend: "Ext.Panel"
  xtype: 'formsummary'
  config:
    layout: 'vbox'
    record: {}


  st: (txt)->
    new Ext.Template txt,
      compiled: true

  initialize: ->
    @removeAll(true, true)
    if @getRecord()?
      record = @getRecord()
      @add [
        record: record
        tpl: @st """
        {summary:htmlEncode}
        """
        padding: 50
      ,
        xtype: 'button'
        id: "executeFormButton"
        docked: 'bottom'
        text: "Execute"
      ]
