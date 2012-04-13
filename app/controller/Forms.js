(function() {

  Ext.define('app.controller.Forms', {
    extend: 'Ext.app.Controller',
    currentRecord: null,
    config: {
      refs: {
        formlist: '#formlist',
        formsummary: '#formsummary'
      },
      currentRecord: null
    },
    init: function() {}
  });

}).call(this);
