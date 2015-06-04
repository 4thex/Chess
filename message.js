Chess.MessageView = Chess.MessageView || function(message, element) {
  var that = {};
  element = element || document.body;
  element.ownerDocument.createElement("div");
  element.classList.add("message");
  element.textContent = message;
  that.show = function() {
    element.classList.remove("hidden");
  };
  that.hide = function() {
    element.classList.add("hidden");
  };
};