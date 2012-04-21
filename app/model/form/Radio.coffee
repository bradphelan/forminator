Ext.define 'app.model.form.Radio'
  extend: 'app.model.form.Option'

  constructor: (config...)->
    @callParent config

  config:
    fields: [
      name: "labelWidth"
      type: "string"
      defaultValue: "80%"
    ]

  createTitle: ->
    if @get('title')?
      @get('title')
    else
      @createLabel()

  createRadios: ->
    items = @options().map (option)=>
      component =
        xtype: 'radiofield'
        labelWidth: @get('labelWidth')
        value: option.value
        label: Ext.String.capitalize option.text
        name: @get('name')

      xtype: 'panel'
      items: [
        component
      ,
        xtype: 'label'
        html: option.help
        cls: 'assist'
      ]

    items

  createInstructions: ->
    i = @callParent()
    if i?
      i
    else
      "&nbsp;"

  createField: ->
    xtype: 'panel'
    items: @createRadios()
