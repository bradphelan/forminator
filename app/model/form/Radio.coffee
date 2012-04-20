Ext.define 'app.model.form.Radio'
  extend: 'app.model.form.Option'

  asFieldSet: true

  createItems: ->
    items = @options().map (option)=>
      component =
        xtype: 'radiofield'
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

    if @get('help')?
      text = @get('help')
    else
      text = @createLabel()

    label =
      xtype: 'label'
      cls: "assist-radio"
      html: text

    items = [label, items...]


  createField: ->
    xtype: 'panel'
    items: @createItems()
