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
		var parent = current;
		while(current) {
			if (data < current.data) {
				parent = current;
				current = current.left;
			} else if (data > current.data) {
				parent = current;
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
				if(!current.left && !current.right){    //0 children
					if(data > parent.data){
						parent.right = null;
					}else if(data < parent.data){
						parent.left = null;
					}else {
						this.root = null;
					}
				}else if(current.left || current.right){   //1 child
					var child = current.left || current.right;
					if(data > parent.data){
						parent.right = child;
					}else{
						parent.left = child;
					}
				}else{              	                   //2 children
					parent = current;
					current = current.right;
					var par;
					var curMin;
					while(current){
						par = curMin;
						curMin = current;
						current = current.left;
					}
					parent.data = curMin.data;
					par.left = curMin.right || null;
				}
				return true;
			}
		}
	}

	size() {
		if(!this.root){
			return 0;
		}else{
			return this.counted(this.root);
		}
	}

	isEmpty() {
		if(!this.root)
			return true;
		else return false;
	}
	counted(node){
		if(!node){
			return 0;
		}
		return (this.counted(node.left) + this.counted(node.right) + 1);
	}
}
