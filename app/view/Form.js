(function() {

  Ext.define("app.view.Form", {
    xtype: "medformpanel",
    extend: "Ext.Panel",
    config: {
      padding: 0,
      layout: {
        type: 'card',
        animation: {
          type: 'slide',
          direction: 'down'
        }
      },
      scrollable: false,
      pages: null,
      record: null
    },
    pagesCount: function() {
      return this.getPages().getData().length;
    },
    initialize: function() {
      var _this = this;
      return this.add(this.getPages().getData().collect(function(page, index) {
        return Ext.create('app.view.Page', {
          last: index === _this.pagesCount() - 1,
          scrollable: 'vertical',
          pagesUI: _this,
          page: page,
          record: _this.getRecord()
        });
      }));
    }
  });

}).call(this);
