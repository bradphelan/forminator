Ext.define "app.view.BooleanField"
  extend: "app.view.FormField"
  
  updateValue: (value, oldValue)->
    @callParent arguments
    @cachedField.setChecked(value)

  requires: [
    'Ext.field.Checkbox'
  ]
  
  createField: ->
    field = Ext.create 'Ext.field.Checkbox'
      name: @getName()
      label: null
      labelWrap: false
      labelAlign: "left"

    field.on
      check: (field)=> @doChange(field)
      uncheck: (field)=> @doChange(field)

    field

  doChange: (field)->
    @setValue(field.isChecked())
    


