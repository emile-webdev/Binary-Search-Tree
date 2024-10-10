class Node {
    constructor(data) {
        this.data = data;
        this.left = null;
        this.right = null;
    }
}

class Tree {
    constructor(array) {
        this.root = this.buildTree(array);
    }

    buildTree(array) {
        array = [...new Set(array)].sort((a,b) => a - b);

        const build = function(arr) {
            if (arr.length === 0) {
                return null;
            }
            const middle = Math.floor(arr.length / 2);
            const node = new Node(arr[middle]);

            node.left = build(arr.slice(0, middle));
            node.right = build(arr.slice(middle + 1));
            return node; 
        }
        return build(array);
    }

    // Insert the given value
    insert(value, node = this.root) {
        if (node === null) {
            return new Node(value);
        } else if (value < node.data) {
            node.left = this.insert(value, node.left);
        } else {
            node.right = this.insert(value, node.right);
        }
        return node;
    }

    // Delete the given value
    deleteItem(value, node = this.root) {
        if (node === null) {
            return node;
        } else if (value < node.data) {
            node.left = deleteItem(value, node.left);
        } else if (value > node.data) {
            node.right = deleteItem(value, node.right);
        } else {
            // Node with one child or no child
            if (node.left === null) {
                return node.right;
            } else if (node.right === null) {
                return node.left;
            }
            // Node with two children, get in-order successor(smallest in right subtree)
            node.data = this.minValue(node.right);
            // Delete in-order successor
            node.right = this.deleteItem(node.data, node.right);
        }
        return node;
    }

    minValue(node) {
        let current = node;

        while(current.left !== null) {
            current = current.left;
        }
        return current.data;
    }

    // Returns the node with the given value
    find(value, node = this.root) {
        if (node === null || node.data === value) {
            return node;
        } else if (value < node.data) {
            return this.find(value, node.left);
        } else {
            return this.find(value, node.right);
        }
    }

    // Traverse the tree in breadth-first level order and call the callback on each node as it traverses, passing the whole node as an argument
    levelOrder(callback) {
        if (!callback) {
            throw new Error("Callback function is required");
        }

        const queue = [this.root];

        while(queue.length > 0) {
            const node = queue.shift();
            callback(node);

            if (node.left !== null) {
                queue.push(node.left);
            } else if (node.right !== null) {
                queue.push(node.right);
            }
        }
    }

    // Traverse the tree in their respective depth-first order and pass each node to the provided callback
    inOrder(callback, node = this.root) {
        if (!callback) {
            throw new Error("Callback function is required");
        }

        if (node !== null) {
            this.inOrder(callback, node.left);
            callback(node);
            this.inOrder(callback, node.right);
        }
    }

    // Traverse the tree in their respective depth-first order and pass each node to the provided callback
    preOrder(callback, node = this.root) {
        if (!callback) {
            throw new Error("Callback function is required");
        }

        if (node !== null) {
            callback(node);
            this.preOrder(callback, node.left);
            this.preOrder(callback, node.right);
        }
    }

    // Traverse the tree in their respective depth-first order and pass each node to the provided callback
    postOrder(callback, node = this.root) {
        if (!callback) {
            throw new Error("Callback is required");
        }

        if (node !== null) {
            this.postOrder(callback, node.left);
            this.postOrder(callback, node.right);
            callback(node);
        }
    }

    // Returns the given node’s height
    height(node) {
        if (node === null) {
            return -1;
        }

        const leftHeight = this.height(node.left);
        const rightHeight = this.height(node.right);
        return Math.max(leftHeight, rightHeight) + 1;
    }

    // Returns the given node’s depth
    depth(node, current = this.root, depth = 0) {
        if (current === null) {
            return - 1;
        } else if (node.data === current.data) {
            return depth;
        } else if (node.data < current.data) {
            return this.depth(node, current.left, depth + 1);
        } else {
            return this.depth(node, current.right, depth + 1);
        }
    }

    // Checks if the tree is balanced
    isBalanced(node = this.root) {
        if (node === null) {
            return true;
        }

        const leftHeight = this.height(node.left);
        const rightHeight = this.height(node.right);

        if(Math.abs(leftHeight - rightHeight) > 1) {
            return false;
        } else {
            return this.isBalanced(node.left) && this.isBalanced(node.right);
        }
    }

    // Re-balances an unbalanced tree
    reBalance() {
        const values = [];

        this.inOrder((node) => values.push(node.data));
        this.root = this.buildTree(values);
    }

    // Function that will console.log tree in a structured format
    prettyPrint(node = this.root, prefix = "", isLeft = true) {
        if (node === null) {
            if (node === null) {
                return;
            }
        } else if (node.right !== null) {
            this.prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
        }
        console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
        if (node.left !== null) {
            this.prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
        }
    }
}

export {
    Tree
}