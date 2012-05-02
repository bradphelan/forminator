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
      name: 'defaultValue'
      type: 'string'
      defaultValue: null
    ,
      name: 'label'
      type: 'string'
      defaultValue: null
    ,
      name: 'show_if'
      type: 'string'
      defaultValue: null
    ,
      name: "labelWidth"
      type: "string"
      defaultValue: "30%"
    ,
      name: "range"
      type: "object"
      defaultValue: null
    ]

       

  createLabel: ->
    l = if @get('label')?
      @get('label')
    else
      @get('name')

    Ext.String.capitalize(l.replace /_/, ' ')

  # Using the 'show_if' item expression
  # return if the field should be visible
  # given the current record
  isVisible: (record)->
    visibleExpression = @get('show_if')
    if visibleExpression?
      __record__ = record
      try
        eval(SkipLogic.parse(visibleExpression))
      catch error
        alert """
          Error processing skip logic

            #{visibleExpression}

          Please check your form schema.
        """
        throw error
    else
      true

  # Checks if the entry in the record
  # corresponding to this field model
  # is set.
  isSet: (record)->
    record.get(@get('name'))?

  findComponent: (context)->
    context.down "[id=#{@idForComponent()}]"

  idForComponent: ->
    "form-field-#{@get('name')}"

  createComponent: (record)->
    config =
      label: @createLabel()
      record: record
      name: @get('name')
      id: @idForComponent()

    config = Ext.merge(@getData(), config)

    console.log config
    
    Ext.create @getComponentClass(), config

