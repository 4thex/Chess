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
    return fileChange === 0 || rankChange === 0;
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
      if(model.peek({file: file, rank:rank})) {
        return false;
      }
    } while(file < move.to.file);
    file = move.from.file;
    do {
      rank += rankDirection;
      if(model.peek({file: file, rank:rank})) {
        return false;
      }
    } while(rank < move.to.rank);
  };
  
  that.isLegal = function() {
    return Chain(model)
      .when(isRook)
      .and(rankOrFileChangeIsZero)
      .and(noPieceBetween);
  }();
  return that;
};