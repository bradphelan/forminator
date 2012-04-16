Ext.define 'app.model.CoreExtensions',
  singleton: true

  constructor: ->
    @callParent(arguments)

    # Create a 'collect' method on the collection
    # of elements in the collection
    # @return array of transformed elements
    Ext.define  'Ext.util.CollectionExtensions'
      override: 'Ext.util.Collection'
      collect: (fn, scope) ->
        array = []
        cb = (elem, idx, len) =>
          array.push fn(elem, idx, len)
        @each cb, scope
        array

    # Create an autowire for events on
    # views for simple proxying of events
    Ext.define  'Ext.PanelExtensions',
      override: 'Ext.Container'

      autowire: (events)->
        for event in events
          h = {}
          m = "do#{Ext.String.capitalize event}"
          h[event]= do (m)=>
            => @[m](arguments...)
          @addListener h


app.model.CoreExtensions
