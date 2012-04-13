Ext.Loader.setPath Ext: "sdk/src"

# Create a 'collect' method on the collection
# of elements in the collection
# @return array of transformed elements
Ext.define  'Ext.util.CollectionExtensions'
  override: 'Ext.util.Collection'
  collect: (fn, scope) ->
    array = []
    cb = (elem, idx, len) =>
      array.push fn(elem, idx, len)
    @each cb, scope
    array

# Create an autowire for events on
# views for simple proxying of events
Ext.define  'Ext.PanelExtensions',
  override: 'Ext.Container'

  autowire: (events)->
    for event in events
      h = {}
      m = "do#{Ext.String.capitalize event}"
      console.log m
      h[event]= do (m)=>
        => @[m](arguments...)
      @addListener h

Ext.application
  name: "app"
  requires: [
    "Ext.MessageBox"
    "app.view.MainNavigation"
    'app.controller.Forms'
  ]
  views: [ "Main" ]
  controllers: [
  ]
  icon:
    57: "resources/icons/Icon.png"
    72: "resources/icons/Icon~ipad.png"
    114: "resources/icons/Icon@2x.png"
    144: "resources/icons/Icon~ipad@2x.png"

  phoneStartupScreen: "resources/loading/Homescreen.jpg"
  tabletStartupScreen: "resources/loading/Homescreen~ipad.jpg"
  launch: ->
    Ext.fly("appLoadingIndicator").destroy()
    Ext.Viewport.add app.view.MainNavigation

  onUpdated: ->
    Ext.Msg.confirm "Application Update", "This application has just successfully been updated to the latest version. Reload now?", ->
      window.location.reload()

