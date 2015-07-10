var Chess = Chess || {};

Chess.Pieces = function(spec) {
  var that = {};
  that.render = function() {
    spec.model.forEach(function(piece) {
      var square = piece.square;
      var squareElement = document.querySelector("#square-"+Chess.Files.nameFor(square.file)+Chess.Ranks.nameFor(square.rank));
      var figurine;
        switch(piece.kind) {
          case Chess.Kinds.K:
            figurine = "\u265A";
            break;
          case Chess.Kinds.Q:
            figurine = "\u265B";
            break;
          case Chess.Kinds.R:
            figurine = "\u265C";
            break;
          case Chess.Kinds.B:
            figurine = "\u265D";
            break;
          case Chess.Kinds.N:
            figurine = "\u265E";
            break;
          case Chess.Kinds.P:
            figurine = "\u265F";
            break;
        }
      var pieceElement = document.createElement("p");
      pieceElement.piece = piece;
      squareElement.appendChild(pieceElement);
      pieceElement.textContent = figurine;
      pieceElement.classList.add("piece");
      pieceElement.setAttribute("draggable", true);
      if(piece.color === Chess.Colors.White) {
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
      pieceElement.ondragend = function(event) {
        if(event.dataTransfer.dropEffect === "none") {
          event.target.style.display = "block";
        }
        
      };
    });
  };
  return that;
};
