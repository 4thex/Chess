var Chess = Chess || {};
Chess.Persister = Chess.Persister || function(spec) {
  var that = {};
  that.load = function(callback) {
    var storage = window.localStorage;
    var item = storage.getItem(spec.name);
    callback({item: JSON.parse(item)});
  };
  that.save = function(item, callback) {
    var storage = window.localStorage;
    storage.setItem(spec.name, JSON.stringify(item));
    callback();
  };
  return that;
};