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

  createLabel: ->
    l = if @get('label')?
      @get('label')
    else
      @get('name')

    Ext.String.capitalize(l.replace /_/, ' ')
       
  createTitle: -> @get('title')

  createInstructions: -> @get('help')

  createItems: ->

    items = []

    title = @createTitle()
    help = @createInstructions()

    items.push
      xtype: 'fieldset'
      items: [ @createField() ]
      instructions: help
      title: title

    items

  createComponent: ->
    xtype: 'panel'
    items: @createItems()
