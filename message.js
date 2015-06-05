var Chess = Chess || {};
Chess.MessageView = Chess.MessageView || function(spec) {
  var that = {};
  container = spec.container || document.querySelector(".board");
  var element = container.ownerDocument.createElement("div");
  element.classList.add("message");
  element.innerHTML = spec.message;
  element.style.top = spec.y+"px";
  element.style.left = spec.x+"px";
  container.appendChild(element);
  element.onclick = function() {
    that.hide();
    if(that.callback) {
      that.callback();
    }
  };
  that.show = function(callback) {
    element.classList.remove("hidden");
    that.callback = callback;
  };
  that.hide = function() {
    element.classList.add("hidden");
  };
  Object.defineProperty(that, "message", {
    set: function(value) {
      element.textContent = value;
    },
  });
  return that;
};