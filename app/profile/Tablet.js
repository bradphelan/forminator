(function() {

  Ext.define('app.profile.Tablet', {
    extend: 'Ext.app.Profile',
    views: ["app.view.MainNavigation"],
    isActive: function() {
      return (Ext.os.is.Tablet || Ext.os.is.Desktop) && Ext.browser.is.Chrome;
    },
    launch: function() {
      app.model.CoreExtensions;
      Ext.fly("appLoadingIndicator").destroy();
      return Ext.Viewport.add(Ext.create('app.view.MainNavigation'));
    }
  });

}).call(this);
