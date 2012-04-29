Ext.define "app.model.form.Boolean"
  extend: 'app.model.form.Field'

  requires: [
    'app.view.BooleanField'
  ]

  config:
    componentClass: 'app.view.BooleanField'


