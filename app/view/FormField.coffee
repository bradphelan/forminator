Ext.define "app.view.FormField"
  extend: "Ext.Panel"
  config:
    # Some subclass of "app.model.form.Field"
    factory: null
    # A model instance where the entered field values
    # are stored
    record: null
    # The name of this field
    name: null
    # The current value of this field ( will be stored in the model )
    value: null

  initialize: ->
    @setName(@getFactory().get('name'))
    @getRecord().on "change:#{@getName()}", @doRecordChange, @

    @add
      xtype: 'panel'
      padding: '0 0 10px 0'
      items: [
        xtype: 'panel'
        html: @getFactory().createLabel()
      ,
        @createField()
      ]
      instructions: @getFactory().createInstructions()
      title: @getFactory().createTitle()

    @setId(@getFactory().idForComponent())


    # This will fill the UI with initial
    # values
    @setValue @getRecord().get(@getName())

  updateValue: (value, oldValue)->
    @getRecord().set(@getName(), value)

  doRecordChange: (obj, fieldName, newValue, oldValue)->
    @setValue newValue

