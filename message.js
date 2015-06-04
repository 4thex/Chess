Chess.MessageView = Chess.MessageView || function(message, container) {
  var that = {};
  container = container || document.body;
  var element = container.ownerDocument.createElement("div");
  element.classList.add("message");
  element.textContent = message;
  container.appendChild(element);
  element.onclick = function() {
    that.hide();
  };
  that.show = function() {
    element.classList.remove("hidden");
  };
  that.hide = function() {
    element.classList.add("hidden");
  };
  Object.defineProperty(that, "message", {
    set: function(value) {
      element.textContent = value;
    },
  });
};