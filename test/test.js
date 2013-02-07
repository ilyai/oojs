(function() {

  module('Class', {
    setup: function() {
      var getLogger = function(name) {
        return {
          stack: [],
          log: function(message) {
            this.stack.push(message);
            return console.log(name + ' ' + message);
          }
        };
      };
      var logger = this.logger = getLogger('[Class]');
      window.Model = Class.extend({
        properties: {
          name: 'Model',
          description: 'Demonstraton purposes'
        },
        constructor: function() {
          logger.log('Creating Model');
        },
        save: function() {
          logger.log('Saving Model');
        }
      });
      window.MegaModel = Model.extend({
        properties: {
          name: 'MegaModel',
          description: 'Demonstraton purposes only'
        },
        constructor: function() {
          this.__super__.constructor.apply(this, arguments);
          logger.log('Creating MegaModel');
        },
        save: function() {
          this.__super__.save();
          logger.log('Saving MegaModel');
        }
      });
    },
    teardown: function() {
      delete window.Model;
      delete window.MegaModel;
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
    model.save();
    ok(this.logger.stack.pop().search(/\bmodel\b/i) > -1, 'Method "save" works');
  });

  test('MegaModel Class', function() {
    var model = new MegaModel();
    ok(model instanceof MegaModel);
    model.save();
    ok(this.logger.stack.pop().search(/\bmegamodel\b/i) > -1, 'Own method works');
    ok(this.logger.stack.pop().search(/\bmodel\b/i) > -1, 'Inherited method works');
    equal(model.properties.name, 'MegaModel', 'Static properties are inheried');
  });

})();
