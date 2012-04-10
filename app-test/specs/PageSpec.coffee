describe "Basic assumptions", =>
  it "has Sencha Touch loaded", =>
    expect(forminator.model.Page).toBeDefined()
    Ext.create "forminator.model.Page"
