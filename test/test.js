(function() {

  module('Class', {
    setup: function() {
      window.Model = Class.extend({
        constructor: function() {
          return 'Creating Model...';
        },
        save: function() {
          return 'Saving Model...';
        }
      });
      window.MegaModel = Model.extend({
        constructor: function() {
          return 'Creating MegaModel...';
        },
        save: function() {
          return this.__super__.save() + '\n'
            + 'Saving MegaModel...';
        }
      });
    },
    teardown: function() {
      // delete window.Model;
      // delete window.MegaModel;
    }
  });

  test('Sanity check', function() {
    equal(typeof Class, 'function');
    equal(typeof Class.inherit, 'function');
    equal(typeof Class.extend, 'function');
    equal(typeof Class.include, 'function');
  });

  test('Model Class', function() {
    var model = new Model();
    ok(model instanceof Model);
    ok(model.save().search(/model/i) > -1, 'Method "save" works');
  });

  test('MegaModel Class', function() {
    var model = new MegaModel();
    ok(model instanceof MegaModel);
    ok(model.save().search(/megamodel/i) > -1, 'Method "save" works');
  });

})();
