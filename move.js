Chess.Move = Chess.Move || function constructor(spec) {
  var that = {};
  that.to = spec.to;
  that.from = spec.from;
  that.by = spec.by;
  var model = spec.model;
  return that;
};

Chess.Move.createFromSan = function createFromSan(spec) {
  var san = spec.san;
  var model = spec.model;
  var rules = Chess.Rules(model);
  var that = Chess.Move(spec);
  var split = function(san) {
    var expression = /(O-O(-O)?)|([KQBNR]?)([a-h])?([1-8])?x?([a-h][1-8])([+#])?(e\.\p\.)?/g;
    return expression.exec(san);
  }(spec.san);
  that.to = {};
  that.from = {};
  var kind;
  if(split[1] && !split[2]) { // King's castle
    that.from = {
      file: model.static.Files.e,
      rank: model.static.Ranks["1"]
    };
    that.to = {
      file: model.static.Files.g,
      rank: model.static.Ranks["1"]
    };
    return that;
  }
  that.to.file = model.static.Files[split[6][0]];
  that.to.rank = model.static.Ranks[split[6][1]];
  if(split[3]) {
    kind = model.static.Kinds[split[3]];
  } else {
    kind = model.static.Kinds.P;
  }
  if(split[4]) {
    that.from.file = model.static.Files[split[4]];
  }
  if(split[5]) {
    that.from.rank = model.static.Ranks[split[5]];
  }
  if(that.from.rank && !that.from.file) {
    that.from.file = model.whichFile(kind, that.from.rank, spec.by);
  }
  if(!that.from.rank && that.from.file) {
    that.from.rank = model.whichRank(kind, that.from.file, spec.by);
  }
  var move;
  if(!that.from.rank && !that.from.file) {
    Object.getOwnPropertyNames(model.static.Files).filter(function(file) {
      return Object.getOwnPropertyNames(model.static.Ranks).filter(function(rank) {
        move = {
          from: {
            file: model.static.Files[file],
            rank: model.static.Ranks[rank]
          },
          to: that.to
        };
        if(rules.isLegal(move)) {
          that.from = move.from;
          return true;
        }
        return false;
      });
    });
  }
  return that;
};