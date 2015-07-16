(function(){
  window.addEventListener("load", function() {
    var container = document.querySelector("#promotion-container");
    var presenter = {
      promote: function(square, kind) {
        var squareString = Chess.Files.nameFor(square.file)+Chess.Ranks.nameFor(square.rank);
        console.log("Promoting "+squareString+" to "+kind);
        view.hide();
      }
    };
    var square = {file: Chess.Files.a, rank: Chess.Ranks[8]};
    var view = Chess.PromotionView({square: square, presenter: presenter, container: container});
    container.onclick = function(event) {
      view.show({x: event.clientX, y: event.clientY});
    };
    
  });
}());