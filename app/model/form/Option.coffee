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
      option = if typeof(option) != "object"
        text: "#{option}"
        value: i
      else if option.text? and option.value?
        option
      else if option.text?
        text: option.text
        value: i
      else
        throw "Arggh"
      i+=1
      option


