'use strict';

class BinaryTree {
    constructor() {
        this.root = null;
    }

    insert(data) {
        if (!this.root) {
            this.root = new Node(data);
            return true;
        }
        var parent = this.searchNode(this.root, data);
        if (data > parent.data) {
            parent.right = new Node(data);
        } else {
            parent.left = new Node(data);
        }
        return true;
    }

    contains(data) {
        var res = this.searchNode(this.root, data);
        return !res;

    }

    remove(data) {
        if (data === undefined) {
            return false;
        }
        var current = this.root;
        var parent = current;
        while (current) {
            if (data < current.data) {
                parent = current;
                current = current.left;
            } else if (data > current.data) {
                parent = current;
                current = current.right;
            } else {
                if (!current.left && !current.right) {  // no child case
                    if (data > parent.data) {
                        parent.right = null;
                    } else if (data < parent.data) {
                        parent.left = null;
                    } else {
                        this.root = null;
                    }
                } else if (current.left && current.right) {  // two children case
                    parent = current;
                    current = current.right;
                    var min, parentMin;
                    while (current) {
                        parentMin = min;
                        min = current;
                        current = current.left;
                    }
                    parent.data = min.data;
                    if (parentMin === undefined) {
                        parent.right = null;
                    } else {
                        parentMin.left = min.right || null;
                    }
                } else {                                     // one child case
                    var child = current.left || current.right;
                    if (data > parent.data) {
                        parent.right = child;
                    } else {
                        parent.left = child;
                    }
                }
                return true;
            }
        }
        return false;
    }

    size() {
        if (!this.root) {
            return 0;
        } else {
            return this.calculateSize(this.root);
        }
    }

    isEmpty() {
        if (!this.root)
            return true;
        else
            return false;
    }

    calculateSize(node) {
        if (!node) {
            return 0;
        }
        return (this.calculateSize(node.left) + this.calculateSize(node.right) + 1);
    }

    searchNode(current, data) {
        var parent;
        while (current) {
            parent = current;
            if (data < current.data) {
                current = current.left;
            } else if (data > current.data) {
                current = current.right;
            } else {
                return false;
            }
        }
        return parent;
    }

}
