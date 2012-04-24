Ext.define 'app.model.form.Field'
  extend: 'Ext.data.Model'
  config:

    fields: [
      name: 'name'
      type: 'string'
    ,
      name: 'type'
      type: 'string'
      defaultValue: 'string'
    ,
      name: 'label'
      type: 'string'
      defaultValue: null
    ,
      name: 'show_if'
      type: 'string'
      defaultValue: null
    ,
      name: 'title'
      type: 'string'
      defaultValue: null
    ,
      name: 'help'
      type: 'string'
      defaultValue: null
    ,
      name: "labelWidth"
      type: "string"
      defaultValue: "30%"
    ]

       
  idForComponent: ->
    "form-field-#{@get('name')}"

  createTitle: -> @get('title')

  createLabel: ->
    l = if @get('label')?
      @get('label')
    else
      @get('name')

    Ext.String.capitalize(l.replace /_/, ' ')

  createInstructions: -> @get('help')

  # Using the 'show_if' item expression
  # return if the field should be visible
  # given the current record
  isVisible: (record)->
    visibleExpression = @get('show_if')
    if visibleExpression?
      __record__ = record
      eval(SkipLogic.parse(visibleExpression))
    else
      true

  # Checks if the entry in the record
  # corresponding to this field model
  # is set.
  isSet: (record)->
    record.get(@get('name'))?

  findComponent: (context)->
    context.down "[id=#{@idForComponent()}]"

  createComponent: (record)->
    Ext.create @getComponentClass(),
      factory: @
      record: record

