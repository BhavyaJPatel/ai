const getChild = (j1, j2, a, b) => {
  const possibleValues = [];
  // fill the water it if it is empty
  if (a == 0 && b == 0) {
    possibleValues.push([j1, 0]);
    possibleValues.push([0, j2]);
  }
  if (a != 0) {
    possibleValues.push([0, b]);
  }
  if (b != 0) {
    possibleValues.push([a, 0]);
  }
  if (a != j1) {
    possibleValues.push([j1, b]);
  }
  if (b != j2) {
    possibleValues.push([a, j2]);
  }
  if (a != j1 && b <= j1 - a) {
    possibleValues.push([a + b, 0]);
  }
  if (b != j2 && a <= j2 - b) {
    possibleValues.push([0, a + b]);
  }
  if (a != j1 && b > j1 - a) {
    possibleValues.push([a + (j1 - a), b - (j1 - a)]);
  }
  if (b != j2 && a > j2 - b) {
    possibleValues.push([a - (j2 - b), b + (j2 - b)]);
  }
  return possibleValues;
};

const dfs = (j1, j2, a, b, result, visited = [], stack = []) => {
  const traversalPath = [];
  visited.push(JSON.stringify([a, b]));
  stack.push(JSON.stringify([a, b]));

  while (JSON.stringify(visited) != JSON.stringify([])) {
    const currentNode = JSON.parse(stack.pop());
    traversalPath.push(JSON.stringify(currentNode));
    if (
      (currentNode[0] == result && currentNode[1] == 0) ||
      (currentNode[1] == result && currentNode[0] == 0)
    ) {
      return traversalPath;
    }
    const childs = getChild(j1, j2, currentNode[0], currentNode[1]);
    childs.forEach((element) => {
      if (!visited.includes(JSON.stringify(element))) {
        visited.push(JSON.stringify(element));
        stack.push(JSON.stringify(element));
      }
    });
  }
  console.log(`Path dosn't exist!!!`);
  return null;
};

dfs(3, 4, 0, 0, 2).forEach((data, index) => {
  console.log(`${index + 1} : ${data}`);
});
