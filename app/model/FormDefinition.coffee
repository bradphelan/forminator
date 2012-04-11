Ext.define 'app.model.FormDefinition'
  extend: 'Ext.data.Model'

  requires: [
    'Ext.TitleBar'
    'Ext.field.Select'
    'Ext.form.FieldSet'
    'app.model.form.Option'
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
    ]

  itemTypeMap: (xtype)->
    switch (xtype)
      when 'option'
        'app.model.form.Option'
      else
        raise "Argggh!"

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
            Ext.create @itemTypeMap(item.xtype), item

          page.items = Ext.create 'Ext.data.Store'
            data: items
                
          Ext.create 'app.model.Page', page

    @set 'title', json.title

  pagesCount: ->
    @get('pages').getData().length

  createModelClass: ->

    fields = []
    for page in @json.pages
      for item in page.items
        fields.push
          name: item.name
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
      listeners:
        'change':
          'delegate': 'field'
          fn: (field) =>
            console.log "Updating #{field.getName()}"
            record.set(field.getName(), field.getValue())
        'check':
          'delegate': 'field'
          fn: (field) =>
            console.log "Updating #{field.getName()}"
            record.set(field.getName(), field.getValue())
        'uncheck':
          'delegate': 'field'
          fn: (field) =>
            console.log "Updating #{field.getName()}"
            record.set(field.getName(), field.getValue())

        'initialize': =>
          console.log "initialized"
          @

      items: @get('pages').getData().collect (page, index) =>
        panel = Ext.create 'Ext.Panel'
          layout: 'vbox'

        panel.add
          xtype: 'titlebar'
          title: page.get('title')

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
          xtype: 'label'
          html: page.get('help')
          padding: 20

        # Add the fieldset
        panel.add
          xtype: 'fieldset'
          layout: 'vbox'
          centered: true
          width: "75%"
          items: page.get('items').getData().collect (item)=>
            item.createField()

        if index == @pagesCount() - 1
          panel.add
            xtype: 'titlebar'
            docked: 'bottom'
            title: 'You are done!'
            items: [
              iconCls: 'action'
              iconMask: true
              align: 'right'
              text: 'SUBMIT!'
              listeners:
                tap: =>
                  console.log pagesUI.getRecord()
                  console.log pagesUI.getRecord().getData(true)
                  console.log pagesUI.getValues()
                  app.view.MainNavigation.pop()
            ]


        panel

    pagesUI.setActiveItem(0)
    pagesUI.setRecord(record)

