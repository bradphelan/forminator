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

       
  showIf: ->
    true

  constructor: ->
    @callParent arguments

    visibleExpression = @get('show_if')
    if visibleExpression?
      try
        expr = SkipLogic.parse(visibleExpression)
        fnDef = """
          this.showIf = function(__record__){
            return #{expr};
          }
        """
        eval fnDef
        # For some reason we must return
        # something other than the return
        # value of eval or we get a crash
        true
      catch error
        
        alert """
          Error processing skip logic

            #{fnDef}

          Got error

            #{error}

          Please check your form schema.
        """
        throw error


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
    @showIf(record)

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

    Ext.create @getComponentClass(), config

