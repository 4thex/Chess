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
    if(!toPiece) {
      return move.from.file === move.to.file;
    }
    if(Math.abs(move.to.file-move.from.file) === 1
      && move.to.rank - move.from.rank === 1) {
      return toPiece.color === definitions.Colors.Black;
    }
    return false;
  };
  
	var onlyIncreasesTwoFromRank2 = function(move) {
		if(move.to.rank - move.from.rank > 2) return false;
		if(move.from.rank === Chess.Model.Ranks[2]) {
      return move.to.rank - move.from.rank <= 2;
		} else {
		  return move.to.rank - move.from.rank === 1;
		}
	};
	
	var increasesRank = function(move) {
		if(move.to.rank < move.from.rank) return false;
		return true;
	};

  that.isLegal = function() {
    return Chain(model)
      .when(isPawn)
      .when(isWhite)
      .and(increasesRank)
      .and(onlyIncreasesTwoFromRank2)
      .and(isChangingFileOnCapture);
  }();
  return that;
};