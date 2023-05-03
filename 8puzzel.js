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

const _8puzzle = (start, goal, visited = [], queue = []) => {
  const traversalPath = [];
  visited.push(JSON.stringify(start));
  queue.push(JSON.stringify(start));
  while (queue.length > 0) {
    const currentNode = JSON.parse(queue.shift());
    traversalPath.push(currentNode);
    // console.log(traversalPath);
    if (JSON.stringify(currentNode) === JSON.stringify(goal)) {
      return traversalPath;
    }
    const children = getChild(currentNode);
    children.forEach((child) => {
      const childString = JSON.stringify(child);
      if (!visited.includes(childString)) {
        visited.push(childString);
        queue.push(childString);
      }
    });
  }
  console.log("Solution doesn't exist!");
};

console.log(
  _8puzzle(
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
  )
);
