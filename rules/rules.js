var Chess = Chess || {};
Chess.Rules = Chess.Rules || function(model) {
	var that = {};
	var fromTileIsNotEmpty = function(move) {
	  var result = move.piece;
	  if(!result) {
	    move.error = "You cannot move from an empty square";
	  }
	  return result;
	};
	var toTileDoesNotHavePieceOfOwnColor = function(move) {
	  var toPiece = model.peek(move.to);
	  if(!toPiece) return true;
	  var result = toPiece.color !== move.piece.color;
	  if(!result) {
	    move.error = "You cannot capture own piece";
	  }
	  return result;
	};
	that.isLegal = function() {
  	var blackPawn = Chess.Rules.BlackPawn(model);
  	var whitePawn = Chess.Rules.WhitePawn(model);
  	var knight = Chess.Rules.Knight(model);
  	var rook = Chess.Rules.Rook(model);
  	var bishop = Chess.Rules.Bishop(model);
  	var king = Chess.Rules.King(model);
  	var queen = Chess.Rules.Queen(model);
    return Chain(model)
      .and(fromTileIsNotEmpty)
      .and(toTileDoesNotHavePieceOfOwnColor)
      .and(blackPawn.isLegal)
      .and(whitePawn.isLegal)
      .and(knight.isLegal)
      .and(rook.isLegal)
      .and(bishop.isLegal)
      .and(king.isLegal)
      .and(queen.isLegal);
	}();
	return that;
};