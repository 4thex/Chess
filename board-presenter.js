var Chess = Chess || {};
Chess.BoardPresenter = function(spec) {
  var model = spec.model;
  var view = spec.view;
  var persister = spec.persister;
  var that = {};
  that.initialize = function() {
    view.presenter = that;
    var pieces = [
      [{file: Chess.Files.a, rank: Chess.Ranks[1]}, {kind: Chess.Kinds.R, color: Chess.Colors.White}],
      [{file: Chess.Files.b, rank: Chess.Ranks[1]}, {kind: Chess.Kinds.N, color: Chess.Colors.White}],
      [{file: Chess.Files.c, rank: Chess.Ranks[1]}, {kind: Chess.Kinds.B, color: Chess.Colors.White}],
      [{file: Chess.Files.d, rank: Chess.Ranks[1]}, {kind: Chess.Kinds.Q, color: Chess.Colors.White}],
      [{file: Chess.Files.e, rank: Chess.Ranks[1]}, {kind: Chess.Kinds.K, color: Chess.Colors.White}],
      [{file: Chess.Files.f, rank: Chess.Ranks[1]}, {kind: Chess.Kinds.B, color: Chess.Colors.White}],
      [{file: Chess.Files.g, rank: Chess.Ranks[1]}, {kind: Chess.Kinds.N, color: Chess.Colors.White}],
      [{file: Chess.Files.h, rank: Chess.Ranks[1]}, {kind: Chess.Kinds.R, color: Chess.Colors.White}],
      [{file: Chess.Files.a, rank: Chess.Ranks[2]}, {kind: Chess.Kinds.P, color: Chess.Colors.White}],
      [{file: Chess.Files.b, rank: Chess.Ranks[2]}, {kind: Chess.Kinds.P, color: Chess.Colors.White}],
      [{file: Chess.Files.c, rank: Chess.Ranks[2]}, {kind: Chess.Kinds.P, color: Chess.Colors.White}],
      [{file: Chess.Files.d, rank: Chess.Ranks[2]}, {kind: Chess.Kinds.P, color: Chess.Colors.White}],
      [{file: Chess.Files.e, rank: Chess.Ranks[2]}, {kind: Chess.Kinds.P, color: Chess.Colors.White}],
      [{file: Chess.Files.f, rank: Chess.Ranks[2]}, {kind: Chess.Kinds.P, color: Chess.Colors.White}],
      [{file: Chess.Files.g, rank: Chess.Ranks[2]}, {kind: Chess.Kinds.P, color: Chess.Colors.White}],
      [{file: Chess.Files.h, rank: Chess.Ranks[2]}, {kind: Chess.Kinds.P, color: Chess.Colors.White}],
      [{file: Chess.Files.a, rank: Chess.Ranks[8]}, {kind: Chess.Kinds.R, color: Chess.Colors.Black}],
      [{file: Chess.Files.b, rank: Chess.Ranks[8]}, {kind: Chess.Kinds.N, color: Chess.Colors.Black}],
      [{file: Chess.Files.c, rank: Chess.Ranks[8]}, {kind: Chess.Kinds.B, color: Chess.Colors.Black}],
      [{file: Chess.Files.d, rank: Chess.Ranks[8]}, {kind: Chess.Kinds.Q, color: Chess.Colors.Black}],
      [{file: Chess.Files.e, rank: Chess.Ranks[8]}, {kind: Chess.Kinds.K, color: Chess.Colors.Black}],
      [{file: Chess.Files.f, rank: Chess.Ranks[8]}, {kind: Chess.Kinds.B, color: Chess.Colors.Black}],
      [{file: Chess.Files.g, rank: Chess.Ranks[8]}, {kind: Chess.Kinds.N, color: Chess.Colors.Black}],
      [{file: Chess.Files.h, rank: Chess.Ranks[8]}, {kind: Chess.Kinds.R, color: Chess.Colors.Black}],
      [{file: Chess.Files.a, rank: Chess.Ranks[7]}, {kind: Chess.Kinds.P, color: Chess.Colors.Black}],
      [{file: Chess.Files.b, rank: Chess.Ranks[7]}, {kind: Chess.Kinds.P, color: Chess.Colors.Black}],
      [{file: Chess.Files.c, rank: Chess.Ranks[7]}, {kind: Chess.Kinds.P, color: Chess.Colors.Black}],
      [{file: Chess.Files.d, rank: Chess.Ranks[7]}, {kind: Chess.Kinds.P, color: Chess.Colors.Black}],
      [{file: Chess.Files.e, rank: Chess.Ranks[7]}, {kind: Chess.Kinds.P, color: Chess.Colors.Black}],
      [{file: Chess.Files.f, rank: Chess.Ranks[7]}, {kind: Chess.Kinds.P, color: Chess.Colors.Black}],
      [{file: Chess.Files.g, rank: Chess.Ranks[7]}, {kind: Chess.Kinds.P, color: Chess.Colors.Black}],
      [{file: Chess.Files.h, rank: Chess.Ranks[7]}, {kind: Chess.Kinds.P, color: Chess.Colors.Black}],
    ];
    pieces.forEach(function(item) {
      view.place.apply(view, item);
      model.place.apply(view, item);
    });
  };
  var place = function(square, piece) {
    [model, view].forEach(function(invoker) {
      invoker.place.call(invoker, square, piece);
    });
  };
  var remove = function(square) {
    [model, view].forEach(function(invoker) {
      invoker.remove.call(invoker, square);
    });
  };
  that.move = function(spec) {
    var from = spec.from;
    var to = spec.to;
    var by = spec.by;
    var piece = model.peek(from);
    var rules = Chess.Rules(model);
    if(!rules.isLegal(spec)) {
      view.place(from, piece);
      throw {message: "Illegal move", reason: spec.error};
    }
    model.moves.push(spec);
    place(to, piece);
    // Place rook for castling
    var fileDiff = to.file-from.file;
    if(Math.abs(fileDiff) > 1 && piece.kind === Chess.Kinds.K) {
      if(fileDiff === 2) { // King's castle
        remove({file: Chess.Files.h, rank: to.rank});
        place({file: Chess.Files.f, rank: to.rank}, {color: piece.color, kind: Chess.Kinds.R});
      } else { // Queen's castle
        remove({file: Chess.Files.a, rank: to.rank});
        place({file: Chess.Files.c, rank: to.rank}, {color: piece.color, kind: Chess.Kinds.R});
      }
    }
    if(persister) {
      persister.save(model.moves);
    }
  };
  
  that.initialize();
  if(persister) {
    persister.load(function(result) {
      if(result.item) {
        var moves = result.item;
        if(!moves.forEach) return;
        moves.forEach(function(move) {
          var piece = move.piece;
          remove(move.from);
          place(move.to, piece);
        });
        model.moves = moves;
      }
    });
  }
  
  return that;
};