const { lowestCommonAncestor, TreeNode } = require("./lca");

describe("LCA", function() {
    it("functions_exist", function() {
        // failure message:
        // do not mess with treenode or lowestcommonancestor function signatures
        expect(typeof TreeNode === "function").toBe(true);
        expect(typeof lowestCommonAncestor === "function").toBe(true);
    });
    it("passes_example_tree", function() {
        //failure message:
        // failed for tree same as test example
        const root = new TreeNode(3);

        /** build left subtree */
        const left = new TreeNode(5);
        root.left = left;

        const left_left = new TreeNode(6);
        left.left = left_left;

        const left_right = new TreeNode(2);
        left.right = left_right;

        const left_right_left = new TreeNode(7);
        left_right.left = left_right_left;

        const left_right_right = new TreeNode(4);
        left_right.right = left_right_right;

        /** build right subtree */
        const right = new TreeNode(1);
        root.right = right;

        const right_left = new TreeNode(0);
        right.left = right_left;

        const right_right = new TreeNode(8);
        right.right = right_right;

        /**
         *           3
         *         /   \
         *        5      1
         *       / \     / \
         *      6   2    0  8
         *         / \
         *        7  4
         */

        /** test examples */
        // root = 3, p = 5, q = 1
        expect(lowestCommonAncestor(root, left, right)).toBe(root);
        // --> root (3)

        // root 3, p = 2, q = 7
        expect(lowestCommonAncestor(root, left_right, left_right_left)).toBe(left_right);
        // left_right (2)

        // root = 3, p = 7, q = 6
        expect(lowestCommonAncestor(root, left_right_left, left_left)).toBe(left);
        // --> left (5)

        // root = 3, p = 8, q = 0
        expect(lowestCommonAncestor(root, right_left, right_right)).toBe(right);
        // --> right (1)
    })
})