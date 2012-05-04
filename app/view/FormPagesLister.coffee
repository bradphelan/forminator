Ext.define "app.view.FormPagesLister"
  extend: "Ext.Panel"

  config:
    pages: null
    record: null
    layout: 'vbox'

  pagesCount: ->
    @getPages().getData().length

  initialize: ->

    card = Ext.create 'Ext.Panel'
      padding: 0
      layout:
        type: 'card'
#         animation:
#           type: 'slide'
#           direction: 'down'
      scrollable: false
      flex: 1
      pages: @getPages()
      record: @getRecord()

    card.add @getPages().getData().collect (page, index) =>
      Ext.create 'app.view.Page'
        last: index == @pagesCount() - 1
        pagesUI: card
        page: page
        record: @getRecord()

    # Setup the build and destroy hooks
    # to manage the page lifecycles
    card.on
      show:
        delegate: 'page'
        fn: (page)->
          page.buildUI()
      hide:
        delegate: 'page'
        fn: (page)->
          page.destroyUI()
      

    list = Ext.create 'Ext.List'
      store: @getPages()
      itemTpl: "{title}"
      scrollable: true
      cls: "x-question-list"
      flex: 1
      mode: "SINGLE"
      listeners:
#         itemtap: (view, index)=>
#             currentIndex = card.items.indexOf(card.getActiveItem())
#             card.getLayout().setAnimation
#               type: 'slide'
#               direction: if index > currentIndex then 'left' else 'right'
#               duration: 200
#               easing: 'ease-in'
#             card.setActiveItem index
        selectionchange: (list, records, opts)=>
          console.log records[0].$className
          index = @getPages().indexOf(records[0])
          card.setActiveItem index

    card.on
      activeitemchange: (card, item, oldIndex)=>
        index = card.items.indexOf(item)
        list.select(index, false, true)

        # Get the selected item. Seems
        # a bit ugly but it works
        cls = list.getSelectedCls()
        selectedElement = list.element.down("." + cls)
        selectedHeight = selectedElement.getHeight()

        if selectedElement
          # Height of the full list
          fullListHeight = list.element.down(".x-list-container").getHeight()

          # Height of the scroll window
          scrollWindowHeight = list.element.getHeight()

          yTop = selectedElement.dom.offsetTop
          yBottom = yTop + selectedHeight
          
          scroller = list.getScrollable().getScroller()

          # Outside this zone a scrollTo will be triggered
          triggerZone =
            min: scroller.position.y + selectedHeight
            max: scroller.position.y + scrollWindowHeight - selectedHeight

          # Conditions for items above the current scroll
          # position
          if yTop < triggerZone.min
            pos = yTop - selectedHeight

          # Conditions for items below the current scroll
          # position
          if yBottom > triggerZone.max
            pos = yTop + 2*selectedHeight - scrollWindowHeight

          # Adjust for the edge cases where the item
          # to scroll is at the top or bottom of the
          # list so we don't get nasty jumping effects
          if pos?
            pos = Math.max(0, pos)
            pos = Math.min(pos, fullListHeight - scrollWindowHeight)
            scroller.scrollTo(0,pos,true)


    @add [
      xtype: 'panel'
      width: 250
      docked: 'left'
      layout: 'vbox'
      items: [
        xtype: 'titlebar'
        title: 'Seiten'
      ,
        list
      ]
    ,
      card
    ]

    list.select(0)
