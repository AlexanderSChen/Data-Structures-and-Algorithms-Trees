/** BinaryTreeNode: node for a general tree. */

class BinaryTreeNode {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

class BinaryTree {
  constructor(root = null) {
    this.root = root;
  }

  /** minDepth(): return the minimum depth of the tree -- that is,
   * the length of the shortest path from the root to a leaf. */

  minDepth() {
    if(!this.root) return 0;

    function minDepthHelper(node) {
      // if node left and node right are both null return 1 meaning it's a leaf node and returns 1 as the minimum depth of a leaf node is `1`
      if(node.left === null && node.right === null) return 1;
      // if only node left is null return minDepthHelper recursively node.right + 1 to move to the child
      if (node.left === null) return minDepthHelper(node.right) + 1;
      // if node.right is null that means it is a leaf and minDepthHelper is called recursively on the parents of the left node to check the children.
      if (node.right === null) return minDepthHelper(node.left) + 1;

      // at the end of all the recursive calls returns the minimum depth between the left and right node + 1.
      /** 
       *     1
            / \
           2   3
          / \
         4   5

          Math.min(3, 3) + 1 = 4.
       */
      return (
        Math.min(minDepthHelper(node.left), minDepthHelper(node.right)) + 1
      );
    }

    return minDepthHelper(this.root);
  }

  /** maxDepth(): return the maximum depth of the tree -- that is,
   * the length of the longest path from the root to a leaf. */

  maxDepth() {
    if (!this.root) return 0;

    function maxDepthHelper(node) {
      // if the node is a leaf node it will return 1;
      if (node.left === null && node.right === null) return 1;
      // if the node has only one child, either left or right, it returns `maxDepthHelper` recursively called on that child plus 1
      if (node.left === null) return maxDepthHelper(node.right) + 1;
      if(node.right === null) return maxDepthHelper(node.left) + 1;

      // if the node has both left and right children, it returns the maximum of the maxDepthHelper calls on left and right children plus 1
      return (
        Math.max(maxDepthHelper(node.left), maxDepthHelper(node.right)) + 1
      );
    }

    // maxDepth function then returns the result of calling `maxDepthHelper` on the root node.
    return maxDepthHelper(this.root);
  }

  /** maxSum(): return the maximum sum you can obtain by traveling along a path in the tree.
   * The path doesn't need to start at the root, but you can't visit a node more than once. */

  maxSum() {
    let result = 0;

    function maxSumHelper(node) {
      // base case: reach leaf node
      if(node === null) return 0;
      // call maxSumHelper recursively on left and right nodes.
      const leftSum = maxSumHelper(node.left);
      const rightSum = maxSumHelper(node.right);
      // set result to be the max of its current value or the node value + leftSum + rightSum
      // this step keeps track of the max sum found so far and to update it if a new max is found.
      result = Math.max(result, node.val + leftSum + rightSum);
      // return the max of 0, leftSum + node.val, or rightSum + node.val
      return Math.max(0, leftSum + node.val, rightSum + node.val);
    }

    // call maxSumHelper on the root node.
    maxSumHelper(this.root);
    return result;
  }

  /** nextLarger(lowerBound): return the smallest value in the tree
   * which is larger than lowerBound. Return null if no such value exists. */

  nextLarger(lowerBound) {
    if(!this.root) return null;

    // use BFS 
    let queue = [this.root];
    let closest = null;

    // while loop runs as long as there are nodes in queue
    while(queue.length) {
      // set currentNode to be the next element in queue
      let currentNode = queue.shift();
      // set currentVal to the value of the currentNode
      let currentVal = currentNode.val;
      // if the currentVal is greater than the lowerBound set higherThanLowerBound to be true.
      let higherThanLowerBound = currentVal > lowerBound;
      // if currentVal is less than the closest or if the closest is null then set shouldReassignClosest to true
      let shouldReassignClosest = currentVal < closest || closest === null;

      // if currentVal is greater than lowerBound AND currentVal is less than closest or it's null, then set closest to be the currentVal.
      if (higherThanLowerBound && shouldReassignClosest) {
        closest = currentVal;
      }

      // if there is a left or right node they will be pushed into queue and restart the while loop from left to right, thus fulfilling BFS.
      if(currentNode.left) queue.push(currentNode.left);
      if(currentNode.right) queue.push(currentNode.right);
    }

    // return the closest value greater than the lowerBound.
    return closest;
  }

  /** Further study!
   * areCousins(node1, node2): determine whether two nodes are cousins
   * (i.e. are at the same level but have different parents. ) */

  areCousins(node1, node2) {
    // if node1 or node2 are the root node return false
    if (node1 === this.root || node2 === this.root) return false;

    function findLevelAndParent(
      nodeToFind,
      currentNode,
      level = 0,
      data = { level: 0, parent: null }
    ) {
      // if the data already has a parent return data; makes sure we don't keep searching the tree after we've already found the node we are looking for.
      if (data.parent) return data;
      // if the current node is the parent of the nodeToFind, the level of nodeToFind is updated to be level + 1 and parent is updated to be the current node.
      if (currentNode.left === nodeToFind || currentNode.right === nodeToFind) {
        data.level = level + 1;
        data.parent = currentNode;
      }
      // if the current node has a left or right child, findLevelAndParent is called recursively with the children as the current node. adding 1 to the level and progressing down the tree.
      if (currentNode.left) {
        findLevelAndParent(nodeToFind, currentNode.left, level + 1, data);
      }
      if (currentNode.right) {
        findLevelAndParent(nodeToFind, currentNode.right, level + 1, data);
      }
      return data;
    }

    let node1Info = findLevelAndParent(node1, this.root);
    let node2Info = findLevelAndParent(node2, this.root);

    let sameLevel = node1Info && node2Info && node1Info.level === node2Info.level;
    let differentParents = node1Info && node2Info && node1Info.parent !== node2Info.parent;

    // after getting the level and parent information for node1 and node2 the function checks if they are on the same level and have different parents. Both conditions must be true to verify the nodes are cousins.
    return sameLevel && differentParents;
  }

  /** Further study!
   * serialize(tree): serialize the BinaryTree object tree into a string. */

  static serialize(tree) {
    // initialize values to store the serialization of the tree
    const values = [];

    function traverse(node) {
      // if there is a node, push the node value into values and traverse left and right node. else, push `#` which is a `null` value in serialization.
      if (node) {
        values.push(node.val);
        traverse(node.left);
        traverse(node.right);
      } else {
        values.push('#');
      }
    }

    // call traverse on the root to start from the top.
    traverse(tree.root);
    // join the values in the array so they're separated by a space in a string.
    return values.join(" ");
  }

  /** Further study!
   * deserialize(stringTree): deserialize stringTree into a BinaryTree object. */

  static deserialize(stringTree) {
    // check if stringTree is falsy, return null if it is
    if (!stringTree) return null;

    // split the string into an array of values with space as separator.
    const values = stringTree.split(" ");

    function buildTree() {
      // building a tree starting from the beginning of the array.
      if (values.length) {
        const currentVal = values.shift();

        // check if values array has any values left. return null if not.
        if (currentVal === "#") return null;

        // remember to convert values back into numbers
        let currentNode = new BinaryTreeNode(+currentVal);
        currentNode.left = buildTree();
        currentNode.right = buildTree();

        return currentNode;
      }
    }

    const root = buildTree();
    return new BinaryTree(root);
  }

  /** Further study!
   * lowestCommonAncestor(node1, node2): find the lowest common ancestor
   * of two nodes in a binary tree. */

  lowestCommonAncestor(node1, node2, currentNode=this.root) {
    // base case 1: empty tree
    if (currentNode === null) return null;

    // base case 2: root is one of the target nodes
    if (currentNode === node1 || currentNode === node2) return currentNode;

    // recursively search the left sub-tree
    const left = this.lowestCommonAncestor(node1, node2, currentNode.left);

    // recursively search the right sub-tree
    const right = this.lowestCommonAncestor(node1, node2, currentNode.right);

    // if neither left nor right is null, currentNode is the ancestor
    if (left !== null && right !== null) return currentNode;

    // if one node is not null, return it
    if (left !== null || right !== null) return left || right;

    // left and right are both null, return null
    if (left === null && right === null) return null;
  }
}

module.exports = { BinaryTree, BinaryTreeNode };
