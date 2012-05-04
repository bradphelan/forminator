Ext.define "app.view.TextField"

  extend: "app.view.FormField"

  updateValue: (value, oldValue)->
    @callParent arguments
    field = @down('textfield')
    field.setValue(value)

  requires: [
    'Ext.field.DatePicker'
    'Ext.field.Password'
    'Ext.field.Email'
    'Ext.field.Number'
    'Ext.field.TextArea'
    'Ext.field.Url'
  ]

  mapXType: ->
    switch @getType()
      when 'password' then 'passwordfield'
      when 'email' then 'emailfield'
      when 'date' then 'datepickerfield'
      when 'url' then 'urlfield'
      when 'integer', 'int' then 'numberfield'
      when 'float' then 'numberfield'
      else
        'textfield'

  createField: ->
    panel = Ext.create "Ext.Panel"
      items: [
        xtype: @mapXType()
        name: @getName()
        label: null
        labelWrap: true
        labelAlign: 'top'
      ]
    panel.on
      change:
        fn: @doChange
        scope: @
        delegate: @mapXType()

    panel

  doChange: (field, e) ->
    @setValue(field.getValue())
