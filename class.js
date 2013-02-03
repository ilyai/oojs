/**
 * Class.js
 * JavaScript inheritance
 * (c) 2013 Ilya Igonkin
 * Licensed under the MIT license
 */

(function(window, undefined) {

  var Class = window.Class = function() {};
  var has = Object.prototype.hasOwnProperty;

  Class.inherit = function(Parent, protoProps) {
    var Child = (protoProps && has.call(protoProps, 'constructor'))
      ? protoProps.constructor
      : function() { Parent.apply(this, arguments); };

    for (var property in Parent) {
      if (has.call(Parent, property)) {
        Child[property] = Parent[property];
      }
    }

    var SubClass = function() {};
    SubClass.prototype = Parent.prototype;
    Child.prototype = new SubClass();

    for (var property in protoProps) {
      Child.prototype[property] = protoProps[property];
    }

    Child.prototype.__super__ = Parent.prototype;
    Child.prototype.constructor = Child;
    return Child;
  };

  Class.extend = function(protoProps) {
    return this.inherit(this, protoProps);
  };

  Class.include = function(staticProps) {
    for (var property in staticProps) {
      if (has.call(staticProps, property)) {
        this[property] = staticProps[property];
      }
    }
  };

})(this);
