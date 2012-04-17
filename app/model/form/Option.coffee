Ext.define 'app.model.form.Option'
  extend: 'app.model.form.Field'
  config:
    fields: [
      name: 'options'
      type: 'array'
    ]

  options: ->
    @get('options').map (option)->
      if option.text? and option.value?
        option
      else
        text: option
        value: option


