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
    return Chain(model)
      .and(fromTileIsNotEmpty)
      .and(toTileDoesNotHavePieceOfOwnColor)
      .and(blackPawn.isLegal);
	}();
	return that;
};
