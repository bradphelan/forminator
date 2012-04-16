
Ext.define 'app.model.SampleForms'
  extend: 'Ext.data.Store'

  requires: [
    'app.model.FormDefinition'
    'Ext.data.Store'
  ]

  proxy:
    type: 'ajax'
    url: "/forms.json"

  autoLoad: true

  config:
    model: 'app.model.FormDefinition'

  

