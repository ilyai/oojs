(function() {

  module('Class', {
    
    setup: function() {
      var log = console.log;
      window.console.log = function(message) {
        if (typeof logMsgs === 'undefined') window.logMsgs = [];
        logMsgs.push(message);
        return log.call(console, message);
      };
      window.Model = Class.extend({
        constructor: function() {
          console.log('Creating Model...');
        },
        save: function() {
          console.log('Saving Model...');
        }
      });
      window.MegaModel = Model.extend({
        constructor: function() {
          this.__super__.constructor.apply(this, arguments);
          console.log('Creating MegaModel...');
        },
        save: function() {
          this.__super__.save();
          console.log('Saving MegaModel');
        }
      });
    },
    teardown: function() {
      // delete logMsgs;
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
    model.save();
    ok(logMsgs.pop().search(/\bmodel\b/i) > -1, 'Method "save" works');
  });

  test('MegaModel Class', function() {
    var model = new MegaModel();
    ok(model instanceof MegaModel);
    model.save();
    ok(logMsgs.pop().search(/\bmegamodel\b/i) > -1, 'Method "save" works');
  });

})();
