Ext.define "app.view.FormPagesLister"
  extend: "Ext.Panel"

  config:
    pages: null
    record: null
    layout: 'vbox'

  pagesCount: ->
    @getPages().getData().length

  initialize: ->
    @callParent()


    card = Ext.create 'Ext.Panel'
      padding: 0
      layout:
        type: 'card'
        animation:
          type: 'slide'
          direction: 'down'
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

    list = Ext.create 'Ext.List'
      store: @getPages()
      itemTpl: "{title}"
      scrollable: true
      cls: "x-question-list"
      flex: 1
      listeners:
        itemtap: (view, index)=>
            currentIndex = card.items.indexOf(card.getActiveItem())
            card.getLayout().setAnimation
              type: 'slide'
              direction: if index > currentIndex then 'left' else 'right'
              duration: 500
              easing: 'ease-in'
            card.setActiveItem index

    card.on
      activeitemchange: (card, item, oldIndex)=>
        index = card.items.indexOf(item)
        list.select(index)

        el = list.element
        cls = list.getSelectedCls()
        selected = el.down("." + cls)

        if selected
          innerHeight = list.element.down(".x-list-container").getHeight()
          height = list.element.getHeight()
          y = selected.dom.offsetTop
          scroller = list.getScrollable().getScroller()

          # We only want to trigger scrolls when we trigger
          # at the top and bottom of the list
          delta = height / 5

          triggerZone =
            min: scroller.position.y + delta
            max: scroller.position.y + height - delta

          unless y > triggerZone.min and y < triggerZone.max

            pos = y - height / 2
            pos = Math.max(0, pos)
            pos = Math.min(pos, innerHeight - height)
            
            scroller.scrollTo(0,pos,true)

        

    list.select(0)

    @add
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

    @add card
