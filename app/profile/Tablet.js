(function() {

  Ext.define('app.profile.Tablet', {
    extend: 'Ext.app.Profile',
    views: ["app.view.MainNavigation"],
    isActive: function() {
      if (Ext.browser.userAgent.match(/PhantomJS/)) {
        return false;
      }
      return (Ext.os.is.Tablet || Ext.os.is.Desktop) && (Ext.browser.is.IE || Ext.browser.is.WebKit || Ext.browser.is.Gecko || Ext.browser.is.Opera);
    },
    launch: function() {
      app.model.CoreExtensions;
      Ext.fly("appLoadingIndicator").destroy();
      return Ext.Viewport.add(Ext.create('app.view.MainNavigation'));
    }
  });

}).call(this);
