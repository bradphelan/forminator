(function() {

  Ext.define("app.view.FormPagesLister", {
    extend: "Ext.Panel",
    config: {
      pages: null,
      record: null,
      layout: 'vbox'
    },
    pagesCount: function() {
      return this.getPages().getData().length;
    },
    initialize: function() {
      var card, list,
        _this = this;
      this.callParent();
      card = Ext.create('Ext.Panel', {
        padding: 0,
        layout: {
          type: 'card',
          animation: {
            type: 'slide',
            direction: 'down'
          }
        },
        scrollable: false,
        flex: 1,
        pages: this.getPages(),
        record: this.getRecord()
      });
      card.add(this.getPages().getData().collect(function(page, index) {
        return Ext.create('app.view.Page', {
          last: index === _this.pagesCount() - 1,
          pagesUI: card,
          page: page,
          record: _this.getRecord()
        });
      }));
      list = Ext.create('Ext.List', {
        store: this.getPages(),
        itemTpl: "{title}",
        scrollable: true,
        cls: "x-question-list",
        flex: 1,
        listeners: {
          itemtap: function(view, index) {
            var currentIndex;
            currentIndex = card.items.indexOf(card.getActiveItem());
            card.getLayout().setAnimation({
              type: 'slide',
              direction: index > currentIndex ? 'left' : 'right',
              duration: 500,
              easing: 'ease-in'
            });
            return card.setActiveItem(index);
          }
        }
      });
      card.on({
        activeitemchange: function(card, item, oldIndex) {
          var index;
          index = card.items.indexOf(item);
          return list.select(index);
        }
      });
      list.select(0);
      this.add({
        xtype: 'panel',
        width: 200,
        docked: 'left',
        layout: 'vbox',
        items: [
          {
            xtype: 'titlebar',
            title: 'Questions'
          }, list
        ]
      });
      return this.add(card);
    }
  });

}).call(this);
