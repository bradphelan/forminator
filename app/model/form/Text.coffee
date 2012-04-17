Ext.define 'app.model.form.Text'
  extend: 'Ext.data.Model'
  config:
    fields: [
      name: 'name'
      type: 'string'
    ,
      name: 'type'
      type: 'string'
      defaultValue: 'string'
    ]

  requires: [
    'Ext.form.DatePicker'
    'Ext.form.Password'
    'Ext.form.Email'
    'Ext.form.Number'
    'Ext.form.TextArea'
    'Ext.form.Url'
  ]

  mapXType: ->
    switch @get('type')
      when 'password' then 'passwordfield'
      when 'email' then 'emailfield'
      when 'date' then 'datepickerfield'
      when 'url' then 'urlfield'
      when 'integer', 'int' then 'numberfield'
      when 'float' then 'numberfield'
      else
        'textfield'

  createLabel: ->
    @get('name').replace /_/, '<br/> '
  createField: ->
    xtype: @mapXType()
    name: @get('name')
    label: @createLabel() +  " <i>("  + @get('type') + ")</i>"
    labelWrap: true

