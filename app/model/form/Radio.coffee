Ext.define 'app.model.form.Radio'
  extend: 'app.model.form.Option'

  constructor: (config...)->
    console.log config
    @callParent config

  config:
    fields: [
      name: "labelWidth"
      type: "string"
      defaultValue: "90%"
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

      if option.help?
        xtype: 'panel'
        items: [
          component
        ,
          xtype: 'label'
          html: option.help
          cls: 'assist'
        ]
      else
        component

    items

  createField: ->
    xtype: 'panel'
    items: @createRadios()
