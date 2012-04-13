Ext.define 'app.view.ModalFormData'
  extend: 'Ext.Panel'
  xtype: 'modalformdata'
  config:
    modal: true
    centered: true

  constructor: (config)->
    @record = config.record
    @callParent(config)

  initialize: ->
    @add [
      data: {
        json: JSON.stringify(@record.getData(), undefined, 2)
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


