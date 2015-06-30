Chess.Move = Chess.Move || function constructor(spec) {
  var that = {};
  that.to = spec.to;
  that.from = spec.from;
  that.by = spec.by;
  that.promote = spec.promote;
  var model = spec.model;
  return that;
};

Chess.Move.createFromSan = function createFromSan(spec) {
  var san = spec.san;
  var model = spec.model;
  var rules = Chess.Rules(model);
  var that = Chess.Move(spec);
  that.by = spec.by;
  var split = function(san) {
    var expression = /(O-O(-O)?)|([KQBNR]?)([a-h])?([1-8])?x?([a-h][1-8])(=([QBNR]))?([+#])?(e\.\p\.)?/g;
    return expression.exec(san);
  }(spec.san);
  that.to = {};
  that.from = {};

  var kind;
  if(split[1]) {
    that.to.rank = Chess.Ranks["1"];
    that.from = {
      file: Chess.Files.e,
      rank: Chess.Ranks["1"]
    };
    if(split[2]) { // Queen's castle
      that.to.file = Chess.Files.c;
    }  else { // King's castle
      that.to.file = Chess.Files.g;
    }
    return that;
  }
  that.to.file = Chess.Files[split[6][0]];
  that.to.rank = Chess.Ranks[split[6][1]];
  if(split[7]) {
    that.promote = Chess.Kinds[split[8]];
  }
  if(split[3]) {
    kind = Chess.Kinds[split[3]];
  } else {
    kind = Chess.Kinds.P;
  }
  if(split[4]) {
    that.from.file = Chess.Files[split[4]];
  }
  if(split[5]) {
    that.from.rank = Chess.Ranks[split[5]];
  }
  if(that.from.rank !== undefined && that.from.file === undefined) {
    that.from.file = model.whichFile(kind, that.from.rank, spec.by);
  }
  if(that.from.rank === undefined && that.from.file !== undefined) {
    that.from.rank = model.whichRank(kind, that.from.file, spec.by);
  }
  var move;
  if(that.from.rank === undefined && that.from.file === undefined) {
    Object.getOwnPropertyNames(Chess.Files).filter(function(file) {
      return Object.getOwnPropertyNames(Chess.Ranks).filter(function(rank) {
        move = {
          from: {
            file: Chess.Files[file],
            rank: Chess.Ranks[rank]
          },
          to: that.to
        };
        if(rules.isLegal(move)
          && model.peek(move.from).kind === kind) {
          that.from = move.from;
          return true;
        }
        return false;
      });
    });
  }
  return that;
};