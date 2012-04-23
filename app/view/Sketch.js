(function() {
  var Sketch;

  Ext.define("app.view.Canvas", {
    xtype: "canvas",
    extend: "Ext.Panel",
    canvas: function() {
      return this.element.query("canvas")[0];
    },
    config: {
      bubbleEvents: 'canvasResized'
    },
    debounce: function(fn, timeout) {
      var timerId,
        _this = this;
      timerId = null;
      return function() {
        var apply;
        console.log("Nay! " + timerId);
        if (timerId != null) {
          console.log("Clearing " + timerId);
          window.clearTimeout(timerId);
          timerId = null;
        }
        apply = function() {
          console.log("Yay! " + timerId);
          return fn.apply(_this, arguments);
        };
        return timerId = window.setTimeout(apply, timeout);
      };
    },
    doResize: function() {
      var size;
      size = this.element.getSize();
      $(this.canvas()).width(size.width - 10);
      $(this.canvas()).height(size.height - 10);
      return this.fireEvent('canvasResized', size);
    },
    initialize: function() {
      var size;
      this.setHtml("<canvas></canvas>");
      this.addListener({
        resize: this.doResize,
        painted: this.doResize
      });
      size = this.element.getSize();
      $(this.canvas()).width(size.width - 10);
      return $(this.canvas()).height(size.height - 10);
    }
  });

  Ext.define("app.view.Sketch", {
    extend: "Ext.Panel",
    xtype: "sketch",
    config: {
      cls: "sketcher",
      layout: "vbox",
      useToolbar: true,
      items: [
        {
          xtype: "panel",
          cls: "tools",
          html: "<div class='toolbar'></div>",
          align: "left",
          docked: "top"
        }, {
          xtype: "canvas",
          border: "1 1 1 1",
          flex: 1
        }
      ]
    },
    insertTools: function() {
      var color, colors, size, _i, _j, _len, _len1, _ref, _results;
      colors = ["#f00", "#ff0", "#0f0", "#0ff", "#00f", "#f0f", "#000", "#fff"];
      for (_i = 0, _len = colors.length; _i < _len; _i++) {
        color = colors[_i];
        this.jqFind(".tools").append("<a href='#colors_sketch' data-color='" + color + "' style='background: " + color + ";'></a> ");
      }
      _ref = [3, 5, 10, 15];
      _results = [];
      for (_j = 0, _len1 = _ref.length; _j < _len1; _j++) {
        size = _ref[_j];
        _results.push(this.jqFind(".tools").append("<a href='#colors_sketch' data-size='" + size + "' style='background: #ccc'>" + size + "</a> "));
      }
      return _results;
    },
    canvasDOM: function() {
      return this.query("canvas")[0].canvas();
    },
    jqFind: function() {
      var _ref;
      return $((_ref = this.element).query.apply(_ref, arguments));
    },
    resize: function(size) {
      this.sketch.size = size;
      return this.sketch.redraw();
    },
    initialize: function() {
      var canvas,
        _this = this;
      this.callParent();
      canvas = this.canvasDOM();
      this.sketch = new Sketch(canvas);
      $(canvas).data('sketch', this.sketch);
      if (this.getUseToolbar()) {
        this.insertTools();
      }
      return this.addListener({
        canvasResized: function(size) {
          return _this.resize(size);
        }
      });
    }
  });

  Sketch = (function() {

    Sketch.name = 'Sketch';

    function Sketch(el, opts) {
      this.el = el;
      this.canvas = $(el);
      this.context = el.getContext('2d');
      this.options = $.extend({
        toolLinks: true,
        defaultTool: 'marker',
        defaultColor: '#000000',
        defaultSize: 5
      }, opts);
      this.painting = false;
      this.color = this.options.defaultColor;
      this.size = this.options.defaultSize;
      this.tool = this.options.defaultTool;
      this.actions = [];
      this.action = [];
      this.canvas.bind('click mousedown mouseup mousemove mouseleave mouseout touchstart touchmove touchend touchcancel', this.onEvent);
      if (this.options.toolLinks) {
        $('body').delegate("a[href=\"#" + (this.canvas.attr('id')) + "\"]", 'click', function(e) {
          var $canvas, $this, key, sketch, _i, _len, _ref;
          $this = $(this);
          $canvas = $($this.attr('href'));
          sketch = $canvas.data('sketch');
          _ref = ['color', 'size', 'tool'];
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            key = _ref[_i];
            if ($this.attr("data-" + key)) {
              sketch.set(key, $(this).attr("data-" + key));
            }
          }
          if ($(this).attr('data-download')) {
            sketch.download($(this).attr('data-download'));
          }
          return false;
        });
      }
    }

    Sketch.prototype.download = function(format) {
      var mime;
      format || (format = "png");
      if (format === "jpg") {
        format = "jpeg";
      }
      mime = "image/" + format;
      return window.open(this.el.toDataURL(mime));
    };

    Sketch.prototype.set = function(key, value) {
      this[key] = value;
      return this.canvas.trigger("sketch.change" + key, value);
    };

    Sketch.prototype.startPainting = function() {
      this.painting = true;
      return this.action = {
        tool: this.tool,
        color: this.color,
        size: parseFloat(this.size),
        events: []
      };
    };

    Sketch.prototype.stopPainting = function() {
      if (this.action) {
        this.actions.push(this.action);
      }
      this.painting = false;
      this.action = null;
      return this.redraw();
    };

    Sketch.prototype.onEvent = function(e) {
      if (e.originalEvent && e.originalEvent.targetTouches) {
        e.pageX = e.originalEvent.targetTouches[0].pageX;
        e.pageY = e.originalEvent.targetTouches[0].pageY;
      }
      $.sketch.tools[$(this).data('sketch').tool].onEvent.call($(this).data('sketch'), e);
      e.preventDefault();
      return false;
    };

    Sketch.prototype.redraw = function() {
      var sketch;
      this.el.width = this.canvas.width();
      this.el.height = this.canvas.height();
      this.context = this.el.getContext('2d');
      sketch = this;
      $.each(this.actions, function() {
        if (this.tool) {
          return $.sketch.tools[this.tool].draw.call(sketch, this);
        }
      });
      if (this.painting && this.action) {
        return $.sketch.tools[this.action.tool].draw.call(sketch, this.action);
      }
    };

    return Sketch;

  })();

  $.sketch = {
    tools: {}
  };

  $.sketch.tools.marker = {
    onEvent: function(e) {
      switch (e.type) {
        case 'mousedown':
        case 'touchstart':
          this.startPainting();
          break;
        case 'mouseup':
        case 'mouseout':
        case 'mouseleave':
        case 'touchend':
        case 'touchcancel':
          this.stopPainting();
      }
      if (this.painting) {
        this.action.events.push({
          x: e.pageX - this.canvas.offset().left,
          y: e.pageY - this.canvas.offset().top,
          event: e.type
        });
        return this.redraw();
      }
    },
    draw: function(action) {
      var event, previous, _i, _len, _ref;
      this.context.lineJoin = "round";
      this.context.lineCap = "round";
      this.context.beginPath();
      this.context.moveTo(action.events[0].x, action.events[0].y);
      _ref = action.events;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        event = _ref[_i];
        this.context.lineTo(event.x, event.y);
        previous = event;
      }
      this.context.strokeStyle = action.color;
      this.context.lineWidth = action.size;
      return this.context.stroke();
    }
  };

  $.sketch.tools.eraser = {
    onEvent: function(e) {
      return $.sketch.tools.marker.onEvent.call(this, e);
    },
    draw: function(action) {
      var oldcomposite;
      oldcomposite = this.context.globalCompositeOperation;
      this.context.globalCompositeOperation = "copy";
      action.color = "rgba(0,0,0,0)";
      $.sketch.tools.marker.draw.call(this, action);
      return this.context.globalCompositeOperation = oldcomposite;
    }
  };

}).call(this);
