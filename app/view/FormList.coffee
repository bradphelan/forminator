Ext.define  'app.view.FormList'
  extend: 'Ext.List'
  requires: [
    'app.model.SampleForms'
  ]

  xtype: 'formlist'
  config:
    flex: 1
    itemTpl: '{title}'
    bubbleEvents: 'selectForm'

  initialize: ->
    @callParent(arguments)
    @setStore Ext.create('app.model.SampleForms')
    @addListener
      itemtap: (list, index, item, record, e, opts) =>
        list.fireEvent 'selectForm', record
      tap:=>
        alert('foo')
