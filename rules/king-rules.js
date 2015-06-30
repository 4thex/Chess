Chess.Rules.King = Chess.Rules.King || function(model) {
	var that = {};
  var definitions = model.static;
  
  // Pre-conditions
	var isKing = function(move) {
	  var result = move.piece.kind === definitions.Kinds.K;
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
      .and(kingNotThreatened)
      .and(squareBetweenEmpty)
      .and(squareBetweenNotThreatened);
    if(castle(move)) {
      return castleChain(move);
    }
    return (fileChange <= 1 && rankChange <= 1);
  };
  
  var kingHasNotMoved = function(move) {
    return !model.hasMoved(move.from);
  };
  
  var toSquareNotThreatened = function(move) {
    var piece = model.peek(move.from);
    var result = !squareThreatened(move.to, piece.color);
    if(!result) {
      move.error = "King cannot move to threatened square";
    }
    return result;
  };
  
  var notToSquareNextToOpponentKing = function(move) {
    var toNorth = {file: move.to.file, rank: move.to.rank+1};
    var toNorthEast = {file: move.to.file+1, rank: move.to.rank+1};
    var toEast = {file: move.to.file+1, rank: move.to.rank};
    var toSouthEast = {file: move.to.file+1, rank: move.to.rank-1};
    var toSouth = {file: move.to.file, rank: move.to.rank-1};
    var toSouthWest = {file: move.to.file-1, rank: move.to.rank-1};
    var toWest = {file: move.to.file-1, rank: move.to.rank};
    var toNorthWest = {file: move.to.file-1, rank: move.to.rank+1};
    var neighbours = [toNorth, toNorthEast, toEast, toSouthEast, toSouth, toSouthWest, toWest, toNorthWest];
    var result = neighbours.every(function(square) {
      if(square.file === move.from.file && square.rank === move.from.rank) {
        return true;
      }
      var piece = model.peek(square);
      return !piece || piece.kind !== model.static.Kinds.K;
    });
    if(!result) {
      move.error = "King cannot move next to opponent king";
    }
    return result;
  };
  
  var squareBetweenNotThreatened = function(move) {
    var fileChange = move.to.file - move.from.file;
    var step = fileChange/Math.abs(fileChange);
    var betweenSquares = [
      {rank: move.from.rank, file: move.from.file+step},
      {rank: move.from.rank, file: move.from.file+(step*2)},
    ];
    var color = model.peek(move.from).color;
    var result = !betweenSquares.some(function(square) {
      return squareThreatened(square, color);
    });
    if(!result) {
      move.error = "A square between king and rook is threatened";
    }
    return result;
  };
  
  var squareBetweenEmpty = function(move) {
    var fileChange = move.to.file - move.from.file;
    var step = fileChange/Math.abs(fileChange);
    var betweenSquare = {rank: move.from.rank, file: move.from.file+step};
    return !model.peek(betweenSquare);
  };
  
  var squareThreatened = function(square, color) {
    var thread = {};
    thread.rules = Chess.Rules(model);
    thread.file = Object.getOwnPropertyNames(model.static.Files).filter(function(file) {
      thread.rank = Object.getOwnPropertyNames(model.static.Ranks).filter(function(rank) {
        var threadMove = {
          from: {
              file: model.static.Files[file],
              rank: model.static.Ranks[rank]
            },
          to: square
        };
        var threadFromPiece = model.peek(threadMove.from);
        if(threadFromPiece 
          && threadFromPiece.kind !== model.static.Kinds.K // Important to avoid stack overflow
          && threadFromPiece.color !== color 
          && thread.rules.isLegal(threadMove)) {
          // console.log(JSON.stringify(threadFromPiece));
          return true;
        }
        return false;
      });
      return thread.rank.length > 0;
    });
    return thread.file.length > 0 || thread.rank.length > 0;
  };

  var kingNotThreatened = function(move) {
    var color = model.peek(move.from).color;
    return !squareThreatened(move.from, color);
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
      && move.to.file === model.static.Files.c;
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
      && move.to.file === model.static.Files.c;
  };
  
  that.isLegal = function() {
    return Chain(model)
      .when(isKing)
      .and(toSquareNotThreatened)
      .and(notToSquareNextToOpponentKing)
      .and(oneInAnyDirectionOrCastle);
  }();
  return that;
};








