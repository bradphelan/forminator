Ext.define "app.view.RadioField"
  extend: "app.view.FormField"

  updateValue: (value, oldValue)->
    @callParent arguments
    fields = @query('radiofield')
    for field in fields
      if field.getValue() == value
        field.setChecked(true)

  createRadio: (option)->
    xtype: 'radiofield'
    labelWidth: @get('labelWidth')
    value: option.value
    label: Ext.String.capitalize option.text
    name: @getName()

  createRadios: ->
    items = @getFactory().options().map (option)=>

      xtype: 'panel'
      items: [
        @createRadio(option)
      ,
        xtype: 'label'
        html: option.help
        cls: 'assist'
      ]

  createField: ->
    panel = Ext.create "Ext.Panel"
      items: @createRadios()
    panel.on "check", @doChange, @
    panel.mo "uncheck", @doChange, @

    panel

  doChange: (checkBox, e) ->
    @setValue(checkBox.getValue())
