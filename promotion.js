var Chess = Chess || {};
Chess.PromotionView = Chess.PromotionView || function(spec) {
  var that = {};
  var presenter = spec.presenter;
  var container = spec.container;
  var square = spec.square;
  var dialog;
  that.show = function(spec) {
    var appendPieceElement = function(container, kind) {
      var document = container.ownerDocument;
      var element = document.createElement("div");
      element.id = Chess.Kinds.nameFor(kind);
      element.classList.add("choice");
      element.innerHTML = Chess.Figurines[kind];
      element.onclick = function(event) {
        event.stopPropagation();
        presenter.promote(square, element.id);
      };
      container.appendChild(element);
    }; 
    var document = container.ownerDocument;
    if(!dialog) {
      dialog = document.createElement("div");
      dialog.style.top = spec.y+"px";
      dialog.style.left = spec.x+"px";
      dialog.id = "promotion-dialog";
      var header = document.createElement("div");
      header.innerHTML = "Choose a promotion";
      dialog.appendChild(header);
      container.appendChild(dialog);
      appendPieceElement(dialog, Chess.Kinds.Q);
      appendPieceElement(dialog, Chess.Kinds.R);
      appendPieceElement(dialog, Chess.Kinds.B);
      appendPieceElement(dialog, Chess.Kinds.N);
    }
  };
  that.hide = function() {
    var document = container.ownerDocument;
    if(!dialog) return;
    dialog.parentElement.removeChild(dialog);
    dialog = undefined;
  };
  return that;
};
