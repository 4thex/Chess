var Chess = Chess || {};
Chess.Persister = Chess.Persister || function(spec) {
  var storage = window.localStorage;
  var that = {};
  that.load = function(callback) {
    var item = storage.getItem(spec.name);
    item = item && JSON.parse(item);
    callback({item: item});
  };
  that.save = function(item, callback) {
    storage.setItem(spec.name, JSON.stringify(item));
    if(callback) callback();
  };
  that.clear = function(callback) {
    storage.removeItem(spec.name);
    if(callback) callback();
  };
  return that;
};