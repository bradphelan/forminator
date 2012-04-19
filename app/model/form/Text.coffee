Ext.define 'app.model.form.Text'
  extend: 'app.model.form.Field'

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

  createField: ->
    xtype: @mapXType()
    name: @get('name')
    label: @createLabel()
    labelWrap: true
