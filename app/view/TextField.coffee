Ext.define "app.view.TextField"

  extend: "app.view.FormField"

  updateSubValue: (value)->
    field = @down('textfield')
    field.setValue(value)

  requires: [
    'Ext.form.DatePicker'
    'Ext.form.Password'
    'Ext.form.Email'
    'Ext.form.Number'
    'Ext.form.TextArea'
    'Ext.form.Url'
  ]

  mapXType: ->
    switch @getFactory().get('type')
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
        label: @getFactory().createLabel()
        labelWrap: true
      ]
    panel.on
      change:
        fn: @doChange
        scope: @
        delegate: @mapXType()

    panel

  doChange: (field, e) ->
    @setValue(field.getValue())
