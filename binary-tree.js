'use strict';

class BinaryTree {
	constructor() {
		this.root = null;
	}

	insert(data) {
		if(!this.root){
			this.root = new Node(data);
			return true;
		}
		var current = this.root;
		var parent;
		while(current) {
			parent = current;
			if (data < current.data) {
				current = current.left;
			} else if (data > current.data) {
				current = current.right;
			} else {
				return false;
			}
		}
		if(data > parent.data){
			parent.right = new Node(data);
		}else{
			parent.left = new Node(data);
		}
		return true;
	}

	contains(data) {
		var current = this.root;
		while(current) {
			if (data < current.data) {
				current = current.left;
			} else if (data > current.data) {
				current = current.right;
			} else {
				return true;
			}
		}
		return false;
	}

	remove(data) {
		if(data === undefined){
			return false;
		}
		var current = this.root;
		var parent = current;
		while(current) {
			if (data < current.data) {
				parent = current;
				current = current.left;
			} else if(data > current.data) {
				parent = current;
				current = current.right;
			}else{
				if(!current.left && !current.right){
					if(data > parent.data){
						parent.right = null;
					}else if(data < parent.data){
						parent.left = null;
					}else {
						this.root = null;
					}
				}else if (current.left && current.right){
					parent = current;
					current = current.right;
					var min, parentMin;
					while(current){
						parentMin = min;
						min = current;
						current = current.left;
					}
					parent.data = min.data;
					if(parentMin === undefined){
						parent.right = null;
					}else{
						parentMin.left = min.right || null;
					}
				}else{
					var child = current.left || current.right;
					if(data > parent.data){
						parent.right = child;
					}else{
						parent.left = child;
					}
				}
				return true;
			}
		}return false;
	}

	size() {
		if(!this.root){
			return 0;
		}else{
			return this.calc(this.root);
		}
	}

	isEmpty() {
		if(!this.root)
			return true;
		else
			return false;
	}
	calc(node){
		if(!node){
			return 0;
		}
		return (this.calc(node.left) + this.calc(node.right) + 1);
	}

}
