Ext.define 'app.model.form.Text'
  extend: 'app.model.form.Field'

  requires: [
    'app.view.TextField'
  ]
  config:
    componentClass: 'app.view.TextField'
