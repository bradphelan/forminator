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
        if (_this.getRecord().get(item.get('name')) === null) {
          return allSet = false;
        }
      });
      return allSet;
    },
    updateState: function() {
      if (this.areAllItemsOnPageSet()) {
        return this.down("[iconCls=arrow_right]").setDisabled(false);
      }
    },
    configureListeners: function() {
      var _this = this;
      return this.addListener({
        'change': {
          'delegate': 'field',
          fn: function(field) {
            _this.getRecord().set(field.getName(), field.getValue());
            return _this.updateState();
          }
        },
        'check': {
          'delegate': 'field',
          fn: function(field) {
            _this.getRecord().set(field.getName(), field.getValue());
            return _this.updateState();
          }
        },
        'uncheck': {
          'delegate': 'field',
          fn: function(field) {
            _this.getRecord().set(field.getName(), field.getValue());
            return _this.updateState();
          }
        }
      });
    },
    currentIndex: function() {
      return this.getPagesUI().indexOf(this.getPagesUI().getActiveItem());
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
            items: this.getPage().get('items').getData().collect(function(item) {
              return item.createComponent();
            })
          }
        ]
      });
      if (this.getLast()) {
        this.add({
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
        });
      }
      this.configureListeners();
      return this.updateState();
    }
  });

}).call(this);
