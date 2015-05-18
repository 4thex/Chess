Chess.Rules.King = Chess.Rules.King || function(rules, model) {
	var that = {};
  var definitions = model.static;
  
  // Pre-conditions
	var isKing = function(move) {
	  var result = move.piece.kind === definitions.Kinds.K;
	  console.log("Chess.Rules.King.isKing: "+JSON.stringify(move)+" = "+result);
	  return result;
	};
	
	// Rules
  var oneInAnyDirectionOrCastle = function(move) {
    var fileChange = Math.abs(move.to.file - move.from.file);
    var rankChange = Math.abs(move.to.rank - move.from.rank);
    var castleChain = Chain(model)
      .when(castle)
      .and(kingHasNotMoved)
      .and(rookHasNotMoved)
      .and(kingNotThreatened);
    if(fileChange > 1) return castleChain(move);
    return fileChange <= 1 && rankChange <= 1;
  };
  
  var kingHasNotMoved = function(move) {
    return !model.hasMoved(move.from);
  };
  
  var kingNotThreatened = function(move) {
    var thread = {};
    var kingSquare = move.from;
    thread.file = Object.getOwnPropertyNames(model.static.Files).filter(function(file) {
      thread.rank = Object.getOwnPropertyNames(model.static.Ranks).filter(function(rank) {
        var threadMove = {
          from: {
              file: model.static.Files[file],
              rank: model.static.Ranks[rank]
            },
          to: kingSquare
        };
        if(rules.isLegal(threadMove)) {
          return true;
        }
        return false;
      });
      return thread.rank.length > 0;
    });
    return thread.file.length === 0 && thread.rank.length === 0;
  };
  
  var rookHasNotMoved = function(move) {
    var fileChange = Math.abs(move.to.file - move.from.file);
    var rookSquare = {};
    if(fileChange > 1) {
      rookSquare.file = model.static.Files.h;
    } else {
      rookSquare.file = model.static.Files.a;
    }
    rookSquare.rank = move.to.rank;
    return !model.hasMoved(rookSquare);
  };
  
  var castle = function(move) {
    var result = [whiteKingsCastle, whiteQueensCastle, blackKingsCastle, blackQueensCastle].some(function(check) {
      return check(move);
    });
    console.log("Chess.Rules.King.castle: "+JSON.stringify(move)+" = "+result);
    return result;
  };
  
  var whiteKingsCastle = function(move) {
    return move.from.rank === model.static.Ranks["1"]
      && move.from.file === model.static.Files.e
      && move.to.rank === model.static.Ranks["1"]
      && move.to.file === model.static.Files.g;
  };
  
  var whiteQueensCastle = function(move) {
    return move.from.rank === model.static.Ranks["1"]
      && move.from.file === model.static.Files.e
      && move.to.rank === model.static.Ranks["1"]
      && move.to.file === model.static.Files.b;
  };
  
  var blackKingsCastle = function(move) {
    return move.from.rank === model.static.Ranks["8"]
      && move.from.file === model.static.Files.e
      && move.to.rank === model.static.Ranks["8"]
      && move.to.file === model.static.Files.g;
  };
  
  var blackQueensCastle = function(move) {
    return move.from.rank === model.static.Ranks["8"]
      && move.from.file === model.static.Files.e
      && move.to.rank === model.static.Ranks["8"]
      && move.to.file === model.static.Files.b;
  };
  
  that.isLegal = function() {
    return Chain(model)
      .when(isKing)
      .and(oneInAnyDirectionOrCastle);
  }();
  return that;
};



