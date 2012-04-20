Ext.define 'app.profile.Tablet',
  extend: 'Ext.app.Profile'

  views: ["app.view.MainNavigation"]

  isActive: ->
    return (Ext.os.is.Tablet or Ext.os.is.Desktop) and
      ( Ext.browser.is.IE \
      or Ext.browser.is.WebKit \
      or Ext.browser.is.Gecko \
      or Ext.browser.is.Opera 
      )
      
    

  launch: ->
    app.model.CoreExtensions
    Ext.fly("appLoadingIndicator").destroy()
    Ext.Viewport.add Ext.create 'app.view.MainNavigation'
