# # Sketch.js (v0.0.1)
#
# **Sketch.js** is a simple jQuery plugin for creating drawable canvases
# using HTML5 Canvas. It supports multiple browsers including mobile 
# devices (albeit with performance penalties).
Ext.define "app.view.Canvas"
  xtype: "canvas"
  extend: "Ext.Panel"
  canvas: ->
    @element.query("canvas")[0]

  config:
    bubbleEvents: 'canvasResized'

  debounce: (fn, timeout)->
    timerId = null
    =>
      if timerId?
        
        window.clearTimeout timerId
        timerId = null

      apply = =>
        fn.apply(@, arguments)

      timerId = window.setTimeout apply, timeout

  doResize: ->
    size = @element.getSize()
    $(@canvas()).width(size.width-10)
    $(@canvas()).height(size.height-10)
    @fireEvent 'canvasResized', size
    
  initialize: ->
    @setHtml """
      <canvas></canvas>
      """
    @addListener
      resize: @doResize
      painted: @doResize

    size = @element.getSize()
    $(@canvas()).width(size.width-10)
    $(@canvas()).height(size.height-10)

Ext.define "app.view.Sketch"
  extend: "Ext.Panel"
  xtype: "sketch"
  config:
    cls: "sketcher"
    layout: "vbox"
    useToolbar: true
    bubbleEvents: [
      'change'
    ]

    items: [
      xtype: "panel"
      cls: "tools"
      html: "<div class='toolbar'></div>"
      align: "left"
      docked: "top"
    ,
      xtype: "canvas"
      border: "1 1 1 1"
      flex: 1
    ]

  insertTools: ->
    colors = [ "#f00", "#ff0", "#0f0", "#0ff", "#00f", "#f0f", "#000", "#fff" ]
    for color in colors
      @jqFind(".tools").append "<a href='#colors_sketch' data-color='#{color}' style='background: #{color};'></a> "

    for size in [ 3, 5, 10, 15 ]
      @jqFind(".tools").append "<a href='#colors_sketch' data-size='#{size}' style='background: #ccc'>#{size}</a> "

  canvasDOM: ->
    @query("canvas")[0].canvas()

  jqFind: ->
    $(@element.query(arguments...))

  pngData: ->
    @sketch.el.toDataURL("png")

  resize: (size)->
    @sketch.size = size
    @sketch.redraw()

  initialize: ->
    @callParent()
    canvas = @canvasDOM()
    @sketch = new Sketch(canvas)
    $(canvas).data('sketch', @sketch)
    if @getUseToolbar()
      @insertTools()
    @addListener
      canvasResized: (size)=>
        @resize(size)
    @sketch.canvas.bind 'sketch.change', (actions)=>
      @fireEvent "change", actions
        
        

    
# ## Sketch
#
# The Sketch class represents an activated drawing canvas. It holds the
# state, all relevant data, and all methods related to the plugin.
class Sketch
  # ### new Sketch(el, opts)
  #
  # Initialize the Sketch class with a canvas DOM element and any specified
  # options. The available options are:
  #
  # * `toolLinks`: If `true`, automatically turn links with href of `#mycanvas`
  #   into tool action links. See below for a description of the available
  #   tool links.
  # * `defaultTool`: Defaults to `marker`, the tool is any of the extensible 
  #   tools that the canvas should default to.
  # * `defaultColor`: The default drawing color. Defaults to black.
  # * `defaultSize`: The default stroke size. Defaults to 5.
  constructor: (el, opts)->
    @el = el
    @canvas = $(el)
    @context = el.getContext '2d'
    @options = $.extend {
      toolLinks: true
      defaultTool: 'marker'
      defaultColor: '#000000'
      defaultSize: 5
    }, opts
    @painting = false
    @color = @options.defaultColor
    @size = @options.defaultSize
    @tool = @options.defaultTool
    @actions = []
    @action = []

    @canvas.bind 'click mousedown mouseup mousemove mouseleave mouseout touchstart touchmove touchend touchcancel', @onEvent

    # ### Tool Links
    #
    # Tool links automatically bind `a` tags that have an `href` attribute
    # of `#mycanvas` (mycanvas being the ID of your `<canvas>` element to
    # perform actions on the canvas.
    if @options.toolLinks
      $('body').delegate "a[href=\"##{@canvas.attr('id')}\"]", 'click', (e)->
        $this = $(this)
        $canvas = $($this.attr('href'))
        sketch = $canvas.data('sketch')
        # Tool links are keyed off of HTML5 `data` attributes. The following
        # attributes are supported:
        #
        # * `data-tool`: Change the current tool to the specified value.
        # * `data-color`: Change the draw color to the specified value.
        # * `data-size`: Change the stroke size to the specified value.
        # * `data-download`: Trigger a sketch download in the specified format.
        for key in ['color', 'size', 'tool']
          if $this.attr("data-#{key}")
            sketch.set key, $(this).attr("data-#{key}")
        if $(this).attr('data-download')
          sketch.download $(this).attr('data-download')
        false

  # ### sketch.download(format)
  #
  # Cause the browser to open up a new window with the Data URL of the current
  # canvas. The `format` parameter can be either `png` or `jpeg`.
  download: (format)->
    format or= "png"
    format = "jpeg" if format == "jpg"
    mime = "image/#{format}"

    window.open @el.toDataURL(mime)

  # ### sketch.set(key, value)
  #
  # *Internal method.* Sets an arbitrary instance variable on the Sketch instance
  # and triggers a `changevalue` event so that any appropriate bindings can take
  # place.
  set: (key, value)->
    this[key] = value
    @canvas.trigger("sketch.change#{key}", value)

  # ### sketch.startPainting()
  #
  # *Internal method.* Called when a mouse or touch event is triggered 
  # that begins a paint stroke. 
  startPainting: ->
    @painting = true
    @action = {
      tool: @tool
      color: @color
      size: parseFloat(@size)
      events: []
    }

  # ### sketch.stopPainting()
  #
  # *Internal method.* Called when the mouse is released or leaves the canvas.
  stopPainting: ->
    @actions.push @action if @action
    @painting = false
    @action = null
    @redraw()
    @canvas.trigger("sketch.change", @actions)
    
  
  # ### sketch.onEvent(e)
  #
  # *Internal method.* Universal event handler for the canvas. Any mouse or 
  # touch related events are passed through this handler before being passed
  # on to the individual tools.
  onEvent: (e)->
    if e.originalEvent && e.originalEvent.targetTouches
      e.pageX = e.originalEvent.targetTouches[0].pageX
      e.pageY = e.originalEvent.targetTouches[0].pageY
    $.sketch.tools[$(this).data('sketch').tool].onEvent.call($(this).data('sketch'), e)
    e.preventDefault()
    false

  # ### sketch.redraw()
  #
  # *Internal method.* Redraw the sketchpad from scratch using the aggregated
  # actions that have been stored as well as the action in progress if it has
  # something renderable.
  redraw: ->
    @el.width = @canvas.width()
    @el.height= @canvas.height()
    @context = @el.getContext '2d'
    sketch = this
    $.each @actions, ->
      if this.tool
        $.sketch.tools[this.tool].draw.call sketch, this
    $.sketch.tools[@action.tool].draw.call sketch, @action if @painting && @action

# # Tools
#
# Sketch.js is built with a pluggable, extensible tool foundation. Each tool works
# by accepting and manipulating events registered on the sketch using an `onEvent`
# method and then building up **actions** that, when passed to the `draw` method,
# will render the tool's effect to the canvas. The tool methods are executed with
# the Sketch instance as `this`.
#
# Tools can be added simply by adding a new key to the `$.sketch.tools` object.
$.sketch = { tools: {} }

# ## marker
#
# The marker is the most basic drawing tool. It will draw a stroke of the current
# width and current color wherever the user drags his or her mouse.
$.sketch.tools.marker =
  onEvent: (e)->
    switch e.type
      when 'mousedown', 'touchstart'
        @startPainting()
      when 'mouseup', 'mouseout', 'mouseleave', 'touchend', 'touchcancel'
        @stopPainting()

    if @painting
      @action.events.push
        x: e.pageX - @canvas.offset().left
        y: e.pageY - @canvas.offset().top
        event: e.type

      @redraw()

  draw: (action)->
    @context.lineJoin = "round"
    @context.lineCap = "round"
    @context.beginPath()
    
    @context.moveTo action.events[0].x, action.events[0].y
    for event in action.events
      @context.lineTo event.x, event.y

      previous = event
    @context.strokeStyle = action.color
    @context.lineWidth = action.size
    @context.stroke()

# ## eraser
#
# The eraser does just what you'd expect: removes any of the existing sketch.
$.sketch.tools.eraser =
  onEvent: (e)->
    $.sketch.tools.marker.onEvent.call this, e
  draw: (action)->
    oldcomposite = @context.globalCompositeOperation
    @context.globalCompositeOperation = "copy"
    action.color = "rgba(0,0,0,0)"
    $.sketch.tools.marker.draw.call this, action
    @context.globalCompositeOperation = oldcomposite
