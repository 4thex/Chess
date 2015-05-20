if(!Chess) {
  var Chess = {};
}

if(!Chess.Pieces) {
  Chess.Pieces = function(spec) {
    var that = {};
    that.render = function() {
      spec.model.forEach(function(piece, index, pieces) {
        var squareElement = document.querySelector("#square-"+piece.square);
        var squareColorIsWhite = squareElement.classList.contains("white");
        var figurine;
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
        var pieceElement = document.createElement("p");
        squareElement.appendChild(pieceElement);
        pieceElement.textContent = figurine;
        pieceElement.classList.add("piece");
        pieceElement.setAttribute("draggable", true);
        if(piece.color === Chess.Pieces.Colors.White) {
          pieceElement.classList.add("white");
        } else {
          pieceElement.classList.add("black");
        }
        pieceElement.onclick = function(event) {
          event.target.parentElement.classList.add("dragenter");
          return false;
        };

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
        {square: "a8", color: Colors.Black, kind: Kinds.R},
        {square: "b8", color: Colors.Black, kind: Kinds.N},
        {square: "c8", color: Colors.Black, kind: Kinds.B},
        {square: "d8", color: Colors.Black, kind: Kinds.Q},
        {square: "e8", color: Colors.Black, kind: Kinds.K},
        {square: "f8", color: Colors.Black, kind: Kinds.B},
        {square: "g8", color: Colors.Black, kind: Kinds.N},
        {square: "h8", color: Colors.Black, kind: Kinds.R},
        {square: "a7", color: Colors.Black, kind: Kinds.P},
        {square: "b7", color: Colors.Black, kind: Kinds.P},
        {square: "c7", color: Colors.Black, kind: Kinds.P},
        {square: "d7", color: Colors.Black, kind: Kinds.P},
        {square: "e7", color: Colors.Black, kind: Kinds.P},
        {square: "f7", color: Colors.Black, kind: Kinds.P},
        {square: "g7", color: Colors.Black, kind: Kinds.P},
        {square: "h7", color: Colors.Black, kind: Kinds.P},

        {square: "a2", color: Colors.White, kind: Kinds.P},
        {square: "b2", color: Colors.White, kind: Kinds.P},
        {square: "c2", color: Colors.White, kind: Kinds.P},
        {square: "d2", color: Colors.White, kind: Kinds.P},
        {square: "e2", color: Colors.White, kind: Kinds.P},
        {square: "f2", color: Colors.White, kind: Kinds.P},
        {square: "g2", color: Colors.White, kind: Kinds.P},
        {square: "h2", color: Colors.White, kind: Kinds.P},
        {square: "a1", color: Colors.White, kind: Kinds.R},
        {square: "b1", color: Colors.White, kind: Kinds.N},
        {square: "c1", color: Colors.White, kind: Kinds.B},
        {square: "d1", color: Colors.White, kind: Kinds.Q},
        {square: "e1", color: Colors.White, kind: Kinds.K},
        {square: "f1", color: Colors.White, kind: Kinds.B},
        {square: "g1", color: Colors.White, kind: Kinds.N},
        {square: "h1", color: Colors.White, kind: Kinds.R},

      ]
    }
  );
});
;
