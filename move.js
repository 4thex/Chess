Chess.Move = Chess.Move || function constructor(spec) {
  var that = {};
  that.to = spec.to;
  that.from = spec.from;
  var model = spec.model;
  return that;
};
Chess.Move.translate = function translate(spec) {
  var san = spec.san;
  var model = spec.model;
  var that = Chess.Move(spec);
  that.to = {};
  if(san.length === 2) {
    that.to.file = model.static.Files[san[0]];
    that.to.rank = model.static.Ranks[san[1]];
  }
  return that;
};