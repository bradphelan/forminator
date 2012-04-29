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

  updateVisibility: ->
    @getPage().get('items').getData().each (item)=>
      visible = item.isVisible(@getRecord())

      item.findComponent(@).setShowAnimation "slideIn"
      item.findComponent(@).setHideAnimation "fadeOut"
      if visible
        item.findComponent(@).show()
      else
        component = item.findComponent(@)
        if not component.getHidden()
          @getRecord().set(item.get('name'), null)
          component.hide()


  updateState: ->
    if @areAllItemsOnPageSet()
      @down("[iconCls=arrow_right]").setDisabled false
    @updateVisibility()


  configureListeners: ->

    # We use a single shot here 
    # and rebind it after the handler
    # has finished. This stop recursive
    # event updates from occuring. 
    #
    # TODO extract into a pattern
    @getRecord().on
      change:
        fn: =>
          @updateState()
          @configureListeners()
        single: true

  currentIndex: ->
    @getPagesUI().indexOf(@getPagesUI().getActiveItem())

  buildFields: ->
    @getPage().get('items').getData().collect (item)=>
      item.createComponent(@getRecord())

  buildSubmitToolbar: ->
    xtype: 'titlebar'
    docked: 'bottom'
    title: 'You are done!'
    items: [
      iconCls: 'action'
      iconMask: true
      bubbleEvents: 'submitForm'
      align: 'right'
      text: 'SUBMIT!'
      listeners:
        tap: (me)=>
          me.fireEvent 'submitForm', @getRecord()
    ]

  initialize: ->

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
              duration: 500
              easing: 'ease-in'
            @getPagesUI().setActiveItem @currentIndex()-1

      ,
        iconCls: 'arrow_right'
        cls: 'next'
        iconMask: true
        align: 'right'
        disabled: true
        listeners:
          tap: =>
            @getPagesUI().getLayout().setAnimation
              type: 'slide'
              direction: 'left'
              duration: 500
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

    @configureListeners()
    @updateState()
