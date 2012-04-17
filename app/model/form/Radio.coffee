Ext.define 'app.model.form.Radio'
  extend: 'app.model.form.Option'

  asFieldSet: true

  createItems: ->
    items = @options().map (option)=>
      xtype: 'radiofield'
      value: option.value
      label: option.text
      name: @get('name')

    label =
      xtype: 'label'
      html: "<i style='padding: 0.6em'>#{@get('name')}</i>"

    items = [label, items...]


  createField: ->
    xtype: 'panel'
    items: @createItems()
