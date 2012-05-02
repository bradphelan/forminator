Ext.define "app.view.RadioField"
  extend: "app.view.FormField"

  config:
    options: "array"

  updateValue: (value, oldValue)->
    @callParent arguments
    fields = @query('radiofield')
    for field in fields
      if value == null
        field.setChecked(false)
      else if field.getValue() == value
        field.setChecked(true)

  createRadio: (option)->
    xtype: 'radiofield'
    value: option.value
    label: Ext.String.capitalize option.text
    name: @getName()

  createRadios: ->
    items = @getOptions().map (option)=>

      xtype: 'panel'
      items: [
        @createRadio(option)
      ,
        xtype: 'label'
        html: option.label
        cls: 'assist'
      ]

  createField: ->
    panel = Ext.create "Ext.Panel"
      items: @createRadios()
    panel.on
      check:
        fn: @doChange
        scope: @
        delegate: "field"
      uncheck:
        fn: @doChange
        scope: @
        delegate: "field"


    panel

  doChange: (checkBox, e) ->
    @setValue(checkBox.getValue())
