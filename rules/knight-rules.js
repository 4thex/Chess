Chess.Rules.Knight = Chess.Rules.Knight || function(model) {
	var that = {};
  var definitions = model.static;
  
  // Pre-conditions
	var isKnight = function(move) {
	  var result = move.piece.kind === definitions.Kinds.N;
	 // console.log("Chess.Rules.Knight.isKnight: "+JSON.stringify(move)+" = "+result);
	  return result;
	};
	
	// Rules
  var sumOfRankAndFileChangeIs3 = function(move) {
    var fileChange = Math.abs(move.to.file - move.from.file);
    var rankChange = Math.abs(move.to.rank - move.from.rank);
    return fileChange + rankChange === 3;
  };
  
	var differenceBetweenRankAndFileChangeIs1 = function(move) {
    var fileChange = Math.abs(move.to.file - move.from.file);
    var rankChange = Math.abs(move.to.rank - move.from.rank);
    return Math.abs(fileChange - rankChange) === 1;	  
	};
	
  that.isLegal = function() {
    return Chain(model)
      .when(isKnight)
      .and(sumOfRankAndFileChangeIs3)
      .and(differenceBetweenRankAndFileChangeIs1);
  }();
  return that;
};