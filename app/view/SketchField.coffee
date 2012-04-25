Ext.define "app.view.SketchFieldImpl"
  extend: "Ext.field.Field"
  xtype: "sketchfield"
  config:
    component:
      xtype: "sketch"
      minHeight: 600
      useToolbar: false

  initialize: ->
    @callParent()
    @getComponent().on
      change:
        scope: @
        fn: @onSketchChange

  onSketchChange: (sketchData)->
    @setValue(sketchData)
    @fireEvent "change"

  getValues: ->
    @getComponent().pngData()

  getValue: ->
    @getValues()


Ext.define "app.view.SketchField"
  extend: "app.view.FormField"

  createField: ->
    @panel = Ext.create "app.view.SketchFieldImpl"
      name: @getName()
      label: @getFactory().createLabel()
      labelWrap: true

    @panel.on "change", @doChange, @

    @panel

  doChange: ->
    @setValue(@panel.getValue())

  updateValue: (value, oldValue)->
    @callParent arguments
    # TODO implement
    console.log "warning: cannot update image sketches yet!"
