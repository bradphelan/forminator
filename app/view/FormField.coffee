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

  updateSubValue: (value)->
    throw "abstract method"

  updateValue: (value, oldValue)->
    @getRecord().set(@getName(), value)
    @updateSubValue(value)

  handleInnerChangeEvent: (field)->
    @getRecord().set
    @fireEvent 'change'

  doRecordChange: ->
    @setValue @getRecord().get(@getName())

