Chess.Rules.BlackPawn = Chess.Rules.BlackPawn || function(model) {
	var that = {};
  var definitions = model.static;
  
  // Pre-conditions
	var isPawn = function(move) {
	  return move.piece.kind === definitions.Kinds.P;
	};
	
	var isBlack = function(move) {
	  return move.piece.color === definitions.Colors.Black;
	};
	
	// Rules
  var isChangingFileOnCapture = function(move) {
    var toPiece = model.peek(move.to);
    if(!toPiece) {
      return move.from.file === move.to.file;
    }
    if(Math.abs(move.to.file-move.from.file) === 1
      && move.from.rank - move.to.rank === 1) {
      return toPiece.color === definitions.Colors.White;
    }
    return false;
  };
  
	var onlyDecreasesTwoFromRank7 = function(move) {
		if(move.from.rank - move.to.rank > 2) return false;
		if(move.from.rank === Chess.Model.Ranks[7]) {
      return move.from.rank - move.to.rank <= 2;
		} else {
		  return move.from.rank - move.to.rank === 1;
		}
	};
	
	var decreasesRank = function(move) {
		if(move.from.rank < move.to.rank) return false;
		return true;
	};

  that.isLegal = function() {
	  var conditions = [];
    var result = function(move) {
  		move.piece = model.peek(move.from);
  		var preConditions = [isPawn, isBlack];
  		if(!preConditions.every(function(condition) {
  		  return condition(move);
  		})) {
  		  // These rules do not apply
  		  return true;
  		}
      return conditions.every(function(condition) {
        return condition(move);
      });
    };
    result.and = function (condition) {
      conditions.push(condition);
      return result;
    };
    
    return result
      .and(decreasesRank)
      .and(onlyDecreasesTwoFromRank7)
      .and(isChangingFileOnCapture);
  }();
  return that;
};
