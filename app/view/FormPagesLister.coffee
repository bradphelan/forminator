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
        

    list.select(0)

    @add
      xtype: 'panel'
      width: 200
      docked: 'left'
      layout: 'vbox'
      items: [
        xtype: 'titlebar'
        title: 'Questions'
      ,
        list
      ]

    @add card
