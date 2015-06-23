Chess.Rules.Queen = Chess.Rules.Queen || function(model) {
	var that = {};
  var definitions = model.static;
  
  // Pre-conditions
	var isQueen = function(move) {
	  var result = move.piece.kind === definitions.Kinds.Q;
	 // console.log("Chess.Rules.Knight.isKnight: "+JSON.stringify(move)+" = "+result);
	  return result;
	};
	
	// Rules
  var straightInAnyDirection = function(move) {
    var fileChange = Math.abs(move.to.file - move.from.file);
    var rankChange = Math.abs(move.to.rank - move.from.rank);
    var result = fileChange === 0 || rankChange === 0 || fileChange === rankChange;
    if(!result) {
      move.error = "The queen can only move in straight lines";
    }
    return result;
  };
  
  var noPieceBetween = function(move) {
    var fileChange = move.to.file - move.from.file;
    var fileDirection = fileChange/Math.abs(fileChange);
    var rankChange = move.to.rank - move.from.rank;
    var rankDirection = rankChange/Math.abs(rankChange);
    var file = move.from.file;
    var rank = move.from.rank;
    do {
      if(fileDirection) file += fileDirection;
      if(rankDirection) rank += rankDirection;
      if(!(file === move.to.file && rank === move.to.rank) && model.peek({file: file, rank:rank})) {
        move.error = "The queen cannot jump over piece on "+model.static.Files.nameFor(file)+model.static.Ranks.nameFor(rank);
        return false;
      }
    } while(!(file === move.to.file && rank === move.to.rank));
    return true;
  };

  that.isLegal = function() {
    return Chain(model)
      .when(isQueen)
      .and(straightInAnyDirection)
      .and(noPieceBetween);
  }();
  return that;
};