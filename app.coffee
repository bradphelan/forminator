Ext.Loader.setPath Ext: "sdk/src"


Ext.application
  name: "app"
  profiles: ['Tablet']
  requires: [
    "app.model.CoreExtensions"
    "Ext.MessageBox"
    "app.view.MainNavigation"
    'app.controller.Forms'
  ]
  views: [ "app.view.MainNavigation" ]
  controllers: [
  ]
  icon:
    57: "resources/icons/Icon.png"
    72: "resources/icons/Icon~ipad.png"
    114: "resources/icons/Icon@2x.png"
    144: "resources/icons/Icon~ipad@2x.png"

  phoneStartupScreen: "resources/loading/Homescreen.jpg"
  tabletStartupScreen: "resources/loading/Homescreen~ipad.jpg"

  onUpdated: ->
    Ext.Msg.confirm "Application Update", "This application has just successfully been updated to the latest version. Reload now?", ->
      window.location.reload()

