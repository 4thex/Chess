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
QUnit.test("Call to whichFile returns correct file", function(assert) {
  var model = Chess.Model();
	model.peek = function(square) {
	  if(square.rank === model.static.Ranks[3] && square.file === model.static.Files.c) {
	    return {color: model.static.Colors.White, kind: model.static.Kinds.N};
	  }
    return undefined;
	};
	assert.strictEqual(model.whichFile(model.static.Kinds.N, model.static.Ranks[3], model.static.Colors.White), model.static.Files.c, "Expected c (2)");
});
QUnit.test("Call to whichRank returns correct rank", function(assert) {
  var model = Chess.Model();
	model.peek = function(square) {
	  if(square.rank === model.static.Ranks[3] && square.file === model.static.Files.c) {
	    return {color: model.static.Colors.White, kind: model.static.Kinds.N};
	  }
    return undefined;
	};
	assert.strictEqual(model.whichRank(model.static.Kinds.N, model.static.Files.c, model.static.Colors.White), model.static.Ranks[3], "Expected 3 (2)");
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
QUnit.test("White pawn can increase 2 ranks when moved from rank 2", function(assert) {
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
QUnit.test("White pawn cannot increase 2 ranks when moved from rank higher than 2", function(assert) {
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
QUnit.test("White pawn can only do 'en passant' capture on the next turn after opponent double-tile move", function(assert) {
  assert.ok(false, "Not implemented yet. It requires model history.");
});
QUnit.test("White pawn can change file on capture", function(assert) {
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

QUnit.test("Knight can move 2 ranks, and 1 file", function(assert) {
  var model = Chess.Model();
	var rules = Chess.Rules(model);
	model.peek = function(tile) {
	  if(tile.rank === model.static.Ranks[3] && tile.file === model.static.Files.c) {
	    return {color: model.static.Colors.White, kind: model.static.Kinds.N};
	  }
    return undefined;
	};
	var move = {
			from: {
				rank: model.static.Ranks[3],
				file: model.static.Files.c
			},
			to: {
				rank: model.static.Ranks[5],
				file: model.static.Files.b
			}
	};
	assert.ok(rules.isLegal(move), "Moving 2 ranks up and 1 file to the left is legal");
	
	move.to.file = model.static.Files.d;
	assert.ok(rules.isLegal(move), "Moving 2 ranks up and 1 file to the right is legal");
	
	move.to.rank = model.static.Ranks[1];
	move.to.file = model.static.Files.b;
	assert.ok(rules.isLegal(move), "Moving 2 ranks down and 1 file to the left is legal");

	move.to.file = model.static.Files.d;
	assert.ok(rules.isLegal(move), "Moving 2 ranks down and 1 file to the right is legal");
});

QUnit.test("Knight can move 1 rank, and 2 files", function(assert) {
  var model = Chess.Model();
	var rules = Chess.Rules(model);
	model.peek = function(tile) {
	  if(tile.rank === model.static.Ranks[3] && tile.file === model.static.Files.c) {
	    return {color: model.static.Colors.White, kind: model.static.Kinds.N};
	  }
    return undefined;
	};
	var move = {
			from: {
				rank: model.static.Ranks[3],
				file: model.static.Files.c
			},
			to: {
				rank: model.static.Ranks[4],
				file: model.static.Files.e
			}
	};
	assert.ok(rules.isLegal(move), "Moving 1 rank up and 2 files to the right is legal");
	
	move.to.file = model.static.Files.a;
	assert.ok(rules.isLegal(move), "Moving 1 rank up and 2 files to the left is legal");
	
	move.to.rank = model.static.Ranks[2];
	move.to.file = model.static.Files.a;
	assert.ok(rules.isLegal(move), "Moving 1 rank down and 2 files to the left is legal");

	move.to.file = model.static.Files.e;
	assert.ok(rules.isLegal(move), "Moving 1 rank down and 2 files to the right is legal");
  
});

QUnit.test("Knight cannot move 1 rank, and 1 file", function(assert) {
  var model = Chess.Model();
	var rules = Chess.Rules(model);
	model.peek = function(tile) {
	  if(tile.rank === model.static.Ranks[3] && tile.file === model.static.Files.c) {
	    return {color: model.static.Colors.White, kind: model.static.Kinds.N};
	  }
    return undefined;
	};
	var move = {
			from: {
				rank: model.static.Ranks[3],
				file: model.static.Files.c
			},
			to: {
				rank: model.static.Ranks[4],
				file: model.static.Files.d
			}
	};
	assert.ok(!rules.isLegal(move), "Moving 1 rank up and 1 file to the right is illegal");
	
	move.to.file = model.static.Files.b;
	assert.ok(!rules.isLegal(move), "Moving 1 rank up and 1 file to the left is illegal");
	
	move.to.rank = model.static.Ranks[2];
	move.to.file = model.static.Files.d;
	assert.ok(!rules.isLegal(move), "Moving 1 rank down and 1 file to the right is illegal");

	move.to.file = model.static.Files.b;
	assert.ok(!rules.isLegal(move), "Moving 1 rank down and 1 file to the left is illegal");
  
  
});

QUnit.test("Knight cannot move 2 ranks, and 2 files", function(assert) {
  var model = Chess.Model();
	var rules = Chess.Rules(model);
	model.peek = function(tile) {
	  if(tile.rank === model.static.Ranks[3] && tile.file === model.static.Files.c) {
	    return {color: model.static.Colors.White, kind: model.static.Kinds.N};
	  }
    return undefined;
	};
	var move = {
			from: {
				rank: model.static.Ranks[3],
				file: model.static.Files.c
			},
			to: {
				rank: model.static.Ranks[5],
				file: model.static.Files.e
			}
	};
	assert.ok(!rules.isLegal(move), "Moving 2 ranks up and 2 files to the right is illegal");
	
	move.to.file = model.static.Files.a;
	assert.ok(!rules.isLegal(move), "Moving 2 ranks up and 2 files to the left is illegal");

	move.to.rank = model.static.Ranks[1];
	move.to.file = model.static.Files.e;
	assert.ok(!rules.isLegal(move), "Moving 2 ranks down and 2 files to the right is illegal");

	move.to.file = model.static.Files.a;
	assert.ok(!rules.isLegal(move), "Moving 2 ranks down and 2 files to the left is illegal");
  
});
QUnit.test("Knight cannot move more than 2 ranks", function(assert) {
  var model = Chess.Model();
	var rules = Chess.Rules(model);
	model.peek = function(tile) {
	  if(tile.rank === model.static.Ranks[4] && tile.file === model.static.Files.d) {
	    return {color: model.static.Colors.White, kind: model.static.Kinds.N};
	  }
    return undefined;
	};
	var move = {
			from: {
				rank: model.static.Ranks[4],
				file: model.static.Files.d
			},
			to: {
				rank: model.static.Ranks[7],
				file: model.static.Files.e
			}
	};
	assert.ok(!rules.isLegal(move), "Moving 3 ranks up and 1 files to the right is illegal");

	move.to.file = model.static.Files.c;
	assert.ok(!rules.isLegal(move), "Moving 3 ranks up and 1 files to the left is illegal");

	move.to.rank = model.static.Ranks[1];
	move.to.file = model.static.Files.e;
	assert.ok(!rules.isLegal(move), "Moving 3 ranks down and 1 files to the right is illegal");

	move.to.file = model.static.Files.c;
	assert.ok(!rules.isLegal(move), "Moving 3 ranks down and 1 files to the left is illegal");
});

QUnit.test("Knight cannot move more than 2 files", function(assert) {
  var model = Chess.Model();
	var rules = Chess.Rules(model);
	model.peek = function(tile) {
	  if(tile.rank === model.static.Ranks[4] && tile.file === model.static.Files.d) {
	    return {color: model.static.Colors.White, kind: model.static.Kinds.N};
	  }
    return undefined;
	};
	var move = {
			from: {
				rank: model.static.Ranks[4],
				file: model.static.Files.d
			},
			to: {
				rank: model.static.Ranks[5],
				file: model.static.Files.g
			}
	};
	assert.ok(!rules.isLegal(move), "Moving 1 rank up and 3 files to the right is illegal");

	move.to.file = model.static.Files.a;
	assert.ok(!rules.isLegal(move), "Moving 1 rank up and 3 files to the left is illegal");

	move.to.rank = model.static.Ranks[3];
	move.to.file = model.static.Files.g;
	assert.ok(!rules.isLegal(move), "Moving 1 rank down and 3 files to the right is illegal");

	move.to.file = model.static.Files.a;
	assert.ok(!rules.isLegal(move), "Moving 1 rank down and 3 files to the left is illegal");
  
});

QUnit.test("Rook cannot move both rank and file", function(assert) {
  var model = Chess.Model();
	var rules = Chess.Rules(model);
	model.peek = function(tile) {
	  if(tile.rank === model.static.Ranks[4] && tile.file === model.static.Files.d) {
	    return {color: model.static.Colors.White, kind: model.static.Kinds.R};
	  }
    return undefined;
	};
	var move = {
			from: {
				rank: model.static.Ranks[4],
				file: model.static.Files.d
			},
			to: {
				rank: model.static.Ranks[5],
				file: model.static.Files.e
			}
	};
	assert.ok(!rules.isLegal(move), "Moving 1 rank up and 1 file to the right is illegal");
	move.to.file = model.static.Files.c;
	assert.ok(!rules.isLegal(move), "Moving 1 rank up and 1 file to the left is illegal");
	move.to.rank = model.static.Ranks[3];
	move.to.file = model.static.Files.e;
	assert.ok(!rules.isLegal(move), "Moving 1 rank down and 1 file to the right is illegal");
	move.to.file = model.static.Files.c;
	assert.ok(!rules.isLegal(move), "Moving 1 rank down and 1 file to the left is illegal");
});

QUnit.test("Rook cannot move past any piece in the way", function(assert) {
  var model = Chess.Model();
	var rules = Chess.Rules(model);
	model.peek = function(tile) {
	  if(tile.rank === model.static.Ranks[4] && tile.file === model.static.Files.d) {
	    return {color: model.static.Colors.White, kind: model.static.Kinds.R};
	  }
	  if(tile.rank === model.static.Ranks[5] && tile.file === model.static.Files.d) {
	    return {color: model.static.Colors.White, kind: model.static.Kinds.P};
	  }
	  if(tile.rank === model.static.Ranks[4] && tile.file === model.static.Files.e) {
	    return {color: model.static.Colors.White, kind: model.static.Kinds.P};
	  }
    return undefined;
	};
	var move = {
			from: {
				rank: model.static.Ranks[4],
				file: model.static.Files.d
			},
			to: {
				rank: model.static.Ranks[6],
				file: model.static.Files.d
			}
	};
	assert.ok(!rules.isLegal(move), "Moving past a piece on same file is illegal");
	move.to.rank = model.static.Ranks[4];
	move.to.file = model.static.Files.f;
	assert.ok(!rules.isLegal(move), "Moving past a piece on same rank is illegal");
});

QUnit.test("Rook can move 7 ranks", function(assert) {
  var model = Chess.Model();
	var rules = Chess.Rules(model);
	model.peek = function(tile) {
	  if(tile.rank === model.static.Ranks[1] && tile.file === model.static.Files.a) {
	    return {color: model.static.Colors.White, kind: model.static.Kinds.R};
	  }
    return undefined;
	};
	var move = {
			from: {
				rank: model.static.Ranks[1],
				file: model.static.Files.a
			},
			to: {
				rank: model.static.Ranks[8],
				file: model.static.Files.a
			}
	};
	assert.ok(rules.isLegal(move), "Moving 7 ranks is legal");
});

QUnit.test("Rook can move 7 files", function(assert) {
  var model = Chess.Model();
	var rules = Chess.Rules(model);
	model.peek = function(tile) {
	  if(tile.rank === model.static.Ranks[1] && tile.file === model.static.Files.a) {
	    return {color: model.static.Colors.White, kind: model.static.Kinds.R};
	  }
    return undefined;
	};
	var move = {
			from: {
				rank: model.static.Ranks[1],
				file: model.static.Files.a
			},
			to: {
				rank: model.static.Ranks[1],
				file: model.static.Files.h
			}
	};
	assert.ok(rules.isLegal(move), "Moving 7 files is legal");
});

QUnit.test("Bishop must move same rank and file distance", function(assert) {
  var model = Chess.Model();
	var rules = Chess.Rules(model);
	model.peek = function(tile) {
	  if(tile.rank === model.static.Ranks[1] && tile.file === model.static.Files.a) {
	    return {color: model.static.Colors.White, kind: model.static.Kinds.B};
	  }
    return undefined;
	};
	var move = {
			from: {
				rank: model.static.Ranks[1],
				file: model.static.Files.a
			},
			to: {
				rank: model.static.Ranks[8],
				file: model.static.Files.h
			}
	};
	assert.ok(rules.isLegal(move), "Moving 7 files to the right and 7 ranks up is legal");

	model.peek = function(tile) {
	  if(tile.rank === model.static.Ranks[8] && tile.file === model.static.Files.a) {
	    return {color: model.static.Colors.White, kind: model.static.Kinds.B};
	  }
    return undefined;
	};
	move.from.rank = model.static.Ranks[8];
	move.to.rank = model.static.Ranks[1];
	assert.ok(rules.isLegal(move), "Moving 7 files to the right and 7 ranks down is legal");
	
	model.peek = function(tile) {
	  if(tile.rank === model.static.Ranks[1] && tile.file === model.static.Files.h) {
	    return {color: model.static.Colors.White, kind: model.static.Kinds.B};
	  }
    return undefined;
	};
	move.from.file = model.static.Files.h;
	move.to.file = model.static.Files.a;
	move.from.rank = model.static.Ranks[1];
	move.to.rank = model.static.Ranks[8];
	assert.ok(rules.isLegal(move), "Moving 7 files to the left and 7 ranks up is legal");
	
	model.peek = function(tile) {
	  if(tile.rank === model.static.Ranks[8] && tile.file === model.static.Files.h) {
	    return {color: model.static.Colors.White, kind: model.static.Kinds.B};
	  }
    return undefined;
	};
	move.from.rank = model.static.Ranks[8];
	move.to.rank = model.static.Ranks[1];
	assert.ok(rules.isLegal(move), "Moving 7 files to the left and 7 ranks down is legal");
	
	move.to.rank = model.static.Ranks[2];
	assert.ok(!rules.isLegal(move), "Moving 7 files to the left and 6 ranks down is illegal");
});

QUnit.test("Bishop cannot move past any piece in the way", function(assert) {
  var model = Chess.Model();
	var rules = Chess.Rules(model);
	model.peek = function(tile) {
	  if(tile.rank === model.static.Ranks[1] && tile.file === model.static.Files.a) {
	    return {color: model.static.Colors.White, kind: model.static.Kinds.B};
	  }
	  if(tile.rank === model.static.Ranks[3] && tile.file === model.static.Files.c) {
	    return {color: model.static.Colors.Black, kind: model.static.Kinds.P};
	  }
    return undefined;
	};
	var move = {
			from: {
				rank: model.static.Ranks[1],
				file: model.static.Files.a
			},
			to: {
				rank: model.static.Ranks[8],
				file: model.static.Files.h
			}
	};
	assert.ok(!rules.isLegal(move), "Moving past a piece in the way is illegal");
});

QUnit.test("King cannot move more than one file and/or one rank", function(assert) {
  var model = Chess.Model();
	var rules = Chess.Rules(model);
	model.peek = function(tile) {
	  if(tile.rank === model.static.Ranks[4] && tile.file === model.static.Files.d) {
	    return {color: model.static.Colors.White, kind: model.static.Kinds.K};
	  }
    return undefined;
	};
	var move = {
			from: {
				rank: model.static.Ranks[4],
				file: model.static.Files.d
			},
			to: {
				rank: model.static.Ranks[6],
				file: model.static.Files.d
			}
	};
	assert.ok(!rules.isLegal(move), "Moving more than one rank up is illegal");
  
  move.to.rank = model.static.Ranks[2];
	assert.ok(!rules.isLegal(move), "Moving more than one rank down is illegal");
	
	move.to.rank = model.static.Ranks[4];
	move.to.rank = model.static.Files.f;
	assert.ok(!rules.isLegal(move), "Moving more than one file to the right is illegal");
	
	move.to.rank = model.static.Files.b;
	assert.ok(!rules.isLegal(move), "Moving more than one file to the left is illegal");
	
	move.to.rank = model.static.Ranks[6];
	move.to.file = model.static.Files.e;
	assert.ok(!rules.isLegal(move), "Moving more than one rank up, and one file to the left is illegal");
});

QUnit.test("King can move one file and/or one rank in all directions", function(assert) {
  var model = Chess.Model();
	var rules = Chess.Rules(model);
	model.peek = function(tile) {
	  if(tile.rank === model.static.Ranks[4] && tile.file === model.static.Files.d) {
	    return {color: model.static.Colors.White, kind: model.static.Kinds.K};
	  }
    return undefined;
	};
	var move = {
			from: {
				rank: model.static.Ranks[4],
				file: model.static.Files.d
			},
			to: {
				rank: model.static.Ranks[5],
				file: model.static.Files.d
			}
	};
	assert.ok(rules.isLegal(move), "Moving one rank up is legal");
	
	move.to.file = model.static.Files.e;
	assert.ok(rules.isLegal(move), "Moving one rank up, and one file to the right is legal");
	
	move.to.rank = model.static.Ranks[4];
	assert.ok(rules.isLegal(move), "Moving one file to the right is legal");
	
	move.to.rank = model.static.Ranks[3];
	assert.ok(rules.isLegal(move), "Moving one rank down, and one file to the right is legal");
	
	move.to.file = model.static.Files.d;
	assert.ok(rules.isLegal(move), "Moving one rank down is legal");
	
	move.to.file = model.static.Files.c;
	assert.ok(rules.isLegal(move), "Moving one rank down, and one file to the left is legal");
	
	move.to.rank = model.static.Ranks[4];
	assert.ok(rules.isLegal(move), "Moving one file to the left is legal");
	
	move.to.rank = model.static.Ranks[5];
	assert.ok(rules.isLegal(move), "Moving one rank up, and one file to the left is legal");
});

QUnit.test("Queen can move straight in all directions", function(assert) {
  var model = Chess.Model();
	var rules = Chess.Rules(model);
	model.peek = function(tile) {
	  if(tile.rank === model.static.Ranks[4] && tile.file === model.static.Files.d) {
	    return {color: model.static.Colors.White, kind: model.static.Kinds.Q};
	  }
    return undefined;
	};
	var move = {
			from: {
				rank: model.static.Ranks[4],
				file: model.static.Files.d
			},
			to: {
				rank: model.static.Ranks[8],
				file: model.static.Files.d
			}
	};
	assert.ok(rules.isLegal(move), "Moving 4 ranks up is legal");
	
	move.to.file = model.static.Files.h;
	assert.ok(rules.isLegal(move), "Moving 4 ranks up, and 4 files to the right is legal");
	
	move.to.rank = model.static.Ranks[4];
	assert.ok(rules.isLegal(move), "Moving 4 files to the right is legal");
	
	move.to.rank = model.static.Ranks[1];
	move.to.file = model.static.Files.g;
	assert.ok(rules.isLegal(move), "Moving 3 ranks down, and 3 files to the right is legal");
	
	move.to.file = model.static.Files.d;
	assert.ok(rules.isLegal(move), "Moving 3 ranks down is legal");
	
	move.to.file = model.static.Files.a;
	assert.ok(rules.isLegal(move), "Moving 3 ranks down, and 3 file to the left is legal");
	
	move.to.rank = model.static.Ranks[4];
	assert.ok(rules.isLegal(move), "Moving 3 files to the left is legal");
	
	move.to.rank = model.static.Ranks[8];
	assert.ok(!rules.isLegal(move), "Moving 3 ranks up, and 3 files to the left is legal");
});

QUnit.test("Queen cannot move different count of file and rank unless one is 0", function(assert) {
  var model = Chess.Model();
	var rules = Chess.Rules(model);
	model.peek = function(tile) {
	  if(tile.rank === model.static.Ranks[4] && tile.file === model.static.Files.d) {
	    return {color: model.static.Colors.White, kind: model.static.Kinds.Q};
	  }
    return undefined;
	};
	var move = {
			from: {
				rank: model.static.Ranks[4],
				file: model.static.Files.d
			},
			to: {
				rank: model.static.Ranks[8],
				file: model.static.Files.e
			}
	};
	assert.ok(!rules.isLegal(move), "Moving 4 ranks up, and 1 file to the right is illegal");
	
	move.to.file = model.static.Files.f;
	assert.ok(!rules.isLegal(move), "Moving 4 ranks up, and 2 files to the right is illegal");
	
	move.to.rank = model.static.Ranks[5];
	assert.ok(!rules.isLegal(move), "Moving 1 rank up, and 2 files to the right is illegal");
	
	move.to.rank = model.static.Ranks[1];
	move.to.file = model.static.Files.f;
	assert.ok(!rules.isLegal(move), "Moving 3 ranks down, and 2 files to the right is illegal");
	
	move.to.file = model.static.Files.f;
	assert.ok(!rules.isLegal(move), "Moving 3 ranks down, and 2 files to the right is illegal");
	
	move.to.file = model.static.Files.b;
	assert.ok(!rules.isLegal(move), "Moving 3 ranks down, and 2 files to the left is illegal");
	
	move.to.rank = model.static.Ranks[3];
	assert.ok(!rules.isLegal(move), "Moving 3 files to the left, and 1 rank down is illegal");
	
	move.to.rank = model.static.Ranks[8];
	assert.ok(!rules.isLegal(move), "Moving 3 ranks up, and 2 files to the left is illegal");
});

QUnit.module("Moves");
QUnit.test("Move translates [file rank] pawn-move correctly", function(assert) {
  var model = Chess.Model();
  model.peek = function(tile) {
	  if(tile.rank === model.static.Ranks[2] && tile.file === model.static.Files.e) {
	    return {color: model.static.Colors.White, kind: model.static.Kinds.P};
	  }
    return undefined;
	};

  var move = Chess.Move.createFromSan({san: "e3", model: model, by: model.static.Colors.White});   
  assert.strictEqual(move.to.file, model.static.Files.e, "Expected file e");
  assert.strictEqual(move.to.rank, model.static.Ranks["3"], "Expected rank 3");
  assert.strictEqual(move.from.file, model.static.Files.e, "Expected file e");
  assert.strictEqual(move.from.rank, model.static.Ranks["2"], "Expected rank 2");
});

QUnit.test("Move translates O-O (king's castle) correctly", function(assert) {
  var model = Chess.Model();
  model.peek = function(tile) {
	  if(tile.rank === model.static.Ranks[1] && tile.file === model.static.Files.e) {
	    return {color: model.static.Colors.White, kind: model.static.Kinds.K};
	  }
	  if(tile.rank === model.static.Ranks[1] && tile.file === model.static.Files.h) {
	    return {color: model.static.Colors.White, kind: model.static.Kinds.K};
	  }
    return undefined;
	};

  var move = Chess.Move.createFromSan({san: "O-O", model: model, by: model.static.Colors.White});   
  assert.strictEqual(move.to.file, model.static.Files.g, "Expected file g");
  assert.strictEqual(move.to.rank, model.static.Ranks["1"], "Expected rank 1");
  assert.strictEqual(move.from.file, model.static.Files.e, "Expected file e");
  assert.strictEqual(move.from.rank, model.static.Ranks["1"], "Expected rank 1");
  
});

QUnit.test("Move translates O-O-O (queen's castle) correctly", function(assert) {
});














