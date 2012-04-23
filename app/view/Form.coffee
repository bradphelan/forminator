Ext.define "app.view.Form"
  xtype:  "medformpanel"
  extend: "Ext.Panel"

  config:
    padding: 0
    layout:
      type: 'card'
      animation:
        type: 'slide'
        direction: 'down'
    scrollable: false
    pages: null
    record: null


  pagesCount: ->
    @getPages().getData().length

  initialize: ->
    @add @getPages().getData().collect (page, index) =>
      Ext.create 'app.view.Page'
        last: index == @pagesCount() - 1
        scrollable: 'vertical'
        pagesUI: @
        page: page
        record: @getRecord()
