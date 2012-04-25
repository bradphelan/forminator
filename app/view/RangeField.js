(function() {

  Ext.define("app.view.RangeField", {
    extend: "app.view.FormField",
    updateValue: function(value, oldValue) {
      var field;
      this.callParent(arguments);
      field = this.down('sliderfield');
      return field.setValue(value - this.rangeMin());
    },
    requires: ['Ext.field.Slider'],
    createField: function() {
      var axes, c, field, p, range,
        _this = this;
      range = this.getFactory().get('range');
      field = Ext.create('Ext.field.Slider', {
        name: this.getName(),
        label: this.getFactory().createLabel(),
        labelWrap: true,
        minValue: 0,
        maxValue: range.max - range.min
      });
      field.on({
        change: this.doChange,
        scope: this
      });
      c = range.labels.length;
      p = 1 / (c - 1) * 100;
      axes = range.labels.map(function(label, i) {
        return "<span style=\"right:" + (p * (c - i - 1)) + "%\">" + label + "</span>";
      });
      axes = axes.join('');
      return {
        xtype: 'panel',
        items: [
          field, {
            xtype: 'panel',
            cls: 'x-slider-axis',
            layout: 'hbox',
            items: [
              {
                xtype: 'panel',
                html: "<span>&nbsp;</span>",
                width: "30%",
                cls: 'x-slider-axis-label'
              }, {
                xtype: 'panel',
                html: "<div class='x-slider-axis-container'>\n  <div class='x-slider-axis-inner'>\n    " + axes + "\n    <div class='clearfix'/>\n  </div>\n</div>",
                flex: 1
              }
            ]
          }
        ]
      };
    },
    rangeMin: function() {
      return this.getFactory().get('range').min;
    },
    doChange: function(field, e) {
      return this.setValue(field.getValue()[0] + this.rangeMin());
    }
  });

}).call(this);
