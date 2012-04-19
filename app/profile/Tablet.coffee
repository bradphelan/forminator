Ext.define 'app.profile.Tablet',
  extend: 'Ext.app.Profile'

  views: ["app.view.MainNavigation"]

  isActive: ->
    return (Ext.os.is.Tablet or Ext.os.is.Desktop) and
      ( Ext.browser.is.IE \
      or Ext.browser.is.Webkit \
      or Ext.browser.is.Gecko \
      or Ext.browser.is.Opera \
      or Ext.browser.is.Chrome
      )
      
    

  launch: ->
    app.model.CoreExtensions
    Ext.fly("appLoadingIndicator").destroy()
    Ext.Viewport.add Ext.create 'app.view.MainNavigation'
