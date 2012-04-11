Ext.define  'app.view.MainNavigation'
  singleton: true
  extend: 'Ext.navigation.View'
  requires: 'app.view.FormKiosk'
  config:
    items: [
      xtype: "formkiosk"
    ]

