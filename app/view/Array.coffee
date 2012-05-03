Ext.define "app.view.Array"
  extend: "app.view.FormField"
  config:
    fields: []
    width: "100%"
    count: 0
    min: 1
    max: 1

  itemTypeMap: (item)->
    switch item.type
      when 'password'       then 'passwordfield'
      when 'email'          then 'emailfield'
      when 'date'           then 'datepickerfield'
      when 'url'            then 'urlfield'
      when 'integer', 'int' then 'numberfield'
      when 'float'          then 'numberfield'
      when 'boolean'        then 'checkboxfield'
      else
        'textfield'

  flexTypeMap: (item)->
    item.flex || 1

  # given a row object find it's index
  # in the collection
  indexOfRow: (row)->
    # -1 because there is a header object
    @panel.items.indexOf(row) - 1

  # Delete a row and the data backing it
  deleteRow: (row)->
    index = @indexOfRow(row)
    v = @getArray()

    v[index..index] = []
    @panel.remove(row)

    if v.length == 0
      @createRow()

  # Get the backing array
  getArray: ->
    v = @getRecord().get(@getName())
    unless v?
      v = []
      @getRecord().set(@getName(), v)
    v

  # Change event handler on cells
  doChange: (row, field, newValue, oldValue)->
    index = @indexOfRow(row)

    v = @getArray()

    (v[index] ||= {})[field.name] = newValue

    if @rowCount == v.length and @rowCount < @getMax()
      @createRow()

  # handle default values for different
  # types
  defaultValueMap: (f)->
    if f.defaultValue
      f.defaultValue
    else
      switch f.type
        when 'boolean'
          false
        when 'int', 'integer', 'float'
          0
        else
          ""

  # Append a new row with default data 
  # to the end of the UI list
  createRow: ->
    row = Ext.create 'Ext.Panel'
      layout: 'hbox'

    i = @rowCount
    @rowCount++

    data = {}
    @getArray().push data

    @panel.add row
    @getFields().map (f)=>

      data[f.name] = f.defaultValue || null

      row.add
        xtype: @itemTypeMap(f)
        label: null
        margin: 1
        value: @defaultValueMap(f)
        flex: @flexTypeMap(f)
        # Abstract all possible change events to a consistent
        # interface
        listeners:
          change: (field, newValue, oldValue, e)=>
              @doChange(row, f, newValue, oldValue)
          check: (field, e)=>
              @doChange(row, f, true, false)
          uncheck: (field, e)=>
              @doChange(row, f, false, true)



    row.add
      xtype: 'button'
      iconCls: 'delete'
      docked: "right"
      iconMask: true
      listeners:
        tap: (button, e)=> @deleteRow(row)

  createField: ->
    @panel = Ext.create 'Ext.Panel'

    header = Ext.create 'Ext.Panel'
      layout: 'hbox'

    @panel.add header
    @rowCount = 0

    @getFields().map (f)=>
      header.add
        xtype: 'label'
        html: f.label || f.name
        cls: 'x-table-title'
        flex: @flexTypeMap(f)
        align: "left"

    header.add
      xtype: 'button'
      iconCls: 'delete'
      docked: "right"
      iconMask: true
      disabled: true
    
    for i in [0..@getMin()-1]
      @createRow()

    @panel
