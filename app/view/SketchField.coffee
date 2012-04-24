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

    @panel.on "change", @doChange, @

    @panel

  doChange: ->

    @setValue(@panel.getValue())


  updateSubValue: (value)->
    # TODO implement
    console.log "warning: cannot update image sketches yet!"
