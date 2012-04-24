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
        if (timerId != null) {
          window.clearTimeout(timerId);
          timerId = null;
        }
        apply = function() {
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
    fixCanvasLag: function() {
      return $(this.canvas()).attr("unselectable", "on").css({
        "-moz-user-select": "none",
        "-webkit-user-select": "none",
        "user-select": "none",
        "::selection": "none"
      }).each(function() {
        return this.onselectstart = function() {
          return false;
        };
      });
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
      $(this.canvas()).height(size.height - 10);
      return this.fixCanvasLag();
    }
  });

  Ext.define("app.view.Sketch", {
    extend: "Ext.Panel",
    xtype: "sketch",
    config: {
      cls: "sketcher",
      layout: "vbox",
      useToolbar: true,
      bubbleEvents: ['change'],
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
    pngData: function() {
      return this.sketch.el.toDataURL("png");
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
      this.sketch = new Sketch(canvas, {
        toolLinks: false,
        defaultSize: "10"
      });
      $(canvas).data('sketch', this.sketch);
      if (this.getUseToolbar()) {
        this.insertTools();
      }
      this.addListener({
        canvasResized: function(size) {
          return _this.resize(size);
        }
      });
      return this.sketch.canvas.bind('sketch.change', function(actions) {
        return _this.fireEvent("change", actions);
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
      this.toolSize = this.options.defaultSize;
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
        size: parseFloat(this.toolSize),
        events: []
      };
    };

    Sketch.prototype.stopPainting = function() {
      if (this.action) {
        this.actions.push(this.action);
      }
      this.painting = false;
      this.action = null;
      this.redraw();
      return this.canvas.trigger("sketch.change", this.actions);
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
      var action, sketch, tools, _i, _len, _ref;
      this.el.width = this.canvas.width();
      this.el.height = this.canvas.height();
      this.context = this.el.getContext('2d');
      sketch = this;
      tools = $.sketch.tools;
      _ref = this.actions;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        action = _ref[_i];
        if (action.tool) {
          tools[action.tool].draw.call(sketch, action);
        }
      }
      if (this.painting && this.action) {
        return tools[this.action.tool].draw.call(sketch, this.action);
      }
    };

    return Sketch;

  })();

  $.sketch = {
    tools: {}
  };

  $.sketch.tools.marker = {
    onEvent: function(e) {
      var apply,
        _this = this;
      switch (e.type) {
        case 'mousedown':
        case 'touchstart':
          return this.startPainting();
        case 'mouseup':
        case 'mouseout':
        case 'mouseleave':
        case 'touchend':
        case 'touchcancel':
          return this.stopPainting();
        case 'mousemove':
          if (!this.doMouseMove) {
            apply = function(e) {
              var event, offset;
              offset = _this.canvas.offset();
              event = {
                x: e.pageX - offset.left,
                y: e.pageY - offset.top,
                event: e.type
              };
              _this.action.events.push(event);
              return _this.redraw();
            };
            this.doMouseMove = Ext.Function.createThrottled(apply, 1000 / 25);
          }
          if (this.painting) {
            return this.doMouseMove(e);
          }
      }
    },
    draw: function(action) {
      var ctxt, cx, cy, ei, i, p, pts, _i;
      ctxt = this.context;
      ctxt.lineJoin = "round";
      ctxt.lineCap = "round";
      ctxt.beginPath();
      ctxt.strokeStyle = action.color;
      ctxt.lineWidth = action.size;
      pts = action.events;
      if (!(pts.length >= 3)) {
        return;
      }
      p = pts[0];
      ctxt.moveTo(p.x, p.y);
      ei = pts.length - 2;
      ctxt.moveTo(pts[0].x, pts[0].y);
      for (i = _i = 1; 1 <= ei ? _i <= ei : _i >= ei; i = 1 <= ei ? ++_i : --_i) {
        cx = (pts[i].x + pts[i + 1].x) / 2;
        cy = (pts[i].y + pts[i + 1].y) / 2;
        ctxt.quadraticCurveTo(pts[i].x, pts[i].y, cx, cy);
      }
      ctxt.quadraticCurveTo(pts[i - 1].x, pts[i - 1].y, pts[i].x, pts[i].y);
      return ctxt.stroke();
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
