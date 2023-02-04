function TreeNode(val) {
    this.val = val;
    this.left = null;
    this.right = null;
}

/** 
 * O(N) time complexity
 * O(1) space complexity
 */

function lowestCommonAncestor(root, p, q) {
    /** base case 1: root is null */
    if(root === null) return null;

    /** base case 2: root is one of the target nodes */
    if (root === p || root === q) return root;

    /** recursively search left sub tree */
    const left = lowestCommonAncestor(root.left, p, q);

    /** recursively search right sub tree */
    const right = lowestCommonAncestor(root.right, p, q);

    /** if both left and right are valid, root is the ancestor */
    if (left !== null && right !== null) return root;

    /** else if one node was valid and one was not, return valid node */
    else if (left !== null || right !== null) return left || right;

    /** if left and right are null return null */
    else if (left === null && right === null) return null;
}

/** More concise implementation */
function lowestCommonAncestorShorthand(root, p, q) {
    // if node is null
    if(!root || root === p || root === q) return root;
    const left = lowestCommonAncestor(root.left, p, q);
    const right = lowestCommonAncestor(root.right, p, q);
    return left && right ? root : left || right;
}

module.exports = { TreeNode, lowestCommonAncestor };