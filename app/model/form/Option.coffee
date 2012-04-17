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

  options: ->
    @get('options').map (option)->
      if option.name? and option.value?
        option
      else
        text: option
        value: option

  createField: ->
    throw "Abstract class"

