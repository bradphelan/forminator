json =
  pages: [
    title: "Page 0"
    items: [
      xtype: "option"
      options: [
        name: "bad"
        value: 0
      ,
        name: "good"
        value: 1
      ,
        name: "excelent"
        value: 2
      ]
    ]
  ,
    title: "Page 1"
    items: [
      xtype: "option"
      options: [
        name: "ugly"
        value: 0
      ,
        name: "pretty"
        value: 1
      ]
    ]

  ]

json = Ext.JSON.encode(json)
 
Ext.define 'Loader',
  requires: [
    'app.model.FormParser'
    'app.model.Page'
  ]

describe "Parsing the JSON", =>
  it "should parse", =>
    formDefinition = app.model.FormParser.parse(json)

    expect(Ext.getClassName(formDefinition)).toEqual('app.model.FormDefinition')

    formDefinition.get('pages').each (page)=>
      expect(Ext.getClassName(page)).toEqual('app.model.Page')
      page.get('items').each (item)=>
        expect(Ext.getClassName(item)).toEqual('app.model.form.Option')

describe "Ext.util.Collection Extensions", =>
  it "should have map method", =>
    collection = Ext.create 'Ext.util.Collection'
    collection.add "XXX"
    collection.add "YYY"
    collection.add "ZZZ"
    i = 0
    collection.collect (item)=>
      i++
    expect(i).toEqual(3)

describe "Building the Form", =>
  it "should build a form panel", =>
    formDefinition = app.model.FormParser.parse(json)
    formDefinition.createForm()

