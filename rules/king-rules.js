Chess.Rules.King = Chess.Rules.King || function(model) {
	var that = {};
  var definitions = model.static;
  
  // Pre-conditions
	var isKing = function(move) {
	  return move.piece.kind === definitions.Kinds.K;
	};
	
	// Rules
  var oneInAnyDirection = function(move) {
    var fileChange = Math.abs(move.to.file - move.from.file);
    var rankChange = Math.abs(move.to.rank - move.from.rank);
    return fileChange <= 1 && rankChange <= 1;
  };
  
  that.isLegal = function() {
    return Chain(model)
      .when(isKing)
      .and(oneInAnyDirection);
  }();
  return that;
};