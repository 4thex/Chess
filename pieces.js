if(!Chess) {
  var Chess = {};
}

if(!Chess.Pieces) {
  Chess.Pieces = function(spec) {
    var that = {};
    that.render = function() {
      spec.model.forEach(function(piece, index, pieces) {
        var tileElement = document.querySelector("#tile-"+piece.tile);
        var tileColorIsWhite = tileElement.classList.contains("white");
        var figurine;
        if(piece.color === Chess.Pieces.Colors.White && tileColorIsWhite
          || piece.color === Chess.Pieces.Colors.Black && !tileColorIsWhite) {
          switch(piece.kind) {
            case Chess.Pieces.Kinds.K:
              figurine = "\u2654";
              break;
            case Chess.Pieces.Kinds.Q:
              figurine = "\u2655";
              break;
            case Chess.Pieces.Kinds.R:
              figurine = "\u2656";
              break;
            case Chess.Pieces.Kinds.B:
              figurine = "\u2657";
              break;
            case Chess.Pieces.Kinds.N:
              figurine = "\u2658";
              break;
            case Chess.Pieces.Kinds.P:
              figurine = "\u2659";
              break;
          }
        } else {
          switch(piece.kind) {
            case Chess.Pieces.Kinds.K:
              figurine = "\u265A";
              break;
            case Chess.Pieces.Kinds.Q:
              figurine = "\u265B";
              break;
            case Chess.Pieces.Kinds.R:
              figurine = "\u265C";
              break;
            case Chess.Pieces.Kinds.B:
              figurine = "\u265D";
              break;
            case Chess.Pieces.Kinds.N:
              figurine = "\u265E";
              break;
            case Chess.Pieces.Kinds.P:
              figurine = "\u265F";
              break;
          }
        }
        tileElement.textContent = figurine;
      });
    };
    that.render();
    return that;
  };
  Chess.Pieces.Kinds = {K: 0,	Q: 1, B: 2,	N: 3, R: 4, P: 5};
  Chess.Pieces.Colors = {White: 0, Black: 1};
}

window.addEventListener("load", function() {
  var Kinds = Chess.Pieces.Kinds;
  var Colors = Chess.Pieces.Colors;
  var pieces = Chess.Pieces(
    {
      model: [
        {tile: "a8", color: Colors.Black, kind: Kinds.R},
        {tile: "b8", color: Colors.Black, kind: Kinds.N},
        {tile: "c8", color: Colors.Black, kind: Kinds.B},
        {tile: "d8", color: Colors.Black, kind: Kinds.Q},
        {tile: "e8", color: Colors.Black, kind: Kinds.K},
        {tile: "f8", color: Colors.Black, kind: Kinds.B},
        {tile: "g8", color: Colors.Black, kind: Kinds.N},
        {tile: "h8", color: Colors.Black, kind: Kinds.R},
        {tile: "a7", color: Colors.Black, kind: Kinds.P},
        {tile: "b7", color: Colors.Black, kind: Kinds.P},
        {tile: "c7", color: Colors.Black, kind: Kinds.P},
        {tile: "d7", color: Colors.Black, kind: Kinds.P},
        {tile: "e7", color: Colors.Black, kind: Kinds.P},
        {tile: "f7", color: Colors.Black, kind: Kinds.P},
        {tile: "g7", color: Colors.Black, kind: Kinds.P},
        {tile: "h7", color: Colors.Black, kind: Kinds.P},

        {tile: "a2", color: Colors.White, kind: Kinds.P},
        {tile: "b2", color: Colors.White, kind: Kinds.P},
        {tile: "c2", color: Colors.White, kind: Kinds.P},
        {tile: "d2", color: Colors.White, kind: Kinds.P},
        {tile: "e2", color: Colors.White, kind: Kinds.P},
        {tile: "f2", color: Colors.White, kind: Kinds.P},
        {tile: "g2", color: Colors.White, kind: Kinds.P},
        {tile: "h2", color: Colors.White, kind: Kinds.P},
        {tile: "a1", color: Colors.White, kind: Kinds.R},
        {tile: "b1", color: Colors.White, kind: Kinds.N},
        {tile: "c1", color: Colors.White, kind: Kinds.B},
        {tile: "d1", color: Colors.White, kind: Kinds.Q},
        {tile: "e1", color: Colors.White, kind: Kinds.K},
        {tile: "f1", color: Colors.White, kind: Kinds.B},
        {tile: "g1", color: Colors.White, kind: Kinds.N},
        {tile: "h1", color: Colors.White, kind: Kinds.R},

      ]
    }
  );
});
