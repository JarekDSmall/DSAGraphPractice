class Node {
  constructor(value, adjacent = new Set()) {
    this.value = value;
    this.adjacent = adjacent;
  }
}

class Graph {
  constructor() {
    this.nodes = new Set();
  }

  // this function accepts a Node instance and adds it to the nodes property on the graph
  addVertex(node) {
    this.nodes.add(node);
}
  // this function accepts an array of Node instances and adds them to the nodes property on the graph
  addVertices(nodes) {
    for (let node of nodes) {
        this.addVertex(node);
    }
}
  // this function accepts two vertices and updates their adjacent values to include the other vertex
  addEdge(node1, node2) {
    if (this.nodes.has(node1) && this.nodes.has(node2)) {
        node1.adjacent.add(node2);
        node2.adjacent.add(node1);
    }
}
  // this function accepts two vertices and updates their adjacent values to remove the other vertex
  removeEdge(node1, node2) {
    if (this.nodes.has(node1) && this.nodes.has(node2)) {
        node1.adjacent.delete(node2);
        node2.adjacent.delete(node1);
    }
}
  // this function accepts a vertex and removes it from the nodes property, it also updates any adjacency lists that include that vertex
  removeVertex(node) {
    if (!this.nodes.has(node)) return;

    for (let n of this.nodes) {
        n.adjacent.delete(node);
    }

    this.nodes.delete(node);
}

  // this function returns an array of Node values using DFS
  depthFirstSearch(start) {
    const visited = new Set();
    const result = [];

    function dfs(node) {
        if (!node || visited.has(node)) return;

        visited.add(node);
        result.push(node.value);

        for (let neighbor of node.adjacent) {
            dfs(neighbor);
        }
    }

    dfs(start);
    return result;
}

  // this function returns an array of Node values using BFS
  breadthFirstSearch(start) {
    const visited = new Set();
    const result = [];
    const queue = [start];

    while (queue.length) {
        let current = queue.shift();

        if (!visited.has(current)) {
            visited.add(current);
            result.push(current.value);

            for (let neighbor of current.adjacent) {
                queue.push(neighbor);
            }
        }
    }

    return result;
}
}

module.exports = {Graph, Node}
