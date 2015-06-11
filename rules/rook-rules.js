Chess.Rules.Rook = Chess.Rules.Rook || function(model) {
	var that = {};
  var definitions = model.static;
  
  // Pre-conditions
	var isRook = function(move) {
	  return move.piece.kind === definitions.Kinds.R;
	};
	
	// Rules
  var rankOrFileChangeIsZero = function(move) {
    var fileChange = Math.abs(move.to.file - move.from.file);
    var rankChange = Math.abs(move.to.rank - move.from.rank);
    var result = fileChange === 0 || rankChange === 0;
    if(!result) {
      move.error = "Rook can only move vertically, or horizontally";
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
      if(model.peek({file: file, rank:rank})) {
        move.error = "Cannot jump over piece on "+model.static.Files.nameFor(file)+model.static.Ranks.nameFor(rank);
        return false;
      }
    } while(!(file === move.to.file && rank === move.to.rank));
    return true;
  };
  
  that.isLegal = function() {
    return Chain(model)
      .when(isRook)
      .and(rankOrFileChangeIsZero)
      .and(noPieceBetween);
  }();
  return that;
};