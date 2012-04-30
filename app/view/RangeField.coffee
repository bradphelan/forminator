Ext.define "app.view.RangeField"
  extend: "app.view.FormField"

  updateValue: (value, oldValue)->
    @callParent arguments
    field = @down('sliderfield')
    field.setValue(value - @rangeMin())

  requires: [
    'Ext.field.Slider'
  ]

  createField: ->
    range = @getFactory().get('range')

    field = Ext.create 'Ext.field.Slider'
      name: @getName()
      label: null
      labelWrap: true
      labelAlign: "top"
      minValue: 0
      maxValue: range.max - range.min

    field.on
      change: @doChange
      scope: @

    c = range.labels.length
    p = 1 / (c - 1) * 100
    axes = range.labels.map (label, i)=>

      if i == 0
        "<span class='x-slider-axis-field-label' style=\"left:-5px;%\">#{label}</span>"
      else
        "<span class='x-slider-axis-field-label' style=\"right:#{p*(c - i - 1 )}%\">#{label}</span>"

    axes = axes.join ''

    xtype: 'panel'
    cls: 'x-slider-axis-field'
    items: [
      field
    ,
      xtype: 'panel'
      cls: 'x-slider-axis'
      layout: 'hbox'
      items: [
#         xtype: 'panel'
#         html: "<span>&nbsp;</span>"
#         width: "30%"
#         cls: 'x-slider-axis-label'
#       ,
        xtype: 'panel'
        html: """
        <div class='x-slider-axis-container'>
          <div class='x-slider-axis-inner'>
            #{axes}
            <div class='clearfix'/>
          </div>
        </div>
        """
        flex: 1
      ]
    ]

  rangeMin: ->
    @getFactory().get('range').min

  doChange: (field, e)->
    @setValue(field.getValue()[0] + @rangeMin())
