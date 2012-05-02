Ext.define "app.view.FormField"
  extend: "Ext.Panel"
  config:
    record: null
    # The name of this field
    name: null
    # The current value of this field ( will be stored in the model )
    value: null
    # The label for the form field
    label: ""
    type: "string"

  initialize: ->
    @getRecord().on "change:#{@getName()}", @doRecordChange, @

    @add
      xtype: 'panel'
      padding: '0 0 10px 0'
      items: [
        xtype: 'panel'
        html: @getLabel()
      ,
        @createField()
      ]

    # This will fill the UI with initial
    # values
    @setValue @getRecord().get(@getName())

  updateValue: (value, oldValue)->
    @getRecord().set(@getName(), value)

  doRecordChange: (obj, fieldName, newValue, oldValue)->
    @setValue newValue

