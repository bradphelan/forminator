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
      name: 'help'
      type: 'string'
      defaultValue: null
    ]

  createLabel: ->
    l = if @get('label')?
      @get('label')
    else
      @get('name')

    Ext.String.capitalize(l.replace /_/, ' ')
       

  createItems: ->

    items = []

    items.push @createField()

    if @get('help')?
      items.push
        xtype:'label'
        html: @get('help')
        cls: 'assist'

    items

  createComponent: ->
    xtype: 'panel'
    items: @createItems()
