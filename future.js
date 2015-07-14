var Chess = Chess || {};
Chess.Future = function(model, move) {
  var that = Object.create(model);
  that.peek = function(square) {
    if(square.file === move.to.file && square.rank === move.to.rank) {
      return model.peek({file: move.from.file, rank: move.from.rank});
    }
    if(square.file === move.from.file && square.rank === move.from.rank) {
      return undefined;
    }
    return model.peek(square);
  };
  Object.defineProperty(that, 'moves', {
    get: function() {
      return model.moves.concat(move);
    }
  });
  return that;
};