Ext.require "Ext.app.Application"

Ext.define  'Ext.util.CollectionExtensions'
  override: 'Ext.util.Collection'
  collect: (fn, scope) ->
    array = []
    cb = (elem, idx, len) =>
      array.push fn(elem, idx, len)
    @each cb, scope
    array

Application = null
Ext.onReady ->
  Application = Ext.create("Ext.app.Application",
    name: "app"
    controllers: [ ]
    models: ["Page"]

    launch: ->
      jasmine.getEnv().addReporter new jasmine.TrivialReporter()
      jasmine.getEnv().execute()
  )
