var Chain = Chain || function(model) {
  var conditions = [];
  var prerequisites = [];
  var result = function(move) {
    move.piece = model.peek(move.from);
    if(!prerequisites.every(function(condition) {
		  return condition(move);
		})) {
		  // These rules do not apply
		  return true;
		}
    return conditions.every(function(condition) {
      return condition(move);
    });
  };
  result.and = function(condition) {
    conditions.push(condition);
    return result;
  };
  result.when = function(condition) {
    prerequisites.push(condition);
    return result;
  };
  return result;
};