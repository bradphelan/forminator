Ext.define 'app.view.ModalFormData'
  extend: 'Ext.Panel'
  xtype: 'modalformdata'
  config:
    record: null
    modal: true
    centered: true
    width: "80%"
    height: "80%"
    layout: 'vbox'

  initialize: ->
    @add [
      xtype: 'panel'
      items: [
        xtype: 'panel'
        data: {
          json: JSON.stringify(@getRecord().getData(), undefined, 2)
        }
        tpl: new Ext.XTemplate """
          <pre><code>
          {json:htmlEncode}
          </code></pre>
          """
        padding: 50
        width: "100%"
        height: "100%"
      ]
      scrollable: "auto"
      flex: 1
    ,
      xtype: 'button'
      text: 'dismiss'
      docked: 'bottom'

    ]
    @addListener
      tap:
        delegate: 'button'
        fn: => @destroy()


