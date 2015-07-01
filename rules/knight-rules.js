Chess.Rules.Knight = Chess.Rules.Knight || function(model) {
	var that = {};

  // Pre-conditions
	var isKnight = function(move) {
	  var result = move.piece.kind === Chess.Kinds.N;
	  return result;
	};
	
	// Rules
  var sumOfRankAndFileChangeIs3 = function(move) {
    var fileChange = Math.abs(move.to.file - move.from.file);
    var rankChange = Math.abs(move.to.rank - move.from.rank);
    var result = fileChange + rankChange === 3;
    if(!result) {
      move.error = "Knight can only move in L-shapes with 1 rank and 2 files, or 2 ranks and 1 file.";
    }
    return result;
  };
  
	var differenceBetweenRankAndFileChangeIs1 = function(move) {
    var fileChange = Math.abs(move.to.file - move.from.file);
    var rankChange = Math.abs(move.to.rank - move.from.rank);
    var result = Math.abs(fileChange - rankChange) === 1;	 
    if(!result) {
      move.error = "Knight can only move in L-shapes with 1 rank and 2 files, or 2 ranks and 1 file.";
    }
    return result;
	};
	
  that.isLegal = function() {
    return Chain(model)
      .when(isKnight)
      .and(sumOfRankAndFileChangeIs3)
      .and(differenceBetweenRankAndFileChangeIs1);
  }();
  return that;
};