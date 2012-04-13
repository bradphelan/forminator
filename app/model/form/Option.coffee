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

  createRadioField: ->
    xtype: 'panel'
    items: @get('options').map (option)=>
      xtype: 'radiofield'
      value: option.value
      label: option.text
      name: @get('name')

  createSelectField: ->
    xtype: 'selectfield'
    name: @get('name')
    label: 'choose'
    options: @get('options')

  createPickerField: ->
    xtype: 'picker'
    name: @get('name')
    label: 'choose'
    options: @get('options')

  createField: ->
    switch @get('as')
      when 'radio'
        @createRadioField()
      when 'select'
        @createSelectField()

