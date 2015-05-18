var Chain = Chain || function(model) {
  var conditions = [];
  var prerequisites = [];
  var result = function(move) {
    move.piece = model.peek(move.from);
    if(!prerequisites.every(function(condition) {
      var result = condition(move);
		  return result;
		})) {
		  // These rules do not apply
		  return true;
		}
    return conditions.every(function(condition) {
      var result = condition(move);
      // if(!result) {
      //   console.log("Chain.result: "+condition+" returned false");
      // }
		  return result;
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