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
        if(piece.color === "white" && tileColorIsWhite
          || piece.color === "black" && !tileColorIsWhite) {
          switch(piece.kind) {
            case "K":
              figurine = "\u2654";
              break;
            case "Q":
              figurine = "\u2655";
              break;
            case "R":
              figurine = "\u2656";
              break;
            case "B":
              figurine = "\u2657";
              break;
            case "N":
              figurine = "\u2658";
              break;
            case "P":
              figurine = "\u2659";
              break;
          }
        } else {
          switch(piece.kind) {
            case "K":
              figurine = "\u265A";
              break;
            case "Q":
              figurine = "\u265B";
              break;
            case "R":
              figurine = "\u265C";
              break;
            case "B":
              figurine = "\u265D";
              break;
            case "N":
              figurine = "\u265E";
              break;
            case "P":
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
};

window.addEventListener("load", function() {
  var pieces = Chess.Pieces(
    {
      model: [
        {tile: "a8", color: "black", kind: "R"},
        {tile: "b8", color: "black", kind: "N"},
        {tile: "c8", color: "black", kind: "B"},
        {tile: "d8", color: "black", kind: "Q"},
        {tile: "e8", color: "black", kind: "K"},
        {tile: "f8", color: "black", kind: "B"},
        {tile: "g8", color: "black", kind: "N"},
        {tile: "h8", color: "black", kind: "R"},
        {tile: "a7", color: "black", kind: "P"},
        {tile: "b7", color: "black", kind: "P"},
        {tile: "c7", color: "black", kind: "P"},
        {tile: "d7", color: "black", kind: "P"},
        {tile: "e7", color: "black", kind: "P"},
        {tile: "f7", color: "black", kind: "P"},
        {tile: "g7", color: "black", kind: "P"},
        {tile: "h7", color: "black", kind: "P"},

        {tile: "a2", color: "white", kind: "P"},
        {tile: "b2", color: "white", kind: "P"},
        {tile: "c2", color: "white", kind: "P"},
        {tile: "d2", color: "white", kind: "P"},
        {tile: "e2", color: "white", kind: "P"},
        {tile: "f2", color: "white", kind: "P"},
        {tile: "g2", color: "white", kind: "P"},
        {tile: "h2", color: "white", kind: "P"},
        {tile: "a1", color: "white", kind: "R"},
        {tile: "b1", color: "white", kind: "N"},
        {tile: "c1", color: "white", kind: "B"},
        {tile: "d1", color: "white", kind: "Q"},
        {tile: "e1", color: "white", kind: "K"},
        {tile: "f1", color: "white", kind: "B"},
        {tile: "g1", color: "white", kind: "N"},
        {tile: "h1", color: "white", kind: "R"},

      ]
    }
  );
});
