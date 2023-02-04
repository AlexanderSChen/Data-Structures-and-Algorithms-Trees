/** TreeNode: node for a general tree. */

class TreeNode {
  constructor(val, children = []) {
    this.val = val;
    this.children = children;
  }
}

class Tree {
  constructor(root = null) {
    this.root = root;
  }

  /** sumValues(): add up all of the values in the tree. */

  sumValues() {
    if (!this.root) return 0;

    let total = this.root.val;

    function sumHelper(node) {
      // go through all the children for a Node
      for (let child of node.children) {
        // accumulate all values
        total += child.val;
        // if it has any children recurse with child as root
        if (child.children.length > 0) sumHelper(child);
      }
    }
    sumHelper(this.root);
    return total;
  }

  /** countEvens(): count all of the nodes in the tree with even values. */

  countEvens() {
    if (!this.root) return 0;

    // if root value % 2 === 0 returns 1 (true) if the value is even and 0 (false) if odd. 
    let count = this.root.val % 2 === 0 ? 1 : 0;

    function countEvensHelper(node) {
      // go through all children for a node
      for (let child of node.children) {
        // if even increment count
        if(child.val % 2 === 0) count++;
        // if the child has children call countEvensHelper on child
        if(child.children.length > 0) countEvensHelper(child);
      }
    }
    countEvensHelper(this.root);
    return count;
  }

  /** numGreater(lowerBound): return a count of the number of nodes
   * whose value is greater than lowerBound. */

  numGreater(lowerBound) {
    if (!this.root) return 0;

    let count = this.root.val > lowerBound ? 1 : 0;

    function countEvensHelper(node) {
      // go through all children for a node
      for (let child of node.children) {
        // count child if value is greater than lowerbound
        if (child.val > lowerBound) count++;
        // if there are children recurse helper with child
        if (child.children.length > 0) countEvensHelper(child);
      }
    }
    countEvensHelper(this.root);
    return count;
  }
}

module.exports = { Tree, TreeNode };
