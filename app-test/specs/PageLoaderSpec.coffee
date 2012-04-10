describe "Basic assumptions", =>
  it "has Sencha Touch loaded", =>
    expect(Ext).toBeDefined()
    expect(Ext.getVersion()).toBeTruthy()
    expect(Ext.getVersion().major).toEqual(4)
