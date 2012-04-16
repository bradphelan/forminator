Ext.define 'app.view.ModalFormData'
  extend: 'Ext.Panel'
  xtype: 'modalformdata'
  config:
    record: null
    modal: true
    centered: true

  initialize: ->
    @add [
      data: {
        json: JSON.stringify(@getRecord().getData(), undefined, 2)
      }
      tpl: new Ext.XTemplate """
        <pre><code>
        {json:htmlEncode}
        </code></pre>
        """
      padding: 50
    ,
      xtype: 'button'
      text: 'dismiss'
      docked: 'bottom'
    ]
    @addListener
      tap:
        delegate: 'button'
        fn: => @destroy()


