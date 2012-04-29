Ext.define 'app.model.FormDefinition'
  extend: 'Ext.data.Model'

  requires: [
    'Ext.TitleBar'
    'Ext.field.Select'
    'Ext.form.FieldSet'
    'app.model.form.Option'
    'app.model.form.Radio'
    'app.model.form.Select'
    'app.model.form.Text'
    'app.model.form.Field'
    'app.model.form.Sketch'
    'app.model.form.Range'
    'app.model.Page'
    'app.view.Page'
    'app.view.FormPagesLister'
    'Ext.Panel'
    'Ext.form.Panel'
    'Ext.field.Radio'
    'Ext.Label'
    'Ext.data.identifier.Uuid'
  ]

  config:
    identifier: 'uuid'
    fields: [
      name: 'pages'
      type: 'fields'
    ,
      name: 'title'
      type: 'string'
    ,
      name: 'summary'
      type: 'string'
    ]

  # TODO
  # Factor this into factory class
  itemTypeMap: (item)->
    if item.type == "sketch"
      'app.model.form.Sketch'
    else if item.type == 'boolean'
      'app.model.form.Boolean'
    else if item.options?
      'app.model.form.Radio'
    else if item.range?
      'app.model.form.Range'
    else
      'app.model.form.Text'

  constructor: (@json)->
    @callParent()

    if json.constructor is String
      @json = Ext.JSON.decode(json, true)

    # Ensure we can operate on the local 
    # without messing up the source
    json = Ext.clone @json

    @set 'pages', Ext.create 'Ext.data.Store'
        model: 'app.model.Page'
        data: json.pages.map (page)=>
          items = page.items.map (item)=>
            Ext.create @itemTypeMap(item), item

          page.items = Ext.create 'Ext.data.Store'
            data: items
                
          Ext.create 'app.model.Page', page

    @set 'title', json.title
    @set 'summary', json.summary

  createModelClass: ->

    fields = []
    for page in @json.pages
      for item in page.items
        fields.push
          name: item.name
          label: item.label
          type: if item.type? then item.type else 'string'
          defaultValue: item.defaultValue

    class_name = "app.model.FormDefinition.ImplicitModel-#{@getId()}"
    unless Ext.getClass(class_name)?
      Ext.define class_name,
        extend: 'Ext.data.Model'
        config:
          fields: fields
        set: (fieldName, newValue)->
          oldValue = @get(fieldName)
          r = @callParent([fieldName, newValue])
          @fireEvent("change:#{fieldName}", @, fieldName, newValue, oldValue )
          @fireEvent("change", @)
          r

    console.log "#{class_name} as model class"
    
    class_name

  createForm: ->

    record = Ext.create @createModelClass()

    pagesUI = Ext.create 'app.view.FormPagesLister'
      title: @get('title')
      pages: @get('pages')
      record: record

    pagesUI.setActiveItem(0)
    pagesUI.setRecord(record)

