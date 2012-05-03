Ext.define "app.model.form.Array"
  extend: "app.model.form.Field"
  config:
    componentClass: 'app.view.Array'
    fields : [
      name: 'fields'
      type: 'array'
    ,
      name: 'min'
      type: 'integer'
      defaultValue: 0
    ,
      name: 'max'
      type: 'integer'
      defaultValue: 0
    ]

  requires: [
    'app.view.Array'
  ]
