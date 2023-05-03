const dfs = (graph, start, goal, visited = [], stack = []) => {
  const traversalPath = [];
  visited.push(start);
  stack.push(start);

  while (JSON.stringify(visited) != JSON.stringify([])) {
    const currentNode = stack.pop();
    traversalPath.push(currentNode);
    if (currentNode == goal) {
      return traversalPath;
    }
    graph[currentNode].forEach((element) => {
      if (!visited.includes(element)) {
        visited.push(element);
        stack.push(element);
      }
    });
  }
  console.log(`Path doesn't exist!!!`);
};

const graph = {
  A: ["B", "C"],
  B: ["D", "E"],
  C: ["F"],
  D: [],
  E: ["F"],
  F: [],
};

console.log(`Start state is A and goal state is F`);
console.log(...dfs(graph, "A", "E"));
