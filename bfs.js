const bfs = (graph, start, goal, queue = [], visited = []) => {
  const traversalPath = [];
  visited.push(start);
  queue.push(start);

  while (JSON.stringify(queue) != JSON.stringify([])) {
    const currentNode = queue.shift();
    traversalPath.push(currentNode);
    if (currentNode == goal) {
      return traversalPath;
    }
    graph[currentNode].forEach((element) => {
      if (!visited.includes(element)) {
        queue.push(element);
        visited.push(element);
      }
    });
  }
  console.log(`Path Doesn't exist!!!`);
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
console.log(...bfs(graph, "A", "E"));
