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
    'app.model.Page'
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

  itemTypeMap: (item)->
    if item.options?
      'app.model.form.Radio'
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

  pagesCount: ->
    @get('pages').getData().length

  createModelClass: ->

    fields = []
    for page in @json.pages
      for item in page.items
        fields.push
          name: item.name
          label: item.label
          type: if item.type? then item.type else 'string'

    class_name = "app.model.FormDefinition.ImplicitModel-#{@getId()}"
    unless Ext.getClass(class_name)?
      Ext.define class_name,
        extend: 'Ext.data.Model'
        config:
          fields: fields

    class_name



  createForm: ->

    record = Ext.create @createModelClass()
    pagesUI = Ext.create 'Ext.form.Panel'
      padding: 0
      title: @get('title')
      layout: 'card'
      scrollable: false


      listeners:
        'change':
          'delegate': 'field'
          fn: (field) =>
            record.set(field.getName(), field.getValue())
        'check':
          'delegate': 'field'
          fn: (field) =>
            record.set(field.getName(), field.getValue())
        'uncheck':
          'delegate': 'field'
          fn: (field) =>
            record.set(field.getName(), field.getValue())

        'initialize': =>
          @

      items: @get('pages').getData().collect (page, index) =>
        panel = Ext.create 'Ext.Panel'
          scrollable: 'vertical'

        panel.add
          xtype: 'titlebar'
          title: page.get('title')
          docked: "top"

          items: [
            iconCls: 'arrow_left'
            iconMask: true
            align: 'left'
            listeners:
              tap: =>
                pagesUI.setActiveItem(index-1)
          ,
            iconCls: 'arrow_right'
            iconMask: true
            align: 'right'
            listeners:
              tap: =>
                pagesUI.setActiveItem(index+1)
          ]

        
        panel.add
          xtype: 'panel'
          items: [
            xtype: 'label'
            html: page.get('help')
            padding: 20
          ,
            xtype: 'panel'
            items: page.get('items').getData().collect (item)=> item.createComponent()
          ]

        if index == @pagesCount() - 1
          panel.add
            xtype: 'titlebar'
            docked: 'bottom'
            title: 'You are done!'
            items: [
              iconCls: 'action'
              iconMask: true
              bubbleEvents: 'submitForm'
              align: 'right'
              text: 'SUBMIT!'
              listeners:
                tap: (me)=>
                  me.fireEvent 'submitForm', record
            ]


        panel

    pagesUI.setActiveItem(0)
    pagesUI.setRecord(record)

