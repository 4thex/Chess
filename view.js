if(!Chess) {
  var Chess = {};
}

if(!Chess.View) {
  Chess.View = function(spec) {
    var that = {};
    var files = ["a", "b", "c", "d", "e", "f", "g", "h"];
    that.render = function(element) {
      var document = element.ownerDocument;
      var container = document.createElement("div");
      container.classList.add("board");
      element.appendChild(container);
      var fileIndex;
      for(var rank=8; rank>0; --rank) {
        var rankElement = document.createElement("div");
        container.appendChild(rankElement);
        rankElement.textContent = rank;
        rankElement.classList.add("rank");
        
        for(fileIndex=0; fileIndex<files.length; ++fileIndex) {
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
    };
    that.render(spec.element);
    return that;
  };
}

window.addEventListener("load", function() {
  var body = document.querySelector("body");
  var view = Chess.View({element: body});
});;