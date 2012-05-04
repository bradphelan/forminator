Ext.define "app.view.Page"
  extend: "Ext.Panel"

  config:
    scrollable: "vertical"
    last: false
    pagesUI: null
    page: null
    record: null
    padding: 10

  constructor: ->
    @callParent arguments

  areAllItemsOnPageSet: ->
    # TODO
    # Don't check in
    return true

    allSet = true
    for item in @getPage().get('items')
      allSet = false if not item.isSet(@getRecord())
    allSet

  updateComponentVisibilty: (item, animate)->
    component = @componentMap[item.idForComponent()]
    if item.isVisible(@getRecord())
      if animate
        component.show()
      else
        component.setHidden(false)
    else
      if not component.getHidden()
        @getRecord().set(item.get('name'), null)
        if animate
          component.hide()
        else
          component.setHidden(true)

  updateVisibility: ->
    if @buildUIDone
      for item in @getPage().get('items')
        @updateComponentVisibilty(item)


  configureListeners: ->
    @on
      show: (me, opts)=>
        @buildUI()
      hide: (me, opts)=>
        @destroyUI()

    @getRecord().on
      change:
        fn: =>
          @updateVisibility()

  currentIndex: ->
    @getPagesUI().indexOf(@getPagesUI().getActiveItem())

  buildFields: ->
    for item in @getPage().get('items')
      component = item.createComponent(@getRecord())
      component.setShowAnimation "slideIn"
      component.setHideAnimation "fadeOut"
      @componentMap[item.idForComponent()] = component
      @updateComponentVisibilty(item, false)

  buildSubmitToolbar: ->
    xtype: 'titlebar'
    docked: 'bottom'
    title: 'Sie sind fertig'
    items: [
      iconCls: 'action'
      iconMask: true
      bubbleEvents: 'submitForm'
      align: 'right'
      text: 'Legt ihn!'
      listeners:
        tap: (me)=>
          me.fireEvent 'submitForm', @getRecord()
    ]

  initialize: ->
    @configureListeners()
    @buildUIDone = false

  destroyUI:->
    @removeAll(true, true)
    @buildUIDone = false

  buildUI:->

    unless @buildUIDone
      @componentMap = {}
      titleBar =
        xtype: 'titlebar'
        title: @getPage().get('title')
        docked: "top"

        items: [
          iconCls: 'arrow_left'
          cls: 'previous'
          iconMask: true
          align: 'left'
          listeners:
            tap: =>
              @getPagesUI().getLayout().setAnimation
                type: 'slide'
                direction: 'right'
                duration: 200
              @getPagesUI().setActiveItem @currentIndex()-1

        ,
          iconCls: 'arrow_right'
          cls: 'next'
          iconMask: true
          align: 'right'
          listeners:
            tap: =>
              @getPagesUI().getLayout().setAnimation
                type: 'slide'
                direction: 'left'
                duration: 200
              @getPagesUI().setActiveItem(@currentIndex()+1)
        ]

      fields =
        xtype: 'panel'
        items: [
          xtype: 'label'
          html: @getPage().get('help')
          padding: 20
        ,
          xtype: 'panel'
          items: @buildFields()
        ]

      @add titleBar
      @add fields
      @add @buildSubmitToolbar() if @getLast()

      @buildUIDone = true

