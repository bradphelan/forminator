Ext.define 'app.model.form.Field'
  extend: 'Ext.data.Model'
  config:
    fields: [
      name: 'name'
      type: 'string'
    ,
      name: 'type'
      type: 'string'
      defaultValue: 'string'
    ,
      name: 'label'
      type: 'string'
      defaultValue: null
    ]

  createLabel: ->
    l = if @get('label')?
      @get('label')
    else
      @get('name')
       
    l = """
    <span style="white-space: normal !important">
      #{l}
    </span>
    """

  createField: ->
    throw "Abstract class"
