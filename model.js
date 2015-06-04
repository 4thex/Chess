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
  var moves = [];
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
  that.move = function(spec) {
    var from = spec.from;
    var to = spec.to;
    var by = spec.by;
    if(!rules.isLegal(spec)) {
      if(spec.error) {
        var messageView = Chess.MessageView(spec.error);
        messageView.message = spec.error;
        messageView.show();
      }
      throw {message: "illegal move", reason: spec.error};
    }
    moves.push(spec);
    var piece = that.peek(from);
    that.remove(from);
    that.place(to, piece);
    // Place rook for castling
    var fileDiff = to.file-from.file;
    if(Math.abs(fileDiff) > 1 && piece.kind === static.Kinds.K) {
      if(fileDiff === 2) { // King's castle
        that.remove({file: static.Files.h, rank: to.rank});
        that.place({file: static.Files.f, rank: to.rank}, {color: piece.color, kind: static.Kinds.R});
      } else { // Queen's castle
        that.remove({file: static.Files.a, rank: to.rank});
        that.place({file: static.Files.c, rank: to.rank}, {color: piece.color, kind: static.Kinds.R});
      }
    }
  };
  that.whichFile = function whichFile(kind, rank, color) {
    var fileName = Object.getOwnPropertyNames(static.Files).filter(function(name) {
      var file = static.Files[name];
      var piece = that.peek({rank: rank, file: file});
      if(piece && piece.kind === kind && piece.color === color) {
        return true;
      }
    })[0];
    if(fileName) {
      return static.Files[fileName];
    }
    return undefined;
  };
  that.whichRank = function whichRank(kind, file, color) {
    var rankName = Object.getOwnPropertyNames(static.Ranks).filter(function(name) {
      var rank = static.Ranks[name];
      var piece = that.peek({rank: rank, file: file});
      if(piece && piece.kind === kind && piece.color === color) {
        return true;
      }
    })[0];
    if(rankName) {
      return static.Ranks[rankName];
    }
    return undefined;
  };
  that.forEach = function(callback) {
    var result = [];
    Object.getOwnPropertyNames(static.Files).forEach(function(file) {
      Object.getOwnPropertyNames(static.Ranks).forEach(function(rank) {
        var square = {rank: static.Ranks[rank], file: static.Files[file]};
        var piece = that.peek(square);
        if(piece) {
          piece.square = square;
          result.push(piece);
          callback(piece, result.length-1, result);    
        }
      });
    });
  };
  that.peek = function(square) {
    var rank = board[square.rank] || [];
    return rank[square.file];
  };
  that.hasMoved = function(square) {
    return moves.some(function(move) {
      return move.to.file === square.file && move.to.rank === square.rank;
    });
  };
  that.place = function(square, piece) {
    var rank = board[square.rank] || [];
    rank[square.file] = piece;
  };
  that.remove = function(square) {
    that.place(square, undefined);
  };
  var rules = Chess.Rules(that);
  return that;
};



