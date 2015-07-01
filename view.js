if(!Chess) {
  var Chess = {};
}

if(!Chess.View) {
  Chess.View = function(spec) {
    var that = {};
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
      square.onmouseover = function(event) {
        event.target.classList.add("dragenter");
        return false;
      };
      square.onmouseout = function(event) {
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
        event.target.style.display = "block";
        var piece = JSON.parse(event.dataTransfer.getData("text/plain"));
        var from = piece.square;
        var to = event.target.location;
        if(!to) {
          to = event.target.parentNode.location;
        }
        try {
          spec.model.move({from: piece.square, to: to});
          that.render(spec.element);
        } catch (error) {
          error.reason = error.reason || "unknown reason";
          var messageView = Chess.MessageView({message: error.message+":<br/>"+error.reason, x: event.clientX, y: event.clientY});
          // messageView.message = error;
          messageView.show(function() {
            that.render(spec.element);
          });
        }
      };
      return square;
    };
    that.render = function(element) {
      var document = element.ownerDocument;
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
      that.pieces.render();
    };
    that.pieces = spec.pieces({model: spec.model});
    that.render(spec.element);
    return that;
  };
}

window.addEventListener("load", function() {
  var persister = Chess.Persister({name: "state"});
  var model = Chess.Model({persister: persister});
  var body = document.querySelector("body");
  var view = Chess.View({element: body, model: model, pieces: Chess.Pieces});
});

