if(!Chess) {
  var Chess = {};
}

if(!Chess.View) {
  Chess.View = function(spec) {
    var that = {};
    var files = ["a", "b", "c", "d", "e", "f", "g", "h"];
    var createSquare = function(container, fileIndex, rank) {
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
      if((rank + fileIndex) % 2) {
        square.classList.add("black");
      } else {
        square.classList.add("white");
      }
      square.classList.add("square");
      square.setAttribute("id", "square-"+files[fileIndex]+rank);
      square.location = {file: fileIndex, rank:rank-1};
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
      for(var rank=8; rank>0; --rank) {
        var rankElement = document.createElement("div");
        container.appendChild(rankElement);
        rankElement.textContent = rank;
        rankElement.classList.add("rank");
        
        for(fileIndex=0; fileIndex<files.length; ++fileIndex) {
          createSquare(container, fileIndex, rank);
        }
      }
      var cornerElement = document.createElement("div");
      container.appendChild(cornerElement);
      cornerElement.classList.add("corner");
      for(fileIndex=0; fileIndex<files.length; ++fileIndex) {
        var file = document.createElement("div");
        container.appendChild(file);
        file.textContent = files[fileIndex];
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
  var model = Chess.Model();
  var body = document.querySelector("body");
  var view = Chess.View({element: body, model: model, pieces: Chess.Pieces});
});

