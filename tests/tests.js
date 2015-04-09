QUnit.module("Model");
QUnit.test("Peek returns correct pieces initially", function(assert) {
  var model = Chess.Model();
  var verifyThat = function(tile, expected) {
    var piece = model.peek(tile);
    assert.deepEqual(piece, expected, "Tile " + Chess.Model.Files.nameFor(tile.file) + Chess.Model.Ranks.nameFor(tile.rank) + 
      " is " + Chess.Model.Colors.nameFor(piece.color) + " " + Chess.Model.Kinds.nameFor(piece.kind));
  };
  verifyThat({file: model.static.Files.a, rank: model.static.Ranks[8]}, {color: model.static.Colors.Black, kind: model.static.Kinds.R});
  verifyThat({file: model.static.Files.b, rank: model.static.Ranks[8]}, {color: model.static.Colors.Black, kind: model.static.Kinds.N});
  verifyThat({file: model.static.Files.c, rank: model.static.Ranks[8]}, {color: model.static.Colors.Black, kind: model.static.Kinds.B});
  verifyThat({file: model.static.Files.d, rank: model.static.Ranks[8]}, {color: model.static.Colors.Black, kind: model.static.Kinds.Q});
  verifyThat({file: model.static.Files.e, rank: model.static.Ranks[8]}, {color: model.static.Colors.Black, kind: model.static.Kinds.K});
  verifyThat({file: model.static.Files.f, rank: model.static.Ranks[8]}, {color: model.static.Colors.Black, kind: model.static.Kinds.B});
  verifyThat({file: model.static.Files.g, rank: model.static.Ranks[8]}, {color: model.static.Colors.Black, kind: model.static.Kinds.N});
  verifyThat({file: model.static.Files.h, rank: model.static.Ranks[8]}, {color: model.static.Colors.Black, kind: model.static.Kinds.R});
  verifyThat({file: model.static.Files.a, rank: model.static.Ranks[7]}, {color: model.static.Colors.Black, kind: model.static.Kinds.P});
  verifyThat({file: model.static.Files.b, rank: model.static.Ranks[7]}, {color: model.static.Colors.Black, kind: model.static.Kinds.P});
  verifyThat({file: model.static.Files.c, rank: model.static.Ranks[7]}, {color: model.static.Colors.Black, kind: model.static.Kinds.P});
  verifyThat({file: model.static.Files.d, rank: model.static.Ranks[7]}, {color: model.static.Colors.Black, kind: model.static.Kinds.P});
  verifyThat({file: model.static.Files.e, rank: model.static.Ranks[7]}, {color: model.static.Colors.Black, kind: model.static.Kinds.P});
  verifyThat({file: model.static.Files.f, rank: model.static.Ranks[7]}, {color: model.static.Colors.Black, kind: model.static.Kinds.P});
  verifyThat({file: model.static.Files.g, rank: model.static.Ranks[7]}, {color: model.static.Colors.Black, kind: model.static.Kinds.P});
  verifyThat({file: model.static.Files.h, rank: model.static.Ranks[7]}, {color: model.static.Colors.Black, kind: model.static.Kinds.P});
  verifyThat({file: model.static.Files.a, rank: model.static.Ranks[2]}, {color: model.static.Colors.White, kind: model.static.Kinds.P});
  verifyThat({file: model.static.Files.b, rank: model.static.Ranks[2]}, {color: model.static.Colors.White, kind: model.static.Kinds.P});
  verifyThat({file: model.static.Files.c, rank: model.static.Ranks[2]}, {color: model.static.Colors.White, kind: model.static.Kinds.P});
  verifyThat({file: model.static.Files.d, rank: model.static.Ranks[2]}, {color: model.static.Colors.White, kind: model.static.Kinds.P});
  verifyThat({file: model.static.Files.e, rank: model.static.Ranks[2]}, {color: model.static.Colors.White, kind: model.static.Kinds.P});
  verifyThat({file: model.static.Files.f, rank: model.static.Ranks[2]}, {color: model.static.Colors.White, kind: model.static.Kinds.P});
  verifyThat({file: model.static.Files.g, rank: model.static.Ranks[2]}, {color: model.static.Colors.White, kind: model.static.Kinds.P});
  verifyThat({file: model.static.Files.h, rank: model.static.Ranks[2]}, {color: model.static.Colors.White, kind: model.static.Kinds.P});
  verifyThat({file: model.static.Files.a, rank: model.static.Ranks[1]}, {color: model.static.Colors.White, kind: model.static.Kinds.R});
  verifyThat({file: model.static.Files.b, rank: model.static.Ranks[1]}, {color: model.static.Colors.White, kind: model.static.Kinds.N});
  verifyThat({file: model.static.Files.c, rank: model.static.Ranks[1]}, {color: model.static.Colors.White, kind: model.static.Kinds.B});
  verifyThat({file: model.static.Files.d, rank: model.static.Ranks[1]}, {color: model.static.Colors.White, kind: model.static.Kinds.Q});
  verifyThat({file: model.static.Files.e, rank: model.static.Ranks[1]}, {color: model.static.Colors.White, kind: model.static.Kinds.K});
  verifyThat({file: model.static.Files.f, rank: model.static.Ranks[1]}, {color: model.static.Colors.White, kind: model.static.Kinds.B});
  verifyThat({file: model.static.Files.g, rank: model.static.Ranks[1]}, {color: model.static.Colors.White, kind: model.static.Kinds.N});
  verifyThat({file: model.static.Files.h, rank: model.static.Ranks[1]}, {color: model.static.Colors.White, kind: model.static.Kinds.R});
});
QUnit.test("Peek returns undefined for file or rank outside range", function(assert) {
  var model = Chess.Model();
  assert.ok(!model.peek({file: -1, rank: 0}), "File below lower limit.");
  assert.ok(!model.peek({file: 8, rank: 7}), "File above upper limit.");
  assert.ok(!model.peek({file: 0, rank: -1}), "Rank below lower limit.");
  assert.ok(!model.peek({file: 7, rank: 8}), "Rank above upper limit.");
});

QUnit.module("Rules");
QUnit.test("Cannot move from an empty tile", function(assert) {
	var model = Chess.Model();
	var rules = Chess.Rules(model);
	var move = {
			from: {
				rank: model.static.Ranks[4],
				file: model.static.Files.a
			},
			to: {
				rank: model.static.Ranks[3],
				file: model.static.Files.a
			}
	};
	assert.ok(!rules.isLegal(move), "Moving from empty tile is illegal");
});
QUnit.test("Cannot move to tile that has piece of own color", function(assert) {
	var model = Chess.Model();
	model.peek = function(tile) {
	  return {color: Chess.Model.Colors.White, kind: Chess.Model.Kinds.P};
	};
	var rules = Chess.Rules(model);
	var move = {
			from: {
				rank: model.static.Ranks[3],
				file: model.static.Files.a
			},
			to: {
				rank: model.static.Ranks[4],
				file: model.static.Files.a
			}
	};
	assert.ok(!rules.isLegal(move), "Moving to tile with piece of own color is illegal");
});
QUnit.test("White pawn cannot move to a lower rank", function(assert) {
	var model = Chess.Model();
	model.peek = function(tile) {
	  if(tile.rank === model.static.Ranks[4]) {
	    return {color: model.static.Colors.White, kind: model.static.Kinds.P};
	  } else {
	    return undefined;
	  }
	};
	var rules = Chess.Rules(model);
	var move = {
			from: {
				rank: model.static.Ranks[4],
				file: model.static.Files.a
			},
			to: {
				rank: model.static.Ranks[3],
				file: model.static.Files.a
			}
	};
	assert.ok(!rules.isLegal(move), "Moving to lower rank is illegal");
});
QUnit.test("Black pawn cannot move to a higher rank", function(assert) {
	var model = Chess.Model();
	model.peek = function(tile) {
	  if(tile.rank === model.static.Ranks[3]) {
	    return {color: model.static.Colors.Black, kind: model.static.Kinds.P};
	  } else {
	    return undefined;
	  }
	};
	var rules = Chess.Rules(model);
	var move = {
			from: {
				rank: model.static.Ranks[3],
				file: model.static.Files.a
			},
			to: {
				rank: model.static.Ranks[4],
				file: model.static.Files.a
			}
	};
	assert.ok(!rules.isLegal(move), "Moving to higher rank is illegal");
});
QUnit.test("Black pawn can decrease 2 ranks when moved from rank 7", function(assert) {
	var model = Chess.Model();
	model.peek = function(tile) {
	  if(tile.rank === model.static.Ranks[7]) {
	    return {color: model.static.Colors.Black, kind: model.static.Kinds.P};
	  } else {
	    return undefined;
	  }
	};
	var rules = Chess.Rules(model);
	var move = {
			from: {
				rank: model.static.Ranks[7],
				file: model.static.Files.a
			},
			to: {
				rank: model.static.Ranks[5],
				file: model.static.Files.a
			}
	};
	assert.ok(rules.isLegal(move), "Moving 2 ranks is ok from rank 7");
});
QUnit.test("Black pawn cannot decrease 2 ranks when moved from rank lower than 7", function(assert) {
	var model = Chess.Model();
	model.peek = function(tile) {
	  if(tile.rank === model.static.Ranks[6]) {
	    return {color: model.static.Colors.Black, kind: model.static.Kinds.P};
	  } else {
	    return undefined;
	  }
	};
	var rules = Chess.Rules(model);
	var move = {
			from: {
				rank: model.static.Ranks[6],
				file: model.static.Files.a
			},
			to: {
				rank: model.static.Ranks[4],
				file: model.static.Files.a
			}
	};
	assert.ok(!rules.isLegal(move), "Moving 2 ranks is illegal from ranks lower than 7");
});
QUnit.test("Black pawn can only do 'en passant' capture on the next turn after opponent double-tile move", function(assert) {
  assert.ok(false, "Not implemented yet. It requires model history.");
});
QUnit.test("Black pawn can change file on capture", function(assert) {
  var model = Chess.Model();
	var rules = Chess.Rules(model);
	model.peek = function(tile) {
	  if(tile.rank === model.static.Ranks[4] && tile.file === model.static.Files.a) {
	    return {color: model.static.Colors.Black, kind: model.static.Kinds.P};
	  }
	  if(tile.rank === model.static.Ranks[3] && tile.file === model.static.Files.b) {
	    return {color: model.static.Colors.White, kind: model.static.Kinds.R};
	  }
    return undefined;
	};
	var move = {
			from: {
				rank: model.static.Ranks[4],
				file: model.static.Files.a
			},
			to: {
				rank: model.static.Ranks[3],
				file: model.static.Files.b
			}
	};
	assert.ok(rules.isLegal(move), "Moving to neighbouring file is legal on capture");
	model.peek = function(tile) {
	  if(tile.rank === model.static.Ranks[4] && tile.file === model.static.Files.a) {
	    return {color: model.static.Colors.Black, kind: model.static.Kinds.P};
	  }
    return undefined;
	};
  assert.ok(!rules.isLegal(move), "Moving to neightbouring file is illegal if destination tile is empty");
	model.peek = function(tile) {
	  if(tile.rank === model.static.Ranks[7] && tile.file === model.static.Files.a) {
	    return {color: model.static.Colors.Black, kind: model.static.Kinds.P};
	  }
	  if(tile.rank === model.static.Ranks[5] && tile.file === model.static.Files.b) {
	    return {color: model.static.Colors.White, kind: model.static.Kinds.R};
	  }
    return undefined;
	};
  move = {
			from: {
				rank: model.static.Ranks[7],
				file: model.static.Files.a
			},
			to: {
				rank: model.static.Ranks[5],
				file: model.static.Files.b
			}
	};  
  assert.ok(!rules.isLegal(move), "Can only move one rank when capturing changing file");
});
