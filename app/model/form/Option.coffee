Ext.define 'app.model.form.Option'
  extend: 'Ext.data.Model'
  config:
    fields: [
      name: 'name'
      type: 'string'
    ,
      name: 'label'
      type: 'string'
      defaultValue: null
    ,
      name: 'options'
      type: 'array'
    ,
      name: 'as'
      type: 'string'
    ]

  createLabel: ->
    if @get('label')?
      @get('label')
    else
      @get('name').replace /_/, '<br/> '

  options: ->
    @get('options').map (option)->
      if option.text? and option.value?
        option
      else
        text: option
        value: option

  createField: ->
    throw "Abstract class"

