var Chess = Chess || {};
Chess.Rules = Chess.Rules || function(model) {
	var that = {};
	var definitions = model.static;
	var fromTileIsNotEmpty = function(move) {
	  return move.piece;
	};
	var toTileDoesNotHavePieceOfOwnColor = function(move) {
	  var toPiece = model.peek(move.to);
	  if(!toPiece) return true;
	  if(toPiece.color === move.piece.color) return false;
	  return true;
	};
	that.isLegal = function() {
  	var blackPawn = Chess.Rules.BlackPawn(model);
	  var conditions = [];
    var result = function(move) {
  		move.piece = model.peek(move.from);
      return conditions.every(function(condition) {
        return condition(move);
      });
    };
    result.and = function(condition) {
      conditions.push(condition);
      return result;
    };
    return result
      .and(fromTileIsNotEmpty)
      .and(toTileDoesNotHavePieceOfOwnColor)
      .and(blackPawn.isLegal);
	}();
	return that;
};
