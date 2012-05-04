Ext.define "app.view.RadioField"
  extend: "app.view.FormField"

  config:
    options: "array"

  updateValue: (value, oldValue)->
    @callParent arguments
    fields = @query('radiofield')
    for field in fields
      if value == null
        field.setChecked(false)
      else if field.getValue() == value
        field.setChecked(true)

  createRadio: (option)->
    xtype: 'radiofield'
    value: "#{option.value}"
    label: option.text
    labelWidth: "90%"
    labelWrap: true
    name: @getName()

  createRadios: ->
    @getOptions().map (option)=>
      @createRadio(option)

  createField: ->
    panel = Ext.create "Ext.form.FieldSet"
      items: @createRadios()
    panel.on
      check:
        fn: @doChange
        scope: @
        delegate: "field"

    panel

  doChange: (checkBox, e) ->
    console.log "cb #{checkBox.getSubmitValue()}"
    
    @setValue(checkBox.getSubmitValue())
