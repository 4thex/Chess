if(!Chess) {
  var Chess = {};
}

if(!Chess.View) {
  Chess.View = function(spec) {
    var presenter;
    var that = {
      get presenter() {
        return presenter;
      },
      set presenter(value) {
        presenter = value;
      }
    };
    
    var createSquare = function(container, fileIndex, rankIndex) {
      var square = document.createElement("div");
      square.ondragover = function(event) {
        return false;
      };
      square.ondragenter = function(event) {
        event.target.classList.add("dragenter");
        return false;
      };
      square.ondragleave = function(event) {
        event.target.classList.remove("dragenter");
        return false;
      };
      container.appendChild(square);
      if((rankIndex + fileIndex) % 2) {
        square.classList.add("white");
      } else {
        square.classList.add("black");
      }
      square.classList.add("square");
      square.setAttribute("id", "square-"+Chess.Files.nameFor(fileIndex)+Chess.Ranks.nameFor(rankIndex));
      square.location = {file: fileIndex, rank: rankIndex};
      square.ondrop = function(event) {
        event.target.classList.remove("dragenter");
        event.target.style.display = "block";
        var piece = JSON.parse(event.dataTransfer.getData("text/plain"));
        var from = piece.square;
        var to = event.target.location;
        if(!to) {
          to = event.target.parentNode.location;
        }
        try {
          presenter.move({from: piece.square, to: to});
          // that.render(spec.element);
        } catch (error) {
          error.reason = error.reason || "unknown reason";
          var messageView = Chess.MessageView({message: error.message+":<br/>"+error.reason, x: event.clientX, y: event.clientY});
          // messageView.message = error;
          messageView.show(function() {
            // that.render(spec.element);
          });
        }
      };
      return square;
    };
    
    that.place = function(square, piece) {
      piece.square = square;
      var squareElement = document.querySelector("#square-"+Chess.Files.nameFor(square.file)+Chess.Ranks.nameFor(square.rank));
      var figurine = Chess.Figurines[piece.kind];
      var pieceElement = squareElement.querySelector("p.piece");
      if(!pieceElement) {
        pieceElement = document.createElement("p");
        squareElement.appendChild(pieceElement);
        pieceElement.classList.add("piece");
        pieceElement.setAttribute("draggable", true);
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
      }
      if(piece.color === Chess.Colors.White) {
        pieceElement.classList.remove("black");
        pieceElement.classList.add("white");
      } else {
        pieceElement.classList.remove("white");
        pieceElement.classList.add("black");
      }
      pieceElement.piece = piece;
      pieceElement.textContent = figurine;
      pieceElement.style.display = "block";
    };
    
    that.remove = function(square) {
        var squareElement = document.querySelector("#square-"+Chess.Files.nameFor(square.file)+Chess.Ranks.nameFor(square.rank));
        var pieceElement = squareElement.querySelector("p.piece");
        if(pieceElement) {
          squareElement.removeChild(pieceElement);
        }
    };
    
    
    
    that.render = function() {
      var element = spec.element;
      var document = element.ownerDocument;
      var menu = element.querySelector("#menu");
      if(menu) {
        element.removeChild(menu);
      }
      menu = document.createElement("div");
      menu.id="menu";
      var newGameMenuItem = document.createElement("div");
      newGameMenuItem.textContent = "New Game";
      newGameMenuItem.onclick = function(event) {
        presenter.reset();
      };
      menu.appendChild(newGameMenuItem);
      element.appendChild(menu);
      
      var container = element.querySelector(".board");
      if(container) {
        element.removeChild(container);
      }
      container = document.createElement("div");
      container.classList.add("board");
      element.appendChild(container);
      var fileIndex;
      for(var rankIndex=7; rankIndex>=0; --rankIndex) {
        var rankElement = document.createElement("div");
        container.appendChild(rankElement);
        rankElement.textContent = Chess.Ranks.nameFor(rankIndex);
        rankElement.classList.add("rank");
        
        for(fileIndex=0; fileIndex<8; ++fileIndex) {
          createSquare(container, fileIndex, rankIndex);
        }
      }
      var cornerElement = document.createElement("div");
      container.appendChild(cornerElement);
      cornerElement.classList.add("corner");
      for(fileIndex=0; fileIndex<8; ++fileIndex) {
        var file = document.createElement("div");
        container.appendChild(file);
        file.textContent = Chess.Files.nameFor(fileIndex);
        file.classList.add("file");
      }
    };
    that.render();
    return that;
  };
}

window.addEventListener("load", function() {
  var body = document.querySelector("body");
  var persister = Chess.Persister({name: "state"});
  var model = Chess.Model({persister: persister});
  var view = Chess.View({element: body, model: model});
  var boardPresenter = Chess.BoardPresenter({model: model, view: view, persister: persister});
});

nt("div");
        container.appendChild(file);
        file.textContent = Chess.Files.nameFor(fileIndex);
        file.classList.add("file");
      }
    };
    that.render();
    return that;
  };
}

window.addEventListener("load", function() {
  var body = document.querySelector("body");
  var persister = Chess.Persister({name: "state"});
  var model = Chess.Model({persister: persister});
  var view = Chess.View({element: body, model: model});
  var boardPresenter = Chess.BoardPresenter({model: model, view: view, persister: persister});
});

