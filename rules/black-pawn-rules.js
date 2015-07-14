Chess.Rules.BlackPawn = Chess.Rules.BlackPawn || function(model) {
	var that = {};

  // Pre-conditions
	var isPawn = function(move) {
	  return move.piece.kind === Chess.Kinds.P;
	};
	
	var isBlack = function(move) {
	  return move.piece.color === Chess.Colors.Black;
	};
	
	// Rules
  var isChangingFileOnCapture = function(move) {
    var toPiece = model.peek(move.to);
    if(!toPiece) {
      result = move.from.file === move.to.file;
      if(!result) {
        var lastMove = model.moves.slice(-1)[0];
        if(lastMove 
          && Math.abs(lastMove.to.rank-lastMove.from.rank) === 2 
          && lastMove.piece.kind === Chess.Kinds.P
          && lastMove.to.file === move.to.file
          && move.to.rank === lastMove.to.rank-1) {
          result = true;
        } else {
          move.error = "Pawn can only change file on capture";
        }
      }
      return result;
    }
    if(Math.abs(move.to.file-move.from.file) === 1
      && move.from.rank - move.to.rank === 1) {
      return toPiece.color === Chess.Colors.White;
    }
    return false;
  };
  
	var onlyDecreasesTwoFromRank7 = function(move) {
		if(move.from.rank - move.to.rank > 2) return false;
		if(move.from.rank === Chess.Ranks[7]) {
      return move.from.rank - move.to.rank <= 2;
		} else {
		  return move.from.rank - move.to.rank === 1;
		}
	};
	
	var noPieceBetween = function(move) {
	  if(move.from.rank !== Chess.Ranks[7]) return true;
	  if(move.to.rank === Chess.Ranks[5]) {
	    return !model.peek({file: move.from.file, rank: Chess.Ranks[6]});
	  }
	  return true;
	};
	
	var decreasesRank = function(move) {
		if(move.from.rank < move.to.rank) return false;
		return true;
	};

  that.isLegal = function() {
    return Chain(model)
      .when(isPawn)
      .when(isBlack)
      .and(decreasesRank)
      .and(onlyDecreasesTwoFromRank7)
      .and(noPieceBetween)
      .and(isChangingFileOnCapture);
  }();
  return that;
};