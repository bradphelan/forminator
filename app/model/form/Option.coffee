Ext.define 'app.model.form.Option'
  extend: 'app.model.form.Field'
  config:
    fields: [
      name: 'options'
      type: 'array'
    ]

  options: ->
    i = 0
    @get('options').map (option)->
      option = if option.text? and option.value?
        option
      else if option.constructor == String
        text: option
        value: i
      else if not option.value?
        option.value = i
        option
      else
        throw "Arggh"
      i+=1
      option


