if(!Chess) {
  var Chess = {};
}

if(!Chess.Pieces) {
  Chess.Pieces = function(spec) {
    var that = {};
    that.render = function() {
      spec.model.forEach(function(piece) {
        var square = piece.square;
        var squareElement = document.querySelector("#square-"+spec.model.static.Files.nameFor(square.file)+spec.model.static.Ranks.nameFor(square.rank));
        var squareColorIsWhite = squareElement.classList.contains("white");
        var figurine;
          switch(piece.kind) {
            case spec.model.static.Kinds.K:
              figurine = "\u265A";
              break;
            case spec.model.static.Kinds.Q:
              figurine = "\u265B";
              break;
            case spec.model.static.Kinds.R:
              figurine = "\u265C";
              break;
            case spec.model.static.Kinds.B:
              figurine = "\u265D";
              break;
            case spec.model.static.Kinds.N:
              figurine = "\u265E";
              break;
            case spec.model.static.Kinds.P:
              figurine = "\u265F";
              break;
          }
        var pieceElement = document.createElement("p");
        pieceElement.piece = piece;
        squareElement.appendChild(pieceElement);
        pieceElement.textContent = figurine;
        pieceElement.classList.add("piece");
        pieceElement.setAttribute("draggable", true);
        if(piece.color === spec.model.static.Colors.White) {
          pieceElement.classList.add("white");
        } else {
          pieceElement.classList.add("black");
        }
        pieceElement.onclick = function(event) {
          event.target.parentElement.classList.add("dragenter");
          return false;
        };
        pieceElement.ondragstart = function(event) {
          event.dataTransfer.effectAllowed = "move";
          event.dataTransfer.dropEffect = "move";
          event.dataTransfer.setData("text/plain", JSON.stringify(piece));
        };
        pieceElement.ondrag = function(event) {
          event.target.style.display = "none";
        };
      });
    };
    return that;
  };
}
