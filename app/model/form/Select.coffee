Ext.define 'app.model.form.Select'
  extend: 'app.model.form.Option'

  createSelectField: ->
    xtype: 'selectfield'
    name: @get('name')
    label: 'choose'
    options: @get('options')

