if(!Chess) {
  var Chess = {};
}

if(!Chess.View) {
  Chess.View = function(spec) {
    var that = {};
    var files = ["a", "b", "c", "d", "e", "f", "g", "h"];
    that.render = function(element) {
      var document = element.ownerDocument;
      for(var rank=8; rank>0; --rank) {
        var rankElement = document.createElement("div");
        element.appendChild(rankElement);
        rankElement.textContent = rank;
        rankElement.classList.add("rank");
        for(var fileIndex=0; fileIndex<files.length; ++fileIndex) {
          var tile = document.createElement("div");
          element.appendChild(tile);
          if((rank + fileIndex) % 2) {
            tile.classList.add("black");
          } else {
            tile.classList.add("white");
          }
          tile.classList.add("tile");
          tile.setAttribute("id", "tile-"+files[fileIndex]+rank);
        }
      }
      var cornerElement = document.createElement("div");
      element.appendChild(cornerElement);
      cornerElement.classList.add("corner");
      for(var fileIndex=0; fileIndex<files.length; ++fileIndex) {
        var file = document.createElement("div");
        element.appendChild(file);
        file.textContent = files[fileIndex];
        file.classList.add("file");
      }
    };
    that.render(spec.element);
    return that;
  };
};

window.addEventListener("load", function() {
  var body = document.querySelector("body");
  var view = Chess.View({element: body});
});
