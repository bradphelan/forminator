(function() {
  var json,
    _this = this;

  json = {
    pages: [
      {
        title: "Page 0",
        items: [
          {
            xtype: "option",
            options: [
              {
                name: "bad",
                value: 0
              }, {
                name: "good",
                value: 1
              }, {
                name: "excelent",
                value: 2
              }
            ]
          }
        ]
      }, {
        title: "Page 1",
        items: [
          {
            xtype: "option",
            options: [
              {
                name: "ugly",
                value: 0
              }, {
                name: "pretty",
                value: 1
              }
            ]
          }
        ]
      }
    ]
  };

  json = Ext.JSON.encode(json);

  Ext.define('Loader', {
    requires: ['app.model.FormParser', 'app.model.Page']
  });

  describe("Parsing the JSON", function() {
    return it("should parse", function() {
      var formDefinition;
      formDefinition = app.model.FormParser.parse(json);
      expect(Ext.getClassName(formDefinition)).toEqual('app.model.FormDefinition');
      return formDefinition.get('pages').each(function(page) {
        expect(Ext.getClassName(page)).toEqual('app.model.Page');
        return page.get('items').each(function(item) {
          return expect(Ext.getClassName(item)).toEqual('app.model.form.Option');
        });
      });
    });
  });

  describe("Ext.util.Collection Extensions", function() {
    return it("should have map method", function() {
      var collection, i;
      collection = Ext.create('Ext.util.Collection');
      collection.add("XXX");
      collection.add("YYY");
      collection.add("ZZZ");
      i = 0;
      collection.collect(function(item) {
        return i++;
      });
      return expect(i).toEqual(3);
    });
  });

  describe("Building the Form", function() {
    return it("should build a form panel", function() {
      var formDefinition;
      formDefinition = app.model.FormParser.parse(json);
      return formDefinition.createForm();
    });
  });

}).call(this);
