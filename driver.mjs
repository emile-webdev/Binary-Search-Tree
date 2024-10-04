import { Tree } from "./index.mjs";

// Function that returns an array of random numbers < 100
function randomArray(size, max = 100) {
    return Array.from({ length: size }, () => Math.floor(Math.random() * max));
}

// Create a binary search tree from an array of random numbers < 100
const randomNumbers = randomArray(15);
const tree = new Tree(randomNumbers);

// Confirm that the tree is balanced
console.log("Is the tree balanced?", tree.isBalanced());

// Print out all elements in level, pre, post, and in order
console.log("Level Order:");
tree.levelOrder(node => console.log(node.data));

console.log("In Order:");
tree.inOrder(node => console.log(node.data));

console.log("Pre Order:");
tree.preOrder(node => console.log(node.data));

console.log("Post Order:");
tree.postOrder(node => console.log(node.data));

// Unbalance the tree by adding several numbers > 100
tree.insert(113);
tree.insert(181);
tree.insert(247);
tree.insert(411);
tree.insert(788);

// Confirm that the tree is unbalanced
console.log("Is the tree unbalanced after insertions?", !tree.isBalanced());

// Balance the tree
tree.reBalance();

// Confirm that the tree is balanced
console.log("Is the tree balanced after rebalancing?", tree.isBalanced());

// Print out all elements in level, pre, post, and in order
console.log("Level Order after rebalancing:");
tree.levelOrder(node => console.log(node.data));

console.log("In Order after rebalancing:");
tree.inOrder(node => console.log(node.data));

console.log("Pre Order after rebalancing:");
tree.preOrder(node => console.log(node.data));

console.log("Post Order after rebalancing:");
tree.postOrder(node => console.log(node.data));