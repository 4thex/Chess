if(!Object.prototype.nameFor) {
  Object.prototype.nameFor = function(value) {
    var property;
    for(property in this) {
      if(this[property] === value) {
        return property;
      }
    }
    return undefined;
  };
}

var Chess = Chess || {};

Chess.Model = Chess.Model || function constructor() {
  var static = constructor;
  static.Ranks = {1: 0, 2: 1, 3: 2, 4: 3, 5: 4, 6: 5, 7: 6, 8: 7};
  static.Files = {a: 0, b: 1, c: 2, d: 3, e: 4, f: 5, g: 6, h: 7};
  static.Colors = {White: 0, Black: 1};
  static.Kinds = {K: 0,	Q: 1, B: 2,	N: 3, R: 4, P: 5};
  var that = {
    static: static
  };
  var board = function(){
    var board = [];
    var rankId, fileId;
    var rank, file;
    for(rankId in static.Ranks) {
      rank = static.Ranks[rankId];
      board[rank] = [];
      for(fileId in static.Files) {
        file = static.Files[fileId];
        board[rank][file] = undefined;
      }
    }
    rank = board[static.Ranks[2]];
    for(fileId in static.Files) {
      file = static.Files[fileId];
      rank[file] = {color: static.Colors.White, kind: static.Kinds.P};
    }
    rank = board[static.Ranks[7]];
    for(fileId in static.Files) {
      file = static.Files[fileId];
      rank[file] = {color: static.Colors.Black, kind: static.Kinds.P};
    }
    rank = board[static.Ranks[1]];
    rank[static.Files.a] = {color: static.Colors.White, kind: static.Kinds.R};
    rank[static.Files.b] = {color: static.Colors.White, kind: static.Kinds.N};
    rank[static.Files.c] = {color: static.Colors.White, kind: static.Kinds.B};
    rank[static.Files.d] = {color: static.Colors.White, kind: static.Kinds.Q};
    rank[static.Files.e] = {color: static.Colors.White, kind: static.Kinds.K};
    rank[static.Files.f] = {color: static.Colors.White, kind: static.Kinds.B};
    rank[static.Files.g] = {color: static.Colors.White, kind: static.Kinds.N};
    rank[static.Files.h] = {color: static.Colors.White, kind: static.Kinds.R};
    rank = board[static.Ranks[8]];
    rank[static.Files.a] = {color: static.Colors.Black, kind: static.Kinds.R};
    rank[static.Files.b] = {color: static.Colors.Black, kind: static.Kinds.N};
    rank[static.Files.c] = {color: static.Colors.Black, kind: static.Kinds.B};
    rank[static.Files.d] = {color: static.Colors.Black, kind: static.Kinds.Q};
    rank[static.Files.e] = {color: static.Colors.Black, kind: static.Kinds.K};
    rank[static.Files.f] = {color: static.Colors.Black, kind: static.Kinds.B};
    rank[static.Files.g] = {color: static.Colors.Black, kind: static.Kinds.N};
    rank[static.Files.h] = {color: static.Colors.Black, kind: static.Kinds.R};
    return board;
  }();
  that.move = function(from, to, by) {
    
  };
  that.peek = function(tile) {
    var rank = board[tile.rank] || [];
    return rank[tile.file];
  };
  return that;
};
// Initialize statics
// if(!Chess.Model.Files) Chess.Model();
