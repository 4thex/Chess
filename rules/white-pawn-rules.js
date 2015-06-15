Chess.Rules.WhitePawn = Chess.Rules.WhitePawn || function(model) {
	var that = {};
  var definitions = model.static;
  
  // Pre-conditions
	var isPawn = function(move) {
	  return move.piece.kind === definitions.Kinds.P;
	};
	
	var isWhite = function(move) {
	  return move.piece.color === definitions.Colors.White;
	};
	
	// Rules
  var isChangingFileOnCapture = function(move) {
    var toPiece = model.peek(move.to);
    var result;
    if(!toPiece) {
      result = move.from.file === move.to.file;
      if(!result) {
        move.error = "Pawn can only change file on capture";
      }
      return result;
    }
    if(Math.abs(move.to.file-move.from.file) === 1
      && move.to.rank - move.from.rank === 1) {
      return true;
    }
    move.error = "Pawn can only change one file on capture";
    return false;
  };
  
	var onlyIncreasesTwoFromRank2 = function(move) {
	  var result;
		if(move.to.rank - move.from.rank > 2) {
		  move.error = "Pawn can not move more than 2 ranks";
		  return false;
		}
		if(move.from.rank !== Chess.Model.Ranks[2]) {
		  result = move.to.rank - move.from.rank === 1;
		  move.error = "Pawn can only move one rank unless moving from rank 2";
		} else {
		  result = true;
		}
		
		return result;
	};
	
	var noPieceBetween = function(move) {
	  if(move.from.rank !== model.static.Ranks[2]) return true;
	  if(move.to.rank === model.static.Ranks[4]) {
	    return !model.peek({file: move.from.file, rank: model.static.Ranks[3]});
	  }
	  return true;
	};
	
	var increasesRank = function(move) {
		var result = move.to.rank > move.from.rank;
		if(!result) {
		  move.error = "White pawn can only advance in rank";
		}
		return result;
	};

  that.isLegal = function() {
    return Chain(model)
      .when(isPawn)
      .when(isWhite)
      .and(increasesRank)
      .and(onlyIncreasesTwoFromRank2)
      .and(noPieceBetween)
      .and(isChangingFileOnCapture);
  }();
  return that;
};