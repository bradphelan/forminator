describe "Basic assumptions", =>
  it "has Sencha Touch loaded", =>
    expect(app.model.Page).toBeDefined()
    Ext.create "app.model.Page"
