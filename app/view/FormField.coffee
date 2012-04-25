Ext.define "app.view.FormField"
  extend: "Ext.Panel"
  config:
    factory: null
    record: null
    name: null
    value: null
    cls: 'x-auto-form-field'


  initialize: ->
    @setName(@getFactory().get('name'))
    @doRecordChange()
    @getRecord().on "change:#{@getName()}", @doRecordChange, @

    @add @createItems()
    @setId(@getFactory().idForComponent())

  createItems: ->

    [
      xtype: 'fieldset'
      items: [ @createField() ]
      instructions: @getFactory().createInstructions()
      title: @getFactory().createTitle()
    ]

    @setId(@getFactory().idForComponent())


    # This will fill the UI with initial
    # values
    @doRecordChange()

  updateValue: (value, oldValue)->
    @getRecord().set(@getName(), value)

  handleInnerChangeEvent: (field)->
    @getRecord().set
    @fireEvent 'change'

  doRecordChange: ->
    @setValue @getRecord().get(@getName())

