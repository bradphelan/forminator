Ext.define "app.view.Page"
  extend: "Ext.Panel"

  config:
    scrollable: "vertical"
    last: false
    pagesUI: null
    page: null
    record: null
    padding: 10

  areAllItemsOnPageSet: ->
    # TODO
    # Don't check in
    return true

    allSet = true
    @getPage().get('items').getData().each (item)=>
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
      @getPage().get('items').getData().each (item)=>
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
    @getPage().get('items').getData().collect (item)=>
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
      @add
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
                easing: 'ease-in'
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
                easing: 'ease-in'
              @getPagesUI().setActiveItem(@currentIndex()+1)
        ]

      @add
        xtype: 'panel'
        items: [
          xtype: 'label'
          html: @getPage().get('help')
          padding: 20
        ,
          xtype: 'panel'
          items: @buildFields()
        ]

      @add @buildSubmitToolbar() if @getLast()

      @buildUIDone = true

