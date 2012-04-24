Ext.define 'app.model.form.Select'
  extend: 'app.model.form.Option'

  createField: ->
    xtype: 'selectfield'
    name: @get('name')
    label: @createLabel()
    options: @options()

  initialize: ->
    @callParent(arguments)
    setComponentClass('app.view.SelectField')
