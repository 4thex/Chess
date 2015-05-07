Chess.Rules.Queen = Chess.Rules.Queen || function(model) {
	var that = {};
  var definitions = model.static;
  
  // Pre-conditions
	var isQueen = function(move) {
	  return move.piece.kind === definitions.Kinds.Q;
	};
	
	// Rules
  var straightInAnyDirection = function(move) {
    var fileChange = Math.abs(move.to.file - move.from.file);
    var rankChange = Math.abs(move.to.rank - move.from.rank);
    return fileChange === 0 || rankChange === 0 || fileChange === rankChange;
  };
  
  that.isLegal = function() {
    return Chain(model)
      .when(isQueen)
      .and(straightInAnyDirection);
  }();
  return that;
};