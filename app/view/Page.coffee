Ext.define "app.view.Page"
  extend: "Ext.Panel"

  config:
    scrollable: "vertical"
    last: false
    pagesUI: null
    page: null
    record: null

  areAllItemsOnPageSet: ->
    # TODO
    # Don't check in
    return true

    allSet = true
    @getPage().get('items').getData().each (item)=>
      if @getRecord().get(item.get('name')) == null
        allSet = false
    allSet

  updateState: ->

    if @areAllItemsOnPageSet()
      @down("[iconCls=arrow_right]").setDisabled false

  configureListeners: ->
    @addListener
      'change':
        'delegate': 'field'
        fn: (field) =>
          @getRecord().set(field.getName(), field.getValue())
          @updateState()
      'check':
        'delegate': 'field'
        fn: (field) =>
          @getRecord().set(field.getName(), field.getValue())
          @updateState()
      'uncheck':
        'delegate': 'field'
        fn: (field) =>
          @getRecord().set(field.getName(), field.getValue())
          @updateState()

  currentIndex: ->
    @getPagesUI().indexOf(@getPagesUI().getActiveItem())

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
            @getPagesUI().setActiveItem(@currentIndex()-1)
      ,
        iconCls: 'arrow_right'
        cls: 'next'
        iconMask: true
        align: 'right'
        disabled: true
        listeners:
          tap: =>
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
        items: @getPage().get('items').getData().collect (item)=> item.createComponent()
      ]

    if @getLast()
      @add
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

    @configureListeners()
    @updateState()
