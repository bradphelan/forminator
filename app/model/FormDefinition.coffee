Ext.define 'app.model.FormDefinition'
  extend: 'Ext.data.Model'

  requires: [
    'Ext.TitleBar'
    'Ext.field.Select'
    'Ext.form.FieldSet'
  ]

  config:
    fields: [
      name: 'pages'
      type: 'array'
    ]

  itemTypeMap: (xtype)->
    switch (xtype)
      when 'option'
        'app.model.form.Option'
      else
        raise "Argggh!"

  constructor: (json)->
    @callParent()
    if json.constructor is String
      json = Ext.JSON.decode(json, true)
    @set 'pages', Ext.create 'Ext.data.Store'
        model: 'app.model.Page'
        data: json.pages.map (page)=>
          items = page.items.map (item)=>
            Ext.create @itemTypeMap(item.xtype), item

          page.items = Ext.create 'Ext.data.Store'
            data: items
                
          Ext.create 'app.model.Page', page

  pagesCount: ->
    @get('pages').getData().length

  createForm: ->
    pagesUI = Ext.create 'Ext.form.Panel'
      padding: 0
      layout: 'card'
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

        # Add the fieldset
        panel.add
          xtype: 'fieldset'
          layout: 'vbox'
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
                  console.log pagesUI.getValues()
            ]


        panel

    pagesUI.setActiveItem(0)

