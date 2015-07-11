QUnit.module("Model");
QUnit.test("Peek returns correct pieces initially", function(assert) {
  var model = Chess.Model();
  var verifyThat = function(tile, expected) {
    var piece = model.peek(tile);
    assert.deepEqual(piece, expected, "Tile " + Chess.Files.nameFor(tile.file) + Chess.Ranks.nameFor(tile.rank) + 
      " is " + Chess.Colors.nameFor(piece.color) + " " + Chess.Kinds.nameFor(piece.kind));
  };
  verifyThat({file: Chess.Files.a, rank: Chess.Ranks[8]}, {color: Chess.Colors.Black, kind: Chess.Kinds.R});
  verifyThat({file: Chess.Files.b, rank: Chess.Ranks[8]}, {color: Chess.Colors.Black, kind: Chess.Kinds.N});
  verifyThat({file: Chess.Files.c, rank: Chess.Ranks[8]}, {color: Chess.Colors.Black, kind: Chess.Kinds.B});
  verifyThat({file: Chess.Files.d, rank: Chess.Ranks[8]}, {color: Chess.Colors.Black, kind: Chess.Kinds.Q});
  verifyThat({file: Chess.Files.e, rank: Chess.Ranks[8]}, {color: Chess.Colors.Black, kind: Chess.Kinds.K});
  verifyThat({file: Chess.Files.f, rank: Chess.Ranks[8]}, {color: Chess.Colors.Black, kind: Chess.Kinds.B});
  verifyThat({file: Chess.Files.g, rank: Chess.Ranks[8]}, {color: Chess.Colors.Black, kind: Chess.Kinds.N});
  verifyThat({file: Chess.Files.h, rank: Chess.Ranks[8]}, {color: Chess.Colors.Black, kind: Chess.Kinds.R});
  verifyThat({file: Chess.Files.a, rank: Chess.Ranks[7]}, {color: Chess.Colors.Black, kind: Chess.Kinds.P});
  verifyThat({file: Chess.Files.b, rank: Chess.Ranks[7]}, {color: Chess.Colors.Black, kind: Chess.Kinds.P});
  verifyThat({file: Chess.Files.c, rank: Chess.Ranks[7]}, {color: Chess.Colors.Black, kind: Chess.Kinds.P});
  verifyThat({file: Chess.Files.d, rank: Chess.Ranks[7]}, {color: Chess.Colors.Black, kind: Chess.Kinds.P});
  verifyThat({file: Chess.Files.e, rank: Chess.Ranks[7]}, {color: Chess.Colors.Black, kind: Chess.Kinds.P});
  verifyThat({file: Chess.Files.f, rank: Chess.Ranks[7]}, {color: Chess.Colors.Black, kind: Chess.Kinds.P});
  verifyThat({file: Chess.Files.g, rank: Chess.Ranks[7]}, {color: Chess.Colors.Black, kind: Chess.Kinds.P});
  verifyThat({file: Chess.Files.h, rank: Chess.Ranks[7]}, {color: Chess.Colors.Black, kind: Chess.Kinds.P});
  verifyThat({file: Chess.Files.a, rank: Chess.Ranks[2]}, {color: Chess.Colors.White, kind: Chess.Kinds.P});
  verifyThat({file: Chess.Files.b, rank: Chess.Ranks[2]}, {color: Chess.Colors.White, kind: Chess.Kinds.P});
  verifyThat({file: Chess.Files.c, rank: Chess.Ranks[2]}, {color: Chess.Colors.White, kind: Chess.Kinds.P});
  verifyThat({file: Chess.Files.d, rank: Chess.Ranks[2]}, {color: Chess.Colors.White, kind: Chess.Kinds.P});
  verifyThat({file: Chess.Files.e, rank: Chess.Ranks[2]}, {color: Chess.Colors.White, kind: Chess.Kinds.P});
  verifyThat({file: Chess.Files.f, rank: Chess.Ranks[2]}, {color: Chess.Colors.White, kind: Chess.Kinds.P});
  verifyThat({file: Chess.Files.g, rank: Chess.Ranks[2]}, {color: Chess.Colors.White, kind: Chess.Kinds.P});
  verifyThat({file: Chess.Files.h, rank: Chess.Ranks[2]}, {color: Chess.Colors.White, kind: Chess.Kinds.P});
  verifyThat({file: Chess.Files.a, rank: Chess.Ranks[1]}, {color: Chess.Colors.White, kind: Chess.Kinds.R});
  verifyThat({file: Chess.Files.b, rank: Chess.Ranks[1]}, {color: Chess.Colors.White, kind: Chess.Kinds.N});
  verifyThat({file: Chess.Files.c, rank: Chess.Ranks[1]}, {color: Chess.Colors.White, kind: Chess.Kinds.B});
  verifyThat({file: Chess.Files.d, rank: Chess.Ranks[1]}, {color: Chess.Colors.White, kind: Chess.Kinds.Q});
  verifyThat({file: Chess.Files.e, rank: Chess.Ranks[1]}, {color: Chess.Colors.White, kind: Chess.Kinds.K});
  verifyThat({file: Chess.Files.f, rank: Chess.Ranks[1]}, {color: Chess.Colors.White, kind: Chess.Kinds.B});
  verifyThat({file: Chess.Files.g, rank: Chess.Ranks[1]}, {color: Chess.Colors.White, kind: Chess.Kinds.N});
  verifyThat({file: Chess.Files.h, rank: Chess.Ranks[1]}, {color: Chess.Colors.White, kind: Chess.Kinds.R});
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
	  if(square.rank === Chess.Ranks[3] && square.file === Chess.Files.c) {
	    return {color: Chess.Colors.White, kind: Chess.Kinds.N};
	  }
    return undefined;
	};
	assert.strictEqual(model.whichFile(Chess.Kinds.N, Chess.Ranks[3], Chess.Colors.White), Chess.Files.c, "Expected c (2)");
});
QUnit.test("Call to whichRank returns correct rank", function(assert) {
  var model = Chess.Model();
	model.peek = function(square) {
	  if(square.rank === Chess.Ranks[3] && square.file === Chess.Files.c) {
	    return {color: Chess.Colors.White, kind: Chess.Kinds.N};
	  }
    return undefined;
	};
	assert.strictEqual(model.whichRank(Chess.Kinds.N, Chess.Files.c, Chess.Colors.White), Chess.Ranks[3], "Expected 3 (2)");
});


QUnit.module("Rules");
QUnit.test("Cannot move from an empty tile", function(assert) {
	var model = Chess.Model();
	var rules = Chess.Rules(model);
	var move = {
			from: {
				rank: Chess.Ranks[4],
				file: Chess.Files.a
			},
			to: {
				rank: Chess.Ranks[3],
				file: Chess.Files.a
			}
	};
	assert.ok(!rules.isLegal(move), "Moving from empty tile is illegal");
});
QUnit.test("Cannot move to tile that has piece of own color", function(assert) {
	var model = Chess.Model();
	model.peek = function(tile) {
	  return {color: Chess.Colors.White, kind: Chess.Kinds.P};
	};
	var rules = Chess.Rules(model);
	var move = {
			from: {
				rank: Chess.Ranks[3],
				file: Chess.Files.a
			},
			to: {
				rank: Chess.Ranks[4],
				file: Chess.Files.a
			}
	};
	assert.ok(!rules.isLegal(move), "Moving to tile with piece of own color is illegal");
});

QUnit.test("White pawn cannot move to a lower rank", function(assert) {
	var model = Chess.Model();
	model.peek = function(tile) {
	  if(tile.rank === Chess.Ranks[4]) {
	    return {color: Chess.Colors.White, kind: Chess.Kinds.P};
	  } else {
	    return undefined;
	  }
	};
	var rules = Chess.Rules(model);
	var move = {
			from: {
				rank: Chess.Ranks[4],
				file: Chess.Files.a
			},
			to: {
				rank: Chess.Ranks[3],
				file: Chess.Files.a
			}
	};
	assert.ok(!rules.isLegal(move), "Moving to lower rank is illegal");
});
QUnit.test("White pawn can increase 2 ranks when moved from rank 2", function(assert) {
	var model = Chess.Model();
	model.peek = function(tile) {
	  if(tile.rank === Chess.Ranks[7]) {
	    return {color: Chess.Colors.Black, kind: Chess.Kinds.P};
	  } else {
	    return undefined;
	  }
	};
	var rules = Chess.Rules(model);
	var move = {
			from: {
				rank: Chess.Ranks[7],
				file: Chess.Files.a
			},
			to: {
				rank: Chess.Ranks[5],
				file: Chess.Files.a
			}
	};
	assert.ok(rules.isLegal(move), "Moving 2 ranks is ok from rank 7");
});
QUnit.test("White pawn cannot increase 2 ranks when moved from rank higher than 2", function(assert) {
	var model = Chess.Model();
	model.peek = function(tile) {
	  if(tile.rank === Chess.Ranks[6]) {
	    return {color: Chess.Colors.Black, kind: Chess.Kinds.P};
	  } else {
	    return undefined;
	  }
	};
	var rules = Chess.Rules(model);
	var move = {
			from: {
				rank: Chess.Ranks[6],
				file: Chess.Files.a
			},
			to: {
				rank: Chess.Ranks[4],
				file: Chess.Files.a
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
	  if(tile.rank === Chess.Ranks[4] && tile.file === Chess.Files.a) {
	    return {color: Chess.Colors.Black, kind: Chess.Kinds.P};
	  }
	  if(tile.rank === Chess.Ranks[3] && tile.file === Chess.Files.b) {
	    return {color: Chess.Colors.White, kind: Chess.Kinds.R};
	  }
    return undefined;
	};
	var move = {
			from: {
				rank: Chess.Ranks[4],
				file: Chess.Files.a
			},
			to: {
				rank: Chess.Ranks[3],
				file: Chess.Files.b
			}
	};
	assert.ok(rules.isLegal(move), "Moving to neighbouring file is legal on capture");
	model.peek = function(tile) {
	  if(tile.rank === Chess.Ranks[4] && tile.file === Chess.Files.a) {
	    return {color: Chess.Colors.Black, kind: Chess.Kinds.P};
	  }
    return undefined;
	};
  assert.ok(!rules.isLegal(move), "Moving to neightbouring file is illegal if destination tile is empty");
	model.peek = function(tile) {
	  if(tile.rank === Chess.Ranks[7] && tile.file === Chess.Files.a) {
	    return {color: Chess.Colors.Black, kind: Chess.Kinds.P};
	  }
	  if(tile.rank === Chess.Ranks[5] && tile.file === Chess.Files.b) {
	    return {color: Chess.Colors.White, kind: Chess.Kinds.R};
	  }
    return undefined;
	};
  move = {
			from: {
				rank: Chess.Ranks[7],
				file: Chess.Files.a
			},
			to: {
				rank: Chess.Ranks[5],
				file: Chess.Files.b
			}
	};  
  assert.ok(!rules.isLegal(move), "Can only move one rank when capturing changing file");
});

QUnit.test("Black pawn cannot move to a higher rank", function(assert) {
	var model = Chess.Model();
	model.peek = function(tile) {
	  if(tile.rank === Chess.Ranks[3]) {
	    return {color: Chess.Colors.Black, kind: Chess.Kinds.P};
	  } else {
	    return undefined;
	  }
	};
	var rules = Chess.Rules(model);
	var move = {
			from: {
				rank: Chess.Ranks[3],
				file: Chess.Files.a
			},
			to: {
				rank: Chess.Ranks[4],
				file: Chess.Files.a
			}
	};
	assert.ok(!rules.isLegal(move), "Moving to higher rank is illegal");
});
QUnit.test("Black pawn can decrease 2 ranks when moved from rank 7", function(assert) {
	var model = Chess.Model();
	model.peek = function(tile) {
	  if(tile.rank === Chess.Ranks[7]) {
	    return {color: Chess.Colors.Black, kind: Chess.Kinds.P};
	  } else {
	    return undefined;
	  }
	};
	var rules = Chess.Rules(model);
	var move = {
			from: {
				rank: Chess.Ranks[7],
				file: Chess.Files.a
			},
			to: {
				rank: Chess.Ranks[5],
				file: Chess.Files.a
			}
	};
	assert.ok(rules.isLegal(move), "Moving 2 ranks is ok from rank 7");
});
QUnit.test("Black pawn cannot decrease 2 ranks when moved from rank lower than 7", function(assert) {
	var model = Chess.Model();
	model.peek = function(tile) {
	  if(tile.rank === Chess.Ranks[6]) {
	    return {color: Chess.Colors.Black, kind: Chess.Kinds.P};
	  } else {
	    return undefined;
	  }
	};
	var rules = Chess.Rules(model);
	var move = {
			from: {
				rank: Chess.Ranks[6],
				file: Chess.Files.a
			},
			to: {
				rank: Chess.Ranks[4],
				file: Chess.Files.a
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
	model.peek = function(square) {
	  if(square.rank === Chess.Ranks[4] && square.file === Chess.Files.a) {
	    return {color: Chess.Colors.Black, kind: Chess.Kinds.P};
	  }
	  if(square.rank === Chess.Ranks[3] && square.file === Chess.Files.b) {
	    return {color: Chess.Colors.White, kind: Chess.Kinds.R};
	  }
    return undefined;
	};
	var move = {
			from: {
				rank: Chess.Ranks[4],
				file: Chess.Files.a
			},
			to: {
				rank: Chess.Ranks[3],
				file: Chess.Files.b
			}
	};
	assert.ok(rules.isLegal(move), "Moving to neighbouring file is legal on capture");
	model.peek = function(tile) {
	  if(tile.rank === Chess.Ranks[4] && tile.file === Chess.Files.a) {
	    return {color: Chess.Colors.Black, kind: Chess.Kinds.P};
	  }
    return undefined;
	};
  assert.ok(!rules.isLegal(move), "Moving to neightbouring file is illegal if destination tile is empty");
	model.peek = function(tile) {
	  if(tile.rank === Chess.Ranks[7] && tile.file === Chess.Files.a) {
	    return {color: Chess.Colors.Black, kind: Chess.Kinds.P};
	  }
	  if(tile.rank === Chess.Ranks[5] && tile.file === Chess.Files.b) {
	    return {color: Chess.Colors.White, kind: Chess.Kinds.R};
	  }
    return undefined;
	};
  move = {
			from: {
				rank: Chess.Ranks[7],
				file: Chess.Files.a
			},
			to: {
				rank: Chess.Ranks[5],
				file: Chess.Files.b
			}
	};  
  assert.ok(!rules.isLegal(move), "Can only move one rank when capturing changing file");
});

QUnit.test("Pawn cannot jump over piece", function(assert) {
  var model = Chess.Model();
	var rules = Chess.Rules(model);
	model.peek = function(square) {
	  if(square.rank === Chess.Ranks[2] && square.file === Chess.Files.a) {
	    return {color: Chess.Colors.White, kind: Chess.Kinds.P};
	  }
	  if(square.rank === Chess.Ranks[3] && square.file === Chess.Files.a) {
	    return {color: Chess.Colors.White, kind: Chess.Kinds.R};
	  }
	  if(square.rank === Chess.Ranks[7] && square.file === Chess.Files.b) {
	    return {color: Chess.Colors.Black, kind: Chess.Kinds.P};
	  }
	  if(square.rank === Chess.Ranks[6] && square.file === Chess.Files.b) {
	    return {color: Chess.Colors.Black, kind: Chess.Kinds.N};
	  }
    return undefined;
	};
	var move = {
			from: {
				rank: Chess.Ranks[2],
				file: Chess.Files.a
			},
			to: {
				rank: Chess.Ranks[4],
				file: Chess.Files.a
			}
	};
  assert.notOk(rules.isLegal(move), "Expect illegal move");
	move = {
			from: {
				rank: Chess.Ranks[7],
				file: Chess.Files.b
			},
			to: {
				rank: Chess.Ranks[5],
				file: Chess.Files.b
			}
	};
  assert.notOk(rules.isLegal(move), "Expect illegal move");
});

QUnit.test("Knight can move 2 ranks, and 1 file", function(assert) {
  var model = Chess.Model();
	var rules = Chess.Rules(model);
	model.peek = function(tile) {
	  if(tile.rank === Chess.Ranks[3] && tile.file === Chess.Files.c) {
	    return {color: Chess.Colors.White, kind: Chess.Kinds.N};
	  }
    return undefined;
	};
	var move = {
			from: {
				rank: Chess.Ranks[3],
				file: Chess.Files.c
			},
			to: {
				rank: Chess.Ranks[5],
				file: Chess.Files.b
			}
	};
	assert.ok(rules.isLegal(move), "Moving 2 ranks up and 1 file to the left is legal");
	
	move.to.file = Chess.Files.d;
	assert.ok(rules.isLegal(move), "Moving 2 ranks up and 1 file to the right is legal");
	
	move.to.rank = Chess.Ranks[1];
	move.to.file = Chess.Files.b;
	assert.ok(rules.isLegal(move), "Moving 2 ranks down and 1 file to the left is legal");

	move.to.file = Chess.Files.d;
	assert.ok(rules.isLegal(move), "Moving 2 ranks down and 1 file to the right is legal");
});

QUnit.test("Knight can move 1 rank, and 2 files", function(assert) {
  var model = Chess.Model();
	var rules = Chess.Rules(model);
	model.peek = function(tile) {
	  if(tile.rank === Chess.Ranks[3] && tile.file === Chess.Files.c) {
	    return {color: Chess.Colors.White, kind: Chess.Kinds.N};
	  }
    return undefined;
	};
	var move = {
			from: {
				rank: Chess.Ranks[3],
				file: Chess.Files.c
			},
			to: {
				rank: Chess.Ranks[4],
				file: Chess.Files.e
			}
	};
	assert.ok(rules.isLegal(move), "Moving 1 rank up and 2 files to the right is legal");
	
	move.to.file = Chess.Files.a;
	assert.ok(rules.isLegal(move), "Moving 1 rank up and 2 files to the left is legal");
	
	move.to.rank = Chess.Ranks[2];
	move.to.file = Chess.Files.a;
	assert.ok(rules.isLegal(move), "Moving 1 rank down and 2 files to the left is legal");

	move.to.file = Chess.Files.e;
	assert.ok(rules.isLegal(move), "Moving 1 rank down and 2 files to the right is legal");
  
});

QUnit.test("Knight cannot move 1 rank, and 1 file", function(assert) {
  var model = Chess.Model();
	var rules = Chess.Rules(model);
	model.peek = function(tile) {
	  if(tile.rank === Chess.Ranks[3] && tile.file === Chess.Files.c) {
	    return {color: Chess.Colors.White, kind: Chess.Kinds.N};
	  }
    return undefined;
	};
	var move = {
			from: {
				rank: Chess.Ranks[3],
				file: Chess.Files.c
			},
			to: {
				rank: Chess.Ranks[4],
				file: Chess.Files.d
			}
	};
	assert.ok(!rules.isLegal(move), "Moving 1 rank up and 1 file to the right is illegal");
	
	move.to.file = Chess.Files.b;
	assert.ok(!rules.isLegal(move), "Moving 1 rank up and 1 file to the left is illegal");
	
	move.to.rank = Chess.Ranks[2];
	move.to.file = Chess.Files.d;
	assert.ok(!rules.isLegal(move), "Moving 1 rank down and 1 file to the right is illegal");

	move.to.file = Chess.Files.b;
	assert.ok(!rules.isLegal(move), "Moving 1 rank down and 1 file to the left is illegal");
  
  
});

QUnit.test("Knight cannot move 2 ranks, and 2 files", function(assert) {
  var model = Chess.Model();
	var rules = Chess.Rules(model);
	model.peek = function(tile) {
	  if(tile.rank === Chess.Ranks[3] && tile.file === Chess.Files.c) {
	    return {color: Chess.Colors.White, kind: Chess.Kinds.N};
	  }
    return undefined;
	};
	var move = {
			from: {
				rank: Chess.Ranks[3],
				file: Chess.Files.c
			},
			to: {
				rank: Chess.Ranks[5],
				file: Chess.Files.e
			}
	};
	assert.ok(!rules.isLegal(move), "Moving 2 ranks up and 2 files to the right is illegal");
	
	move.to.file = Chess.Files.a;
	assert.ok(!rules.isLegal(move), "Moving 2 ranks up and 2 files to the left is illegal");

	move.to.rank = Chess.Ranks[1];
	move.to.file = Chess.Files.e;
	assert.ok(!rules.isLegal(move), "Moving 2 ranks down and 2 files to the right is illegal");

	move.to.file = Chess.Files.a;
	assert.ok(!rules.isLegal(move), "Moving 2 ranks down and 2 files to the left is illegal");
  
});
QUnit.test("Knight cannot move more than 2 ranks", function(assert) {
  var model = Chess.Model();
	var rules = Chess.Rules(model);
	model.peek = function(tile) {
	  if(tile.rank === Chess.Ranks[4] && tile.file === Chess.Files.d) {
	    return {color: Chess.Colors.White, kind: Chess.Kinds.N};
	  }
    return undefined;
	};
	var move = {
			from: {
				rank: Chess.Ranks[4],
				file: Chess.Files.d
			},
			to: {
				rank: Chess.Ranks[7],
				file: Chess.Files.e
			}
	};
	assert.ok(!rules.isLegal(move), "Moving 3 ranks up and 1 files to the right is illegal");

	move.to.file = Chess.Files.c;
	assert.ok(!rules.isLegal(move), "Moving 3 ranks up and 1 files to the left is illegal");

	move.to.rank = Chess.Ranks[1];
	move.to.file = Chess.Files.e;
	assert.ok(!rules.isLegal(move), "Moving 3 ranks down and 1 files to the right is illegal");

	move.to.file = Chess.Files.c;
	assert.ok(!rules.isLegal(move), "Moving 3 ranks down and 1 files to the left is illegal");
});

QUnit.test("Knight cannot move more than 2 files", function(assert) {
  var model = Chess.Model();
	var rules = Chess.Rules(model);
	model.peek = function(tile) {
	  if(tile.rank === Chess.Ranks[4] && tile.file === Chess.Files.d) {
	    return {color: Chess.Colors.White, kind: Chess.Kinds.N};
	  }
    return undefined;
	};
	var move = {
			from: {
				rank: Chess.Ranks[4],
				file: Chess.Files.d
			},
			to: {
				rank: Chess.Ranks[5],
				file: Chess.Files.g
			}
	};
	assert.ok(!rules.isLegal(move), "Moving 1 rank up and 3 files to the right is illegal");

	move.to.file = Chess.Files.a;
	assert.ok(!rules.isLegal(move), "Moving 1 rank up and 3 files to the left is illegal");

	move.to.rank = Chess.Ranks[3];
	move.to.file = Chess.Files.g;
	assert.ok(!rules.isLegal(move), "Moving 1 rank down and 3 files to the right is illegal");

	move.to.file = Chess.Files.a;
	assert.ok(!rules.isLegal(move), "Moving 1 rank down and 3 files to the left is illegal");
  
});

QUnit.test("Rook can capture", function(assert) {
  var model = Chess.Model();
	var rules = Chess.Rules(model);
	model.peek = function(tile) {
	  if(tile.rank === Chess.Ranks[4] && tile.file === Chess.Files.d) {
	    return {color: Chess.Colors.White, kind: Chess.Kinds.R};
	  }
	  if(tile.rank === Chess.Ranks[5] && tile.file === Chess.Files.d) {
	    return {color: Chess.Colors.Black, kind: Chess.Kinds.R};
	  }
    return undefined;
	};
	var move = {
			from: {
				rank: Chess.Ranks[4],
				file: Chess.Files.d
			},
			to: {
				rank: Chess.Ranks[5],
				file: Chess.Files.d
			}
	};
	assert.ok(rules.isLegal(move), "Capturing moving 1 rank up is legal");
  
});

QUnit.test("Rook cannot move both rank and file", function(assert) {
  var model = Chess.Model();
	var rules = Chess.Rules(model);
	model.peek = function(tile) {
	  if(tile.rank === Chess.Ranks[4] && tile.file === Chess.Files.d) {
	    return {color: Chess.Colors.White, kind: Chess.Kinds.R};
	  }
    return undefined;
	};
	var move = {
			from: {
				rank: Chess.Ranks[4],
				file: Chess.Files.d
			},
			to: {
				rank: Chess.Ranks[5],
				file: Chess.Files.e
			}
	};
	assert.ok(!rules.isLegal(move), "Moving 1 rank up and 1 file to the right is illegal");
	assert.equal(move.error, "Rook can only move vertically, or horizontally", "Verify error message");
	move.to.file = Chess.Files.c;
	assert.ok(!rules.isLegal(move), "Moving 1 rank up and 1 file to the left is illegal");
	assert.equal(move.error, "Rook can only move vertically, or horizontally", "Verify error message");
	move.to.rank = Chess.Ranks[3];
	move.to.file = Chess.Files.e;
	assert.ok(!rules.isLegal(move), "Moving 1 rank down and 1 file to the right is illegal");
	assert.equal(move.error, "Rook can only move vertically, or horizontally", "Verify error message");
	move.to.file = Chess.Files.c;
	assert.ok(!rules.isLegal(move), "Moving 1 rank down and 1 file to the left is illegal");
	assert.equal(move.error, "Rook can only move vertically, or horizontally", "Verify error message");
});

QUnit.test("Rook cannot move past any piece in the way", function(assert) {
  var model = Chess.Model();
	var rules = Chess.Rules(model);
	model.peek = function(tile) {
	  if(tile.rank === Chess.Ranks[4] && tile.file === Chess.Files.d) {
	    return {color: Chess.Colors.White, kind: Chess.Kinds.R};
	  }
	  if(tile.rank === Chess.Ranks[5] && tile.file === Chess.Files.d) {
	    return {color: Chess.Colors.White, kind: Chess.Kinds.P};
	  }
	  if(tile.rank === Chess.Ranks[4] && tile.file === Chess.Files.e) {
	    return {color: Chess.Colors.White, kind: Chess.Kinds.P};
	  }
    return undefined;
	};
	var move = {
			from: {
				rank: Chess.Ranks[4],
				file: Chess.Files.d
			},
			to: {
				rank: Chess.Ranks[6],
				file: Chess.Files.d
			}
	};
	assert.ok(!rules.isLegal(move), "Moving past a piece on same file is illegal");
	assert.equal(move.error, "Cannot jump over piece on d5", "Verify error message");
	move.to.rank = Chess.Ranks[4];
	move.to.file = Chess.Files.f;
	assert.ok(!rules.isLegal(move), "Moving past a piece on same rank is illegal");
	assert.equal(move.error, "Cannot jump over piece on e4", "Verify error message");
});

QUnit.test("Rook can move 7 ranks", function(assert) {
  var model = Chess.Model();
	var rules = Chess.Rules(model);
	model.peek = function(tile) {
	  if(tile.rank === Chess.Ranks[1] && tile.file === Chess.Files.a) {
	    return {color: Chess.Colors.White, kind: Chess.Kinds.R};
	  }
    return undefined;
	};
	var move = {
			from: {
				rank: Chess.Ranks[1],
				file: Chess.Files.a
			},
			to: {
				rank: Chess.Ranks[8],
				file: Chess.Files.a
			}
	};
	assert.ok(rules.isLegal(move), "Moving 7 ranks is legal");
});

QUnit.test("Rook can move 7 files", function(assert) {
  var model = Chess.Model();
	var rules = Chess.Rules(model);
	model.peek = function(tile) {
	  if(tile.rank === Chess.Ranks[1] && tile.file === Chess.Files.a) {
	    return {color: Chess.Colors.White, kind: Chess.Kinds.R};
	  }
    return undefined;
	};
	var move = {
			from: {
				rank: Chess.Ranks[1],
				file: Chess.Files.a
			},
			to: {
				rank: Chess.Ranks[1],
				file: Chess.Files.h
			}
	};
	assert.ok(rules.isLegal(move), "Moving 7 files is legal");
});

QUnit.test("Bishop must move same rank and file distance", function(assert) {
  var model = Chess.Model();
	var rules = Chess.Rules(model);
	model.peek = function(tile) {
	  if(tile.rank === Chess.Ranks[1] && tile.file === Chess.Files.a) {
	    return {color: Chess.Colors.White, kind: Chess.Kinds.B};
	  }
    return undefined;
	};
	var move = {
			from: {
				rank: Chess.Ranks[1],
				file: Chess.Files.a
			},
			to: {
				rank: Chess.Ranks[8],
				file: Chess.Files.h
			}
	};
	assert.ok(rules.isLegal(move), "Moving 7 files to the right and 7 ranks up is legal");

	model.peek = function(tile) {
	  if(tile.rank === Chess.Ranks[8] && tile.file === Chess.Files.a) {
	    return {color: Chess.Colors.White, kind: Chess.Kinds.B};
	  }
    return undefined;
	};
	move.from.rank = Chess.Ranks[8];
	move.to.rank = Chess.Ranks[1];
	assert.ok(rules.isLegal(move), "Moving 7 files to the right and 7 ranks down is legal");
	
	model.peek = function(tile) {
	  if(tile.rank === Chess.Ranks[1] && tile.file === Chess.Files.h) {
	    return {color: Chess.Colors.White, kind: Chess.Kinds.B};
	  }
    return undefined;
	};
	move.from.file = Chess.Files.h;
	move.to.file = Chess.Files.a;
	move.from.rank = Chess.Ranks[1];
	move.to.rank = Chess.Ranks[8];
	assert.ok(rules.isLegal(move), "Moving 7 files to the left and 7 ranks up is legal");
	
	model.peek = function(tile) {
	  if(tile.rank === Chess.Ranks[8] && tile.file === Chess.Files.h) {
	    return {color: Chess.Colors.White, kind: Chess.Kinds.B};
	  }
    return undefined;
	};
	move.from.rank = Chess.Ranks[8];
	move.to.rank = Chess.Ranks[1];
	assert.ok(rules.isLegal(move), "Moving 7 files to the left and 7 ranks down is legal");
	
	move.to.rank = Chess.Ranks[2];
	assert.ok(!rules.isLegal(move), "Moving 7 files to the left and 6 ranks down is illegal");
	assert.equal(move.error, "Bishop can only move diagonally", "Verify correct error message");
});

QUnit.test("Bishop cannot move past any piece in the way", function(assert) {
  var model = Chess.Model();
	var rules = Chess.Rules(model);
	model.peek = function(tile) {
	  if(tile.rank === Chess.Ranks[1] && tile.file === Chess.Files.a) {
	    return {color: Chess.Colors.White, kind: Chess.Kinds.B};
	  }
	  if(tile.rank === Chess.Ranks[3] && tile.file === Chess.Files.c) {
	    return {color: Chess.Colors.Black, kind: Chess.Kinds.P};
	  }
	  if(tile.rank === Chess.Ranks[8] && tile.file === Chess.Files.h) {
	    return {color: Chess.Colors.Black, kind: Chess.Kinds.B};
	  }
    return undefined;
	};
	var move = {
			from: {
				rank: Chess.Ranks[1],
				file: Chess.Files.a
			},
			to: {
				rank: Chess.Ranks[7],
				file: Chess.Files.g
			}
	};
	assert.ok(!rules.isLegal(move), "Moving past a piece in the way moving up rank and to higher file is illegal");
	
	move = {
			from: {
				rank: Chess.Ranks[8],
				file: Chess.Files.h
			},
			to: {
				rank: Chess.Ranks[1],
				file: Chess.Files.a
			}
	};
	assert.ok(!rules.isLegal(move), "Moving past a piece in the way moving down rank and to lower file is illegal");
	assert.equal(move.error, "Cannot jump over piece on c3", "Verify error message");
});

QUnit.test("King cannot move more than one file and/or one rank", function(assert) {
  var model = Chess.Model();
	var rules = Chess.Rules(model);
	model.peek = function(tile) {
	  if(tile.rank === Chess.Ranks[4] && tile.file === Chess.Files.d) {
	    return {color: Chess.Colors.White, kind: Chess.Kinds.K};
	  }
    return undefined;
	};
	var move = {
			from: {
				rank: Chess.Ranks[4],
				file: Chess.Files.d
			},
			to: {
				rank: Chess.Ranks[6],
				file: Chess.Files.d
			}
	};
	assert.ok(!rules.isLegal(move), "Moving more than one rank up is illegal");
  
  move.to.rank = Chess.Ranks[2];
	assert.ok(!rules.isLegal(move), "Moving more than one rank down is illegal");
	
	move.to.rank = Chess.Ranks[4];
	move.to.rank = Chess.Files.f;
	assert.ok(!rules.isLegal(move), "Moving more than one file to the right is illegal");
	
	move.to.rank = Chess.Files.b;
	assert.ok(!rules.isLegal(move), "Moving more than one file to the left is illegal");
	
	move.to.rank = Chess.Ranks[6];
	move.to.file = Chess.Files.e;
	assert.ok(!rules.isLegal(move), "Moving more than one rank up, and one file to the left is illegal");
});

QUnit.test("King can move one file and/or one rank in all directions", function(assert) {
  var model = Chess.Model();
	var rules = Chess.Rules(model);
	model.peek = function(tile) {
	  if(tile.rank === Chess.Ranks[4] && tile.file === Chess.Files.d) {
	    return {color: Chess.Colors.White, kind: Chess.Kinds.K};
	  }
    return undefined;
	};
	var move = {
			from: {
				rank: Chess.Ranks[4],
				file: Chess.Files.d
			},
			to: {
				rank: Chess.Ranks[5],
				file: Chess.Files.d
			}
	};
	assert.ok(rules.isLegal(move), "Moving one rank up is legal");
	
	move.to.file = Chess.Files.e;
	assert.ok(rules.isLegal(move), "Moving one rank up, and one file to the right is legal");
	
	move.to.rank = Chess.Ranks[4];
	assert.ok(rules.isLegal(move), "Moving one file to the right is legal");
	
	move.to.rank = Chess.Ranks[3];
	assert.ok(rules.isLegal(move), "Moving one rank down, and one file to the right is legal");
	
	move.to.file = Chess.Files.d;
	assert.ok(rules.isLegal(move), "Moving one rank down is legal");
	
	move.to.file = Chess.Files.c;
	assert.ok(rules.isLegal(move), "Moving one rank down, and one file to the left is legal");
	
	move.to.rank = Chess.Ranks[4];
	assert.ok(rules.isLegal(move), "Moving one file to the left is legal");
	
	move.to.rank = Chess.Ranks[5];
	assert.ok(rules.isLegal(move), "Moving one rank up, and one file to the left is legal");
});

QUnit.test("King cannot move to a threatened square", function(assert) {
  var model = Chess.Model();
  var view = {
    place: function(){},
    remove: function(){}
  };
  var presenter = Chess.BoardPresenter({model: model, view: view});
  model.peek = function(square) {
	  if(square.rank === Chess.Ranks[1] && square.file === Chess.Files.e) {
	    return {color: Chess.Colors.White, kind: Chess.Kinds.K};
	  }
	  if(square.rank === Chess.Ranks[3] && square.file === Chess.Files.d) {
	    return {color: Chess.Colors.Black, kind: Chess.Kinds.Q};
	  }
    return undefined;
  };  
  assert.throws(function() {
    presenter.move({
      from: {rank: Chess.Ranks[1], file: Chess.Files.e}, 
      to: {rank: Chess.Ranks[1], file: Chess.Files.f}
    });
  }, function(error) {
    return true;
  });
});

QUnit.test("King cannot move next to the opponent king", function(assert) {
  var model = Chess.Model();
	var view = {
	  remove: function(){},
	  place: function(){}
	};
  var presenter = Chess.BoardPresenter({model: model, view: view});
  model.peek = function(square) {
	  if(square.rank === Chess.Ranks[4] && square.file === Chess.Files.e) {
	    return {color: Chess.Colors.White, kind: Chess.Kinds.K};
	  }
	  if(square.rank === Chess.Ranks[4] && square.file === Chess.Files.c) {
	    return {color: Chess.Colors.Black, kind: Chess.Kinds.K};
	  }
    return undefined;
  };  
  assert.throws(function() {
    presenter.move({
      from: {rank: Chess.Ranks[4], file: Chess.Files.e}, 
      to: {rank: Chess.Ranks[4], file: Chess.Files.d}
    });
  }, function(error) {
    return error.reason === "King cannot move next to opponent king";
  });  
});

QUnit.test("Pawn can only threaten square it can capture", function(assert) {
  var model = Chess.Model();
	var rules = Chess.Rules(model);
  model.peek = function(square) {
	  if(square.rank === Chess.Ranks[7] && square.file === Chess.Files.c) {
	    return {color: Chess.Colors.Black, kind: Chess.Kinds.P};
	  }
	  if(square.rank === Chess.Ranks[4] && square.file === Chess.Files.c) {
	    return {color: Chess.Colors.White, kind: Chess.Kinds.K};
	  }
    return undefined;
  };  
  model.move({
    from: {rank: Chess.Ranks[4], file: Chess.Files.c}, 
    to: {rank: Chess.Ranks[5], file: Chess.Files.c}
  });
});

QUnit.test("Castling is not allowed if king is in check", function(assert) {
  var model = Chess.Model();
	var rules = Chess.Rules(model);
  model.move(Chess.Move.createFromSan({san:"e3", model: model, by: Chess.Colors.White}));
  model.move(Chess.Move.createFromSan({san:"c6", model: model, by: Chess.Colors.Black}));
  model.move(Chess.Move.createFromSan({san:"Bc4", model: model, by: Chess.Colors.White}));
  model.move(Chess.Move.createFromSan({san:"e5", model: model, by: Chess.Colors.Black}));
  model.move(Chess.Move.createFromSan({san:"Nf3", model: model, by: Chess.Colors.White}));
  model.move(Chess.Move.createFromSan({san:"e4", model: model, by: Chess.Colors.Black}));
  model.move(Chess.Move.createFromSan({san:"d3", model: model, by: Chess.Colors.White}));
  model.move(Chess.Move.createFromSan({san:"Qa5+", model: model, by: Chess.Colors.Black}));
  try {
    model.move(Chess.Move.createFromSan({san:"O-O", model: model, by: Chess.Colors.White}));
    assert.ok(false, "Missing expected exception");
  } catch (exception) {
    assert.strictEqual(exception.message, "Illegal move", "Expected error when king is in check");
  }
});

QUnit.test("Castling is not allowed if any square between king and rook are threatened", function(assert) {
  var model = Chess.Model();
	var rules = Chess.Rules(model);
  model.move(Chess.Move.createFromSan({san:"e4", model: model, by: Chess.Colors.White}));
  model.move(Chess.Move.createFromSan({san:"c6", model: model, by: Chess.Colors.Black}));
  model.move(Chess.Move.createFromSan({san:"Bc4", model: model, by: Chess.Colors.White}));
  model.move(Chess.Move.createFromSan({san:"e5", model: model, by: Chess.Colors.Black}));
  model.move(Chess.Move.createFromSan({san:"Nh3", model: model, by: Chess.Colors.White}));
  model.move(Chess.Move.createFromSan({san:"f6", model: model, by: Chess.Colors.Black}));
  model.move(Chess.Move.createFromSan({san:"f4", model: model, by: Chess.Colors.White}));
  model.move(Chess.Move.createFromSan({san:"Qb6", model: model, by: Chess.Colors.Black}));
  try {
    model.move(Chess.Move.createFromSan({san:"O-O", model: model, by: Chess.Colors.White}));
    assert.ok(false, "Missing expected exception");
  } catch (exception) {
    assert.strictEqual(exception.message, "Illegal move", "Expected error when square between king and rook is threatened");
  }
});

QUnit.test("Castling is not allowed if rook has already moved", function(assert) {
  var model = Chess.Model();
	var rules = Chess.Rules(model);
  model.move(Chess.Move.createFromSan({san:"e3", model: model, by: Chess.Colors.White}));
  model.move(Chess.Move.createFromSan({san:"e6", model: model, by: Chess.Colors.Black}));
  model.move(Chess.Move.createFromSan({san:"Bd3", model: model, by: Chess.Colors.White}));
  model.move(Chess.Move.createFromSan({san:"e5", model: model, by: Chess.Colors.Black}));
  model.move(Chess.Move.createFromSan({san:"Nf3", model: model, by: Chess.Colors.White}));
  model.move(Chess.Move.createFromSan({san:"e4", model: model, by: Chess.Colors.Black}));
  model.move(Chess.Move.createFromSan({san:"Rg1", model: model, by: Chess.Colors.White}));
  model.move(Chess.Move.createFromSan({san:"f6", model: model, by: Chess.Colors.Black}));
  model.move(Chess.Move.createFromSan({san:"Rh1", model: model, by: Chess.Colors.White}));
  model.move(Chess.Move.createFromSan({san:"f5", model: model, by: Chess.Colors.Black}));
  try {
    model.move(Chess.Move.createFromSan({san:"O-O", model: model, by: Chess.Colors.White}));
    assert.ok(false, "Missing expected exception");
  } catch (exception) {
    assert.strictEqual(exception.message, "Illegal move", "Expected error when rook has already moved");
  }
});

QUnit.test("Castling is not allowed if king has already moved", function(assert) {
  var model = Chess.Model();
	var rules = Chess.Rules(model);
  model.move(Chess.Move.createFromSan({san:"e3", model: model, by: Chess.Colors.White}));
  model.move(Chess.Move.createFromSan({san:"e6", model: model, by: Chess.Colors.Black}));
  model.move(Chess.Move.createFromSan({san:"Bd3", model: model, by: Chess.Colors.White}));
  model.move(Chess.Move.createFromSan({san:"e5", model: model, by: Chess.Colors.Black}));
  model.move(Chess.Move.createFromSan({san:"Nf3", model: model, by: Chess.Colors.White}));
  model.move(Chess.Move.createFromSan({san:"e4", model: model, by: Chess.Colors.Black}));
  model.move(Chess.Move.createFromSan({san:"Kf1", model: model, by: Chess.Colors.White}));
  model.move(Chess.Move.createFromSan({san:"f6", model: model, by: Chess.Colors.Black}));
  model.move(Chess.Move.createFromSan({san:"Ke1", model: model, by: Chess.Colors.White}));
  model.move(Chess.Move.createFromSan({san:"f5", model: model, by: Chess.Colors.Black}));
  try {
    model.move(Chess.Move.createFromSan({san:"O-O", model: model, by: Chess.Colors.White}));
    assert.ok(false, "Missing expected exception");
  } catch (exception) {
    assert.strictEqual(exception.message, "Illegal move", "Expected error when king has already moved");
  }
});

QUnit.test("Castling is allowed if neither king nor rook have moved yet", function(assert) {
  var model = Chess.Model();
  view = {
    place: function() {},
    remove: function() {}
  };
  var presenter = Chess.BoardPresenter({model: model, view: view});
  presenter.move(Chess.Move.createFromSan({san:"e3", model: model, by: Chess.Colors.White}));
  presenter.move(Chess.Move.createFromSan({san:"e6", model: model, by: Chess.Colors.Black}));
  presenter.move(Chess.Move.createFromSan({san:"Bd3", model: model, by: Chess.Colors.White}));
  presenter.move(Chess.Move.createFromSan({san:"e5", model: model, by: Chess.Colors.Black}));
  presenter.move(Chess.Move.createFromSan({san:"Nf3", model: model, by: Chess.Colors.White}));
  presenter.move(Chess.Move.createFromSan({san:"e4", model: model, by: Chess.Colors.Black}));
  presenter.move(Chess.Move.createFromSan({san:"O-O", model: model, by: Chess.Colors.White}));
  assert.deepEqual(model.peek({file: Chess.Files.g, rank: Chess.Ranks["1"]}), {color: Chess.Colors.White, kind: Chess.Kinds.K}, "Expected white king");
  assert.deepEqual(model.peek({file: Chess.Files.f, rank: Chess.Ranks["1"]}), {color: Chess.Colors.White, kind: Chess.Kinds.R}, "Expected white rook");
});

QUnit.test("King cannot jump over a piece when castling", function(assert) {
  var model = Chess.Model();
	var rules = Chess.Rules(model);
  model.move(Chess.Move.createFromSan({san:"Nc3", model: model, by: Chess.Colors.White}));
  model.move(Chess.Move.createFromSan({san:"e6", model: model, by: Chess.Colors.Black}));
  model.move(Chess.Move.createFromSan({san:"d3", model: model, by: Chess.Colors.White}));
  model.move(Chess.Move.createFromSan({san:"e5", model: model, by: Chess.Colors.Black}));
  model.move(Chess.Move.createFromSan({san:"Bd2", model: model, by: Chess.Colors.White}));
  var castle = Chess.Move.createFromSan({san:"O-O-O", model: model, by: Chess.Colors.White});
  assert.throws(function() {
    model.move(castle);
  }, function(error) {
    return error.message === "Illegal move";
  }, "Expect illegal move");
});

QUnit.test("Queen can move straight in all directions", function(assert) {
  var model = Chess.Model();
	var rules = Chess.Rules(model);
	model.peek = function(tile) {
	  if(tile.rank === Chess.Ranks[4] && tile.file === Chess.Files.d) {
	    return {color: Chess.Colors.White, kind: Chess.Kinds.Q};
	  }
    return undefined;
	};
	var move = {
			from: {
				rank: Chess.Ranks[4],
				file: Chess.Files.d
			},
			to: {
				rank: Chess.Ranks[8],
				file: Chess.Files.d
			}
	};
	assert.ok(rules.isLegal(move), "Moving 4 ranks up is legal");
	
	move.to.file = Chess.Files.h;
	assert.ok(rules.isLegal(move), "Moving 4 ranks up, and 4 files to the right is legal");
	
	move.to.rank = Chess.Ranks[4];
	assert.ok(rules.isLegal(move), "Moving 4 files to the right is legal");
	
	move.to.rank = Chess.Ranks[1];
	move.to.file = Chess.Files.g;
	assert.ok(rules.isLegal(move), "Moving 3 ranks down, and 3 files to the right is legal");
	
	move.to.file = Chess.Files.d;
	assert.ok(rules.isLegal(move), "Moving 3 ranks down is legal");
	
	move.to.file = Chess.Files.a;
	assert.ok(rules.isLegal(move), "Moving 3 ranks down, and 3 file to the left is legal");
	
	move.to.rank = Chess.Ranks[4];
	assert.ok(rules.isLegal(move), "Moving 3 files to the left is legal");
	
	move.to.rank = Chess.Ranks[8];
	assert.ok(!rules.isLegal(move), "Moving 3 ranks up, and 3 files to the left is legal");
});

QUnit.test("Queen cannot move different count of file and rank unless one is 0", function(assert) {
  var model = Chess.Model();
	var rules = Chess.Rules(model);
	model.peek = function(tile) {
	  if(tile.rank === Chess.Ranks[4] && tile.file === Chess.Files.d) {
	    return {color: Chess.Colors.White, kind: Chess.Kinds.Q};
	  }
    return undefined;
	};
	var move = {
			from: {
				rank: Chess.Ranks[4],
				file: Chess.Files.d
			},
			to: {
				rank: Chess.Ranks[8],
				file: Chess.Files.e
			}
	};
	assert.ok(!rules.isLegal(move), "Moving 4 ranks up, and 1 file to the right is illegal");
	
	move.to.file = Chess.Files.f;
	assert.ok(!rules.isLegal(move), "Moving 4 ranks up, and 2 files to the right is illegal");
	
	move.to.rank = Chess.Ranks[5];
	assert.ok(!rules.isLegal(move), "Moving 1 rank up, and 2 files to the right is illegal");
	
	move.to.rank = Chess.Ranks[1];
	move.to.file = Chess.Files.f;
	assert.ok(!rules.isLegal(move), "Moving 3 ranks down, and 2 files to the right is illegal");
	
	move.to.file = Chess.Files.f;
	assert.ok(!rules.isLegal(move), "Moving 3 ranks down, and 2 files to the right is illegal");
	
	move.to.file = Chess.Files.b;
	assert.ok(!rules.isLegal(move), "Moving 3 ranks down, and 2 files to the left is illegal");
	
	move.to.rank = Chess.Ranks[3];
	assert.ok(!rules.isLegal(move), "Moving 3 files to the left, and 1 rank down is illegal");
	
	move.to.rank = Chess.Ranks[8];
	assert.ok(!rules.isLegal(move), "Moving 3 ranks up, and 2 files to the left is illegal");
});

QUnit.test("Queen cannot jump over another piece", function(assert) {
  var model = Chess.Model();
	var rules = Chess.Rules(model);
	model.peek = function(square) {
	  if(square.rank === Chess.Ranks[1] && square.file === Chess.Files.d) {
	    return {color: Chess.Colors.White, kind: Chess.Kinds.Q};
	  }
	  if(square.rank === Chess.Ranks[2] && square.file === Chess.Files.e) {
	    return {color: Chess.Colors.White, kind: Chess.Kinds.P};
	  }
    return undefined;
	};
	var move = {
			from: {
				rank: Chess.Ranks[1],
				file: Chess.Files.d
			},
			to: {
				rank: Chess.Ranks[3],
				file: Chess.Files.f
			}
	};
  assert.ok(!rules.isLegal(move), "Queen cannot jump another piece");
});

QUnit.module("Moves");
QUnit.test("SAN [file rank] pawn-move is translated correctly", function(assert) {
  var model = Chess.Model();
  model.peek = function(tile) {
	  if(tile.rank === Chess.Ranks[2] && tile.file === Chess.Files.e) {
	    return {color: Chess.Colors.White, kind: Chess.Kinds.P};
	  }
    return undefined;
	};

  var move = Chess.Move.createFromSan({san: "e3", model: model, by: Chess.Colors.White});   
  assert.strictEqual(move.to.file, Chess.Files.e, "Expected file e");
  assert.strictEqual(move.to.rank, Chess.Ranks["3"], "Expected rank 3");
  assert.strictEqual(move.from.file, Chess.Files.e, "Expected file e");
  assert.strictEqual(move.from.rank, Chess.Ranks["2"], "Expected rank 2");
});

QUnit.test("SAN [file rank] king-move is translated correctly", function(assert) {
  var model = Chess.Model();
  model.peek = function(tile) {
	  if(tile.rank === Chess.Ranks[1] && tile.file === Chess.Files.e) {
	    return {color: Chess.Colors.White, kind: Chess.Kinds.K};
	  }
	  if(tile.rank === Chess.Ranks[1] && tile.file === Chess.Files.h) {
	    return {color: Chess.Colors.White, kind: Chess.Kinds.R};
	  }
    return undefined;
	};

  var move = Chess.Move.createFromSan({san: "Kf1", model: model, by: Chess.Colors.White});   
  assert.strictEqual(move.to.file, Chess.Files.f, "Expected file f");
  assert.strictEqual(move.to.rank, Chess.Ranks["1"], "Expected rank 1");
  assert.strictEqual(move.from.file, Chess.Files.e, "Expected file e");
  assert.strictEqual(move.from.rank, Chess.Ranks["1"], "Expected rank 1");
});

QUnit.test("SAN O-O (king's castle) is translated correctly", function(assert) {
  var model = Chess.Model();
  model.peek = function(tile) {
	  if(tile.rank === Chess.Ranks[1] && tile.file === Chess.Files.e) {
	    return {color: Chess.Colors.White, kind: Chess.Kinds.K};
	  }
	  if(tile.rank === Chess.Ranks[1] && tile.file === Chess.Files.h) {
	    return {color: Chess.Colors.White, kind: Chess.Kinds.R};
	  }
    return undefined;
	};

  var move = Chess.Move.createFromSan({san: "O-O", model: model, by: Chess.Colors.White});   
  assert.strictEqual(move.to.file, Chess.Files.g, "Expected file g");
  assert.strictEqual(move.to.rank, Chess.Ranks["1"], "Expected rank 1");
  assert.strictEqual(move.from.file, Chess.Files.e, "Expected file e");
  assert.strictEqual(move.from.rank, Chess.Ranks["1"], "Expected rank 1");
  
});

QUnit.test("SAN O-O-O (queen's castle) is translated correctly", function(assert) {
  var model = Chess.Model();
  model.peek = function(tile) {
	  if(tile.rank === Chess.Ranks[1] && tile.file === Chess.Files.e) {
	    return {color: Chess.Colors.White, kind: Chess.Kinds.K};
	  }
	  if(tile.rank === Chess.Ranks[1] && tile.file === Chess.Files.a) {
	    return {color: Chess.Colors.White, kind: Chess.Kinds.R};
	  }
    return undefined;
	};

  var move = Chess.Move.createFromSan({san: "O-O-O", model: model, by: Chess.Colors.White});   
  assert.strictEqual(move.to.file, Chess.Files.c, "Expected file b");
  assert.strictEqual(move.to.rank, Chess.Ranks["1"], "Expected rank 1");
  assert.strictEqual(move.from.file, Chess.Files.e, "Expected file e");
  assert.strictEqual(move.from.rank, Chess.Ranks["1"], "Expected rank 1");
});

QUnit.test("SAN pawn promotion is translated correctly", function(assert) {
  var model = Chess.Model();
  model.peek = function(tile) {
	  if(tile.rank === Chess.Ranks[7] && tile.file === Chess.Files.e) {
	    return {color: Chess.Colors.White, kind: Chess.Kinds.P};
	  }
    return undefined;
  };  
  var move = Chess.Move.createFromSan({san: "e8=Q", model: model, by: Chess.Colors.White}); 
  assert.strictEqual(move.to.file, Chess.Files.e, "Expected file b");
  assert.strictEqual(move.to.rank, Chess.Ranks["8"], "Expected rank 8");
  assert.strictEqual(move.from.file, Chess.Files.e, "Expected file e");
  assert.strictEqual(move.from.rank, Chess.Ranks["7"], "Expected rank 7");
  
  assert.strictEqual(move.promote, Chess.Kinds.Q, "Expected Q");
  move = Chess.Move.createFromSan({san: "e8=B", model: model, by: Chess.Colors.White});   
  assert.strictEqual(move.promote, Chess.Kinds.B, "Expected B");
  move = Chess.Move.createFromSan({san: "e8=N", model: model, by: Chess.Colors.White});   
  assert.strictEqual(move.promote, Chess.Kinds.N, "Expected N");
  move = Chess.Move.createFromSan({san: "e8=R", model: model, by: Chess.Colors.White});   
  assert.strictEqual(move.promote, Chess.Kinds.R, "Expected R");
});

QUnit.test("SAN unambiguous knight move is translated correctly", function(assert) {
  var model = Chess.Model();
  model.peek = function(tile) {
	  if(tile.rank === Chess.Ranks[1] && tile.file === Chess.Files.g) {
	    return {color: Chess.Colors.White, kind: Chess.Kinds.N};
	  }
    return undefined;
  };  
  var move = Chess.Move.createFromSan({san: "Nf3", model: model, by: Chess.Colors.White}); 
  assert.strictEqual(move.to.file, Chess.Files.f, "Expected file f");
  assert.strictEqual(move.to.rank, Chess.Ranks["3"], "Expected rank 3");
  assert.strictEqual(move.from.file, Chess.Files.g, "Expected file g");
  assert.strictEqual(move.from.rank, Chess.Ranks["1"], "Expected rank 1");
});

QUnit.test("SAN ambiguous knight move is translated correctly", function(assert) {
  var model = Chess.Model();
  model.peek = function(tile) {
	  if(tile.rank === Chess.Ranks[1] && tile.file === Chess.Files.g) {
	    return {color: Chess.Colors.White, kind: Chess.Kinds.N};
	  }
	  if(tile.rank === Chess.Ranks[5] && tile.file === Chess.Files.g) {
	    return {color: Chess.Colors.White, kind: Chess.Kinds.N};
	  }
    return undefined;
  };  
  var move = Chess.Move.createFromSan({san: "N1f3", model: model, by: Chess.Colors.White}); 
  assert.strictEqual(move.to.file, Chess.Files.f, "Expected file f");
  assert.strictEqual(move.to.rank, Chess.Ranks["3"], "Expected rank 3");
  assert.strictEqual(move.from.file, Chess.Files.g, "Expected file g");
  assert.strictEqual(move.from.rank, Chess.Ranks["1"], "Expected rank 1");
  move = Chess.Move.createFromSan({san: "N5f3", model: model, by: Chess.Colors.White}); 
  assert.strictEqual(move.to.file, Chess.Files.f, "Expected file f");
  assert.strictEqual(move.to.rank, Chess.Ranks["3"], "Expected rank 3");
  assert.strictEqual(move.from.file, Chess.Files.g, "Expected file g");
  assert.strictEqual(move.from.rank, Chess.Ranks["5"], "Expected rank 5");
  
  model.peek = function(tile) {
	  if(tile.rank === Chess.Ranks[1] && tile.file === Chess.Files.g) {
	    return {color: Chess.Colors.White, kind: Chess.Kinds.N};
	  }
	  if(tile.rank === Chess.Ranks[1] && tile.file === Chess.Files.e) {
	    return {color: Chess.Colors.White, kind: Chess.Kinds.N};
	  }
    return undefined;
  };  
  move = Chess.Move.createFromSan({san: "Ngf3", model: model, by: Chess.Colors.White}); 
  assert.strictEqual(move.to.file, Chess.Files.f, "Expected file f");
  assert.strictEqual(move.to.rank, Chess.Ranks["3"], "Expected rank 3");
  assert.strictEqual(move.from.file, Chess.Files.g, "Expected file g");
  assert.strictEqual(move.from.rank, Chess.Ranks["1"], "Expected rank 1");
  move = Chess.Move.createFromSan({san: "Nef3", model: model, by: Chess.Colors.White}); 
  assert.strictEqual(move.to.file, Chess.Files.f, "Expected file f");
  assert.strictEqual(move.to.rank, Chess.Ranks["3"], "Expected rank 3");
  assert.strictEqual(move.from.file, Chess.Files.e, "Expected file e");
  assert.strictEqual(move.from.rank, Chess.Ranks["1"], "Expected rank 1");

  model.peek = function(tile) {
	  if(tile.rank === Chess.Ranks[1] && tile.file === Chess.Files.g) {
	    return {color: Chess.Colors.White, kind: Chess.Kinds.N};
	  }
	  if(tile.rank === Chess.Ranks[1] && tile.file === Chess.Files.e) {
	    return {color: Chess.Colors.White, kind: Chess.Kinds.N};
	  }
	  if(tile.rank === Chess.Ranks[5] && tile.file === Chess.Files.g) {
	    return {color: Chess.Colors.White, kind: Chess.Kinds.N};
	  }
    return undefined;
  };  
  move = Chess.Move.createFromSan({san: "Ne1f3", model: model, by: Chess.Colors.White}); 
  assert.strictEqual(move.to.file, Chess.Files.f, "Expected file f");
  assert.strictEqual(move.to.rank, Chess.Ranks["3"], "Expected rank 3");
  assert.strictEqual(move.from.file, Chess.Files.e, "Expected file e");
  assert.strictEqual(move.from.rank, Chess.Ranks["1"], "Expected rank 1");
  move = Chess.Move.createFromSan({san: "Ng1f3", model: model, by: Chess.Colors.White}); 
  assert.strictEqual(move.to.file, Chess.Files.f, "Expected file f");
  assert.strictEqual(move.to.rank, Chess.Ranks["3"], "Expected rank 3");
  assert.strictEqual(move.from.file, Chess.Files.g, "Expected file g");
  assert.strictEqual(move.from.rank, Chess.Ranks["1"], "Expected rank 1");
  move = Chess.Move.createFromSan({san: "Ng5f3", model: model, by: Chess.Colors.White}); 
  assert.strictEqual(move.to.file, Chess.Files.f, "Expected file f");
  assert.strictEqual(move.to.rank, Chess.Ranks["3"], "Expected rank 3");
  assert.strictEqual(move.from.file, Chess.Files.g, "Expected file g");
  assert.strictEqual(move.from.rank, Chess.Ranks["5"], "Expected rank 5");
});

QUnit.module("Persister");
QUnit.test("Persister can store a string", function(assert) {
  var persister = Chess.Persister({name: test});
  persister.save("Store this", function() {
    persister.load(function(spec) {
      assert.ok(spec.item === "Store this");
    });
  });
});

QUnit.test("Persister can store a number", function(assert) {
  var persister = Chess.Persister({name: test});
  persister.save(5, function() {
    persister.load(function(spec) {
      assert.ok(spec.item === 5);
    });
  });
});

QUnit.test("Persister can store a boolean", function(assert) {
  var persister = Chess.Persister({name: test});
  persister.save(true, function() {
    persister.load(function(spec) {
      assert.ok(spec.item);
    });
  });
});

QUnit.test("Persister can store an array", function(assert) {
  var persister = Chess.Persister({name: test});
  persister.save(["some", 5, true], function() {
    persister.load(function(spec) {
      assert.ok(spec.item[0] === "some");
      assert.ok(spec.item[1] === 5);
      assert.ok(spec.item[2]);
    });
  });
});

QUnit.test("Persister can store a complex object", function(assert) {
  var persister = Chess.Persister({name: test});
  persister.save({some: {second: "yeah"}, other: "ok"}, function() {
    persister.load(function(spec) {
      assert.deepEqual(spec.item, {some: {second: "yeah"}, other: "ok"});
    });
  });
});



