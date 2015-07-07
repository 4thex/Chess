Object.prototype.nameFor = Object.prototype.nameFor || function(value) {
  var property;
  for(property in this) {
    if(this[property] === value) {
      return property;
    }
  }
  return undefined;
};

var Chess = Chess || {};
Chess.Colors = {White: 0, Black: 1};
Chess.Kinds = {K: 0,	Q: 1, B: 2,	N: 3, R: 4, P: 5};
Chess.Files = {a: 0, b: 1, c: 2, d: 3, e: 4, f: 5, g: 6, h: 7};
Chess.Ranks = {1: 0, 2: 1, 3: 2, 4: 3, 5: 4, 6: 5, 7: 6, 8: 7};