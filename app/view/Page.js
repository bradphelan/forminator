(function() {

  Ext.define("app.view.Page", {
    extend: "Ext.Panel",
    config: {
      scrollable: "vertical",
      last: false,
      pagesUI: null,
      page: null,
      record: null
    },
    areAllItemsOnPageSet: function() {
      var allSet,
        _this = this;
      return true;
      allSet = true;
      this.getPage().get('items').getData().each(function(item) {
        if (!item.isSet(_this.getRecord())) {
          return allSet = false;
        }
      });
      return allSet;
    },
    updateVisibility: function() {
      var _this = this;
      return this.getPage().get('items').getData().each(function(item) {
        var visible;
        visible = item.isVisible(_this.getRecord());
        item.findComponent(_this).setShowAnimation("slideIn");
        item.findComponent(_this).setHideAnimation("slideOut");
        if (visible) {
          item.findComponent(_this).show();
        } else {
          item.findComponent(_this).hide();
        }
        if (!visible) {
          return _this.getRecord().set(item.get('name'), null);
        }
      });
    },
    updateState: function() {
      if (this.areAllItemsOnPageSet()) {
        this.down("[iconCls=arrow_right]").setDisabled(false);
      }
      return this.updateVisibility();
    },
    configureListeners: function() {
      var _this = this;
      return this.getRecord().on({
        change: {
          fn: function() {
            _this.updateState();
            return _this.configureListeners();
          },
          single: true
        }
      });
    },
    currentIndex: function() {
      return this.getPagesUI().indexOf(this.getPagesUI().getActiveItem());
    },
    buildFields: function() {
      var _this = this;
      return this.getPage().get('items').getData().collect(function(item) {
        return item.createComponent(_this.getRecord());
      });
    },
    buildSubmitToolbar: function() {
      var _this = this;
      return {
        xtype: 'titlebar',
        docked: 'bottom',
        title: 'You are done!',
        items: [
          {
            iconCls: 'action',
            iconMask: true,
            bubbleEvents: 'submitForm',
            align: 'right',
            text: 'SUBMIT!',
            listeners: {
              tap: function(me) {
                return me.fireEvent('submitForm', _this.getRecord());
              }
            }
          }
        ]
      };
    },
    initialize: function() {
      var _this = this;
      this.add({
        xtype: 'titlebar',
        title: this.getPage().get('title'),
        docked: "top",
        items: [
          {
            iconCls: 'arrow_left',
            cls: 'previous',
            iconMask: true,
            align: 'left',
            listeners: {
              tap: function() {
                _this.getPagesUI().getLayout().setAnimation({
                  type: 'slide',
                  direction: 'right',
                  duration: 500
                });
                return _this.getPagesUI().setActiveItem(_this.currentIndex() - 1);
              }
            }
          }, {
            iconCls: 'arrow_right',
            cls: 'next',
            iconMask: true,
            align: 'right',
            disabled: true,
            listeners: {
              tap: function() {
                _this.getPagesUI().getLayout().setAnimation({
                  type: 'slide',
                  direction: 'left',
                  duration: 500
                });
                return _this.getPagesUI().setActiveItem(_this.currentIndex() + 1);
              }
            }
          }
        ]
      });
      this.add({
        xtype: 'panel',
        items: [
          {
            xtype: 'label',
            html: this.getPage().get('help'),
            padding: 20
          }, {
            xtype: 'panel',
            items: this.buildFields()
          }
        ]
      });
      if (this.getLast()) {
        this.add(this.buildSubmitToolbar());
      }
      this.configureListeners();
      return this.updateState();
    }
  });

}).call(this);
