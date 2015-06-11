Chess.Rules.Bishop = Chess.Rules.Bishop || function(model) {
	var that = {};
  var definitions = model.static;
  
  // Pre-conditions
	var isBishop = function(move) {
	  return move.piece.kind === definitions.Kinds.B;
	};
	
	// Rules
  var rankAndFileChangeIsEqual = function(move) {
    var fileChange = Math.abs(move.to.file - move.from.file);
    var rankChange = Math.abs(move.to.rank - move.from.rank);
    var result = fileChange === rankChange;
    if(!result) {
      move.error = "Bishop can only move diagonally";
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
      file += fileDirection;
      rank += rankDirection;
      if(file !== move.to.file && model.peek({file: file, rank:rank})) {
        move.error = "Cannot jump over piece on "+model.static.Files.nameFor(file)+model.static.Ranks.nameFor(rank);
        return false;
      }
    } while(file !== move.to.file);
    return true;
  };
  
  that.isLegal = function() {
    return Chain(model)
      .when(isBishop)
      .and(rankAndFileChangeIsEqual)
      .and(noPieceBetween);
  }();
  return that;
};