Ext.define 'app.model.form.Option'
  extend: 'Ext.data.Model'
  config:
    fields: [
      name: 'name'
      type: 'string'
    ,
      name: 'options'
      type: 'array'
    ,
      name: 'as'
      type: 'string'
    ]

  createField: ->
    throw "Abstract class"

