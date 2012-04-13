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
    listeners:
      initialize: (me, opts)=>
        me.setStore Ext.create('app.model.SampleForms')
      itemtap: (list, index, item, record, e, opts) =>
        list.fireEvent 'selectForm', record
