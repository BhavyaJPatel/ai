const getBlank = (puzzle) => {
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (puzzle[i][j] == 0) {
        return [i, j];
      }
    }
  }
};

const getChild = (puzzle) => {
  const children = [];
  const blank = getBlank(puzzle);
  if (blank[0] > 0) {
    const newPuzzle = JSON.parse(JSON.stringify(puzzle));
    [newPuzzle[blank[0]][blank[1]], newPuzzle[blank[0] - 1][blank[1]]] = [
      newPuzzle[blank[0] - 1][blank[1]],
      newPuzzle[blank[0]][blank[1]],
    ];
    children.push(newPuzzle);
  }
  if (blank[0] < 2) {
    const newPuzzle = JSON.parse(JSON.stringify(puzzle));
    [newPuzzle[blank[0]][blank[1]], newPuzzle[blank[0] + 1][blank[1]]] = [
      newPuzzle[blank[0] + 1][blank[1]],
      newPuzzle[blank[0]][blank[1]],
    ];
    children.push(newPuzzle);
  }
  if (blank[1] > 0) {
    const newPuzzle = JSON.parse(JSON.stringify(puzzle));
    [newPuzzle[blank[0]][blank[1]], newPuzzle[blank[0]][blank[1] - 1]] = [
      newPuzzle[blank[0]][blank[1] - 1],
      newPuzzle[blank[0]][blank[1]],
    ];
    children.push(newPuzzle);
  }
  if (blank[1] < 2) {
    const newPuzzle = JSON.parse(JSON.stringify(puzzle));
    [newPuzzle[blank[0]][blank[1]], newPuzzle[blank[0]][blank[1] + 1]] = [
      newPuzzle[blank[0]][blank[1] + 1],
      newPuzzle[blank[0]][blank[1]],
    ];
    children.push(newPuzzle);
  }
  return children;
};

const getHeuristic = (puzzle, goal) => {
  let h = 0;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (puzzle[i][j] != goal[i][j]) {
        h++;
      }
    }
  }
  return h;
};

const _8puzzle = (start, goal) => {
  const traversalPath = [];
  const queue = [
    { state: start, cost: 0, heuristic: getHeuristic(start, goal) },
  ];
  const visited = new Set();
  while (queue.length > 0) {
    queue.sort((a, b) => a.cost + a.heuristic - (b.cost + b.heuristic));
    const { state, cost } = queue.shift();
    traversalPath.push(state);
    if (JSON.stringify(state) === JSON.stringify(goal)) {
      return {
        traversalPath: traversalPath,
        cost: cost,
      };
    }
    visited.add(JSON.stringify(state));
    const children = getChild(state);
    children.forEach((child) => {
      const childCost = cost + 1;
      const childHeuristic = getHeuristic(child, goal);
      const childState = {
        state: child,
        cost: childCost,
        heuristic: childHeuristic,
      };
      if (!visited.has(JSON.stringify(child))) {
        queue.push(childState);
      }
    });
  }
  return null;
};

const result = _8puzzle(
  [
    [1, 2, 3],
    [5, 6, 0],
    [7, 8, 4],
  ],
  [
    [1, 2, 3],
    [5, 8, 6],
    [0, 7, 4],
  ]
);

console.log("path :- ", result.traversalPath);
console.log("cost :- ", result.cost);
