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
      card = Ext.create('Ext.Panel', {
        padding: 0,
        layout: {
          type: 'card'
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
      card.on({
        show: {
          delegate: 'page',
          fn: function(page) {
            return page.buildUI();
          }
        },
        hide: {
          delegate: 'page',
          fn: function(page) {
            return page.destroyUI();
          }
        }
      });
      list = Ext.create('Ext.List', {
        store: this.getPages(),
        itemTpl: "{title}",
        scrollable: true,
        cls: "x-question-list",
        flex: 1,
        mode: "SINGLE",
        listeners: {
          selectionchange: function(list, records, opts) {
            var index;
            console.log(records[0].$className);
            index = _this.getPages().indexOf(records[0]);
            return card.setActiveItem(index);
          }
        }
      });
      card.on({
        activeitemchange: function(card, item, oldIndex) {
          var cls, fullListHeight, index, pos, scrollWindowHeight, scroller, selectedElement, selectedHeight, triggerZone, yBottom, yTop;
          index = card.items.indexOf(item);
          list.select(index, false, true);
          cls = list.getSelectedCls();
          selectedElement = list.element.down("." + cls);
          selectedHeight = selectedElement.getHeight();
          if (selectedElement) {
            fullListHeight = list.element.down(".x-list-container").getHeight();
            scrollWindowHeight = list.element.getHeight();
            yTop = selectedElement.dom.offsetTop;
            yBottom = yTop + selectedHeight;
            scroller = list.getScrollable().getScroller();
            triggerZone = {
              min: scroller.position.y + selectedHeight,
              max: scroller.position.y + scrollWindowHeight - selectedHeight
            };
            if (yTop < triggerZone.min) {
              pos = yTop - selectedHeight;
            }
            if (yBottom > triggerZone.max) {
              pos = yTop + 2 * selectedHeight - scrollWindowHeight;
            }
            if (pos != null) {
              pos = Math.max(0, pos);
              pos = Math.min(pos, fullListHeight - scrollWindowHeight);
              return scroller.scrollTo(0, pos, true);
            }
          }
        }
      });
      this.add([
        {
          xtype: 'panel',
          width: 250,
          docked: 'left',
          layout: 'vbox',
          items: [
            {
              xtype: 'titlebar',
              title: 'Seiten'
            }, list
          ]
        }, card
      ]);
      return list.select(0);
    }
  });

}).call(this);
