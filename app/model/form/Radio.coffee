Ext.define 'app.model.form.Radio'
  extend: 'app.model.form.Option'

  asFieldSet: true

  createItems: ->
    items = @options().map (option)=>
      xtype: 'radiofield'
      value: option.value
      label: option.text
      name: @get('name')

    if @get('help')?
      text = get('help')
    else
      text = @createLabel()

    label =
      xtype: 'label'
      html: "<i style='padding: 0.6em'>#{text}</i>"

    items = [label, items...]


  createField: ->
    xtype: 'panel'
    items: @createItems()
