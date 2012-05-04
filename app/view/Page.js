(function() {

  Ext.define("app.view.Page", {
    extend: "Ext.Panel",
    config: {
      scrollable: "vertical",
      last: false,
      pagesUI: null,
      page: null,
      record: null,
      padding: 10
    },
    constructor: function() {
      return this.callParent(arguments);
    },
    areAllItemsOnPageSet: function() {
      var allSet, item, _i, _len, _ref;
      return true;
      allSet = true;
      _ref = this.getPage().get('items');
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        item = _ref[_i];
        if (!item.isSet(this.getRecord())) {
          allSet = false;
        }
      }
      return allSet;
    },
    updateComponentVisibilty: function(item, animate) {
      var component;
      component = this.componentMap[item.idForComponent()];
      if (item.isVisible(this.getRecord())) {
        if (animate) {
          return component.show();
        } else {
          return component.setHidden(false);
        }
      } else {
        if (!component.getHidden()) {
          this.getRecord().set(item.get('name'), null);
          if (animate) {
            return component.hide();
          } else {
            return component.setHidden(true);
          }
        }
      }
    },
    updateVisibility: function() {
      var item, _i, _len, _ref, _results;
      if (this.buildUIDone) {
        _ref = this.getPage().get('items');
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          item = _ref[_i];
          _results.push(this.updateComponentVisibilty(item));
        }
        return _results;
      }
    },
    configureListeners: function() {
      var _this = this;
      this.on({
        show: function(me, opts) {
          return _this.buildUI();
        },
        hide: function(me, opts) {
          return _this.destroyUI();
        }
      });
      return this.getRecord().on({
        change: {
          fn: function() {
            return _this.updateVisibility();
          }
        }
      });
    },
    currentIndex: function() {
      return this.getPagesUI().indexOf(this.getPagesUI().getActiveItem());
    },
    buildFields: function() {
      var component, item, _i, _len, _ref, _results;
      _ref = this.getPage().get('items');
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        item = _ref[_i];
        component = item.createComponent(this.getRecord());
        component.setShowAnimation("slideIn");
        component.setHideAnimation("fadeOut");
        this.componentMap[item.idForComponent()] = component;
        _results.push(this.updateComponentVisibilty(item, false));
      }
      return _results;
    },
    buildSubmitToolbar: function() {
      var _this = this;
      return {
        xtype: 'titlebar',
        docked: 'bottom',
        title: 'Sie sind fertig',
        items: [
          {
            iconCls: 'action',
            iconMask: true,
            bubbleEvents: 'submitForm',
            align: 'right',
            text: 'Legt ihn!',
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
      this.configureListeners();
      return this.buildUIDone = false;
    },
    destroyUI: function() {
      this.removeAll(true, true);
      return this.buildUIDone = false;
    },
    buildUI: function() {
      var fields, titleBar,
        _this = this;
      if (!this.buildUIDone) {
        this.componentMap = {};
        titleBar = {
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
                    duration: 200
                  });
                  return _this.getPagesUI().setActiveItem(_this.currentIndex() - 1);
                }
              }
            }, {
              iconCls: 'arrow_right',
              cls: 'next',
              iconMask: true,
              align: 'right',
              listeners: {
                tap: function() {
                  _this.getPagesUI().getLayout().setAnimation({
                    type: 'slide',
                    direction: 'left',
                    duration: 200
                  });
                  return _this.getPagesUI().setActiveItem(_this.currentIndex() + 1);
                }
              }
            }
          ]
        };
        fields = {
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
        };
        this.add(titleBar);
        this.add(fields);
        if (this.getLast()) {
          this.add(this.buildSubmitToolbar());
        }
        return this.buildUIDone = true;
      }
    }
  });

}).call(this);
