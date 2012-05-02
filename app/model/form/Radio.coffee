Ext.define 'app.model.form.Radio'
  extend: 'app.model.form.Option'

  requires: [
    'app.view.RadioField'
  ]

  config:
    componentClass: 'app.view.RadioField'
    fields: [
      name: "labelWidth"
      type: "string"
      defaultValue: "90%"
    ]
