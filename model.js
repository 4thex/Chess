var Chess = Chess || {};

Chess.Model = Chess.Model || function constructor(spec) {
  var moves = [];
  var that = {
    static: Chess,
    get moves() {
      return moves;
    },
    set moves(value) {
      moves = value;
    }
  };
  var hasChangedListeners = [];
  that.addHasChangedListener = function(listener) {
    hasChangedListeners.push(listener);
  };
  
  that.move = function(spec) {
    moves.push(spec);
    var piece = that.peek(spec.from);
    that.remove(spec.from);
    that.place(spec.to, piece);
  };
  
  that.whichFile = function whichFile(kind, rank, color) {
    var fileName = Object.getOwnPropertyNames(Chess.Files).filter(function(name) {
      var file = Chess.Files[name];
      var piece = that.peek({rank: rank, file: file});
      if(piece && piece.kind === kind && piece.color === color) {
        return true;
      }
    })[0];
    if(fileName) {
      return Chess.Files[fileName];
    }
    return undefined;
  };
  that.whichRank = function whichRank(kind, file, color) {
    var rankName = Object.getOwnPropertyNames(Chess.Ranks).filter(function(name) {
      var rank = Chess.Ranks[name];
      var piece = that.peek({rank: rank, file: file});
      if(piece && piece.kind === kind && piece.color === color) {
        return true;
      }
    })[0];
    if(rankName) {
      return Chess.Ranks[rankName];
    }
    return undefined;
  };
  that.forEach = function(callback) {
    var result = [];
    Object.getOwnPropertyNames(Chess.Files).forEach(function(file) {
      Object.getOwnPropertyNames(Chess.Ranks).forEach(function(rank) {
        var square = {rank: Chess.Ranks[rank], file: Chess.Files[file]};
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
  
  var board = function(){
    var board = [];
    var rankId, fileId;
    var rank, file;
    for(rankId in Chess.Ranks) {
      rank = Chess.Ranks[rankId];
      board[rank] = [];
      for(fileId in Chess.Files) {
        file = Chess.Files[fileId];
        board[rank][file] = undefined;
      }
    }
    rank = board[Chess.Ranks[2]];
    for(fileId in Chess.Files) {
      file = Chess.Files[fileId];
      rank[file] = {color: Chess.Colors.White, kind: Chess.Kinds.P};
    }
    rank = board[Chess.Ranks[7]];
    for(fileId in Chess.Files) {
      file = Chess.Files[fileId];
      rank[file] = {color: Chess.Colors.Black, kind: Chess.Kinds.P};
    }
    rank = board[Chess.Ranks[1]];
    rank[Chess.Files.a] = {color: Chess.Colors.White, kind: Chess.Kinds.R};
    rank[Chess.Files.b] = {color: Chess.Colors.White, kind: Chess.Kinds.N};
    rank[Chess.Files.c] = {color: Chess.Colors.White, kind: Chess.Kinds.B};
    rank[Chess.Files.d] = {color: Chess.Colors.White, kind: Chess.Kinds.Q};
    rank[Chess.Files.e] = {color: Chess.Colors.White, kind: Chess.Kinds.K};
    rank[Chess.Files.f] = {color: Chess.Colors.White, kind: Chess.Kinds.B};
    rank[Chess.Files.g] = {color: Chess.Colors.White, kind: Chess.Kinds.N};
    rank[Chess.Files.h] = {color: Chess.Colors.White, kind: Chess.Kinds.R};
    rank = board[Chess.Ranks[8]];
    rank[Chess.Files.a] = {color: Chess.Colors.Black, kind: Chess.Kinds.R};
    rank[Chess.Files.b] = {color: Chess.Colors.Black, kind: Chess.Kinds.N};
    rank[Chess.Files.c] = {color: Chess.Colors.Black, kind: Chess.Kinds.B};
    rank[Chess.Files.d] = {color: Chess.Colors.Black, kind: Chess.Kinds.Q};
    rank[Chess.Files.e] = {color: Chess.Colors.Black, kind: Chess.Kinds.K};
    rank[Chess.Files.f] = {color: Chess.Colors.Black, kind: Chess.Kinds.B};
    rank[Chess.Files.g] = {color: Chess.Colors.Black, kind: Chess.Kinds.N};
    rank[Chess.Files.h] = {color: Chess.Colors.Black, kind: Chess.Kinds.R};
    
    return board;
  }();

  // var persister = spec && spec.persister;
    
  // if(persister) {
  //   persister.load(function(result) {
  //     if(result.item) {
  //       moves = result.item;
  //       moves.forEach(function(move) {
  //         var piece = move.piece;
  //         that.remove(move.from);
  //         that.place(move.to, piece);
  //       });
  //     }
  //   });
  // }
  
  return that;
};

