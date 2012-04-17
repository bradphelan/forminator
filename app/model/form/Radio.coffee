Ext.define 'app.model.form.Radio'
  extend: 'app.model.form.Option'

  createField: ->
    xtype: 'panel'
    items: @get('options').map (option)=>
      xtype: 'radiofield'
      value: option.value
      label: option.text
      name: @get('name')

