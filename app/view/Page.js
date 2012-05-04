(function() {

  Ext.define("app.view.Page", {
    extend: "Ext.Panel",
    xtype: 'page',
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
        return component.show(animate);
      } else {
        this.getRecord().set(item.get('name'), null);
        return component.hide(animate);
      }
    },
    updateVisibility: function() {
      var item, _i, _len, _ref, _results;
      if (this.buildUIDone) {
        _ref = this.getPage().get('items');
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          item = _ref[_i];
          _results.push(this.updateComponentVisibilty(item, true));
        }
        return _results;
      }
    },
    configureListeners: function() {
      var _this = this;
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
        component.setShowAnimation("fadeIn");
        component.setHideAnimation("fadeOut");
        this.componentMap[item.idForComponent()] = component;
        _results.push(component.setHidden(!item.isVisible(this.getRecord())));
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
      var items, panel,
        _this = this;
      panel = this;
      if (!this.buildUIDone) {
        this.componentMap = {};
        this.titleBar = {
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
              listeners: {
                tap: function() {
                  return _this.getPagesUI().setActiveItem(_this.currentIndex() + 1);
                }
              }
            }
          ]
        };
        this.fields = {
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
        items = [this.titleBar, this.fields];
        if (this.getLast()) {
          items.push(this.buildSubmitToolbar());
        }
        panel.add(items);
        return this.buildUIDone = true;
      }
    }
  });

}).call(this);
