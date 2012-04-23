Ext.define "app.view.SketchField"
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
      scope: @
      change: 'onSketchChange'

  onSketchChange: (sketchData)->
    @fireEvent "change", @, sketchData

  getValues: ->
    @getComponent().pngData()

  getValue: ->
    @getValues()
