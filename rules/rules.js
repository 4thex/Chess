var Chess = Chess || {};
Chess.Rules = Chess.Rules || function(model) {
	var that = {};
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
  	var whitePawn = Chess.Rules.WhitePawn(model);
  	var knight = Chess.Rules.Knight(model);
  	var rook = Chess.Rules.Rook(model);
  	var bishop = Chess.Rules.Bishop(model);
  	var king = Chess.Rules.King(that, model);
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
