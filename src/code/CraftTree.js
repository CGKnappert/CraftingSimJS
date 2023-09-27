// obj = [
//     macro = [],
//     startSynthesisMacro = [],
//     qualityMacro = [],
//     finishSynthesisMacro = [],
//     returnState = 0,
//     quality = 0,
//     touchNode = null,
//     synthesisNode = null,

// ]


const synthesisStack = [['Basic Synthesis'], ['Careful Synthesis'], ['Observe', 'Focused Synthesis'], ['Groundwork'], ['Prudent Synthesis']];
const touchStack = [['Prudent Touch'], ['Basic Touch'], ['Standard Touch'], ['Advanced Touch'], ['Preparatory Touch'], ['Observe', 'Focused Touch']];

const fullSynthesisStack = [['Basic Synthesis'], ['Careful Synthesis'], ['Observe', 'Focused Synthesis'], ['Groundwork'], ['Prudent Synthesis'], ['Trained Finesse'], ['Delicate Synthesis']];
const fullTouchStack = [['Prudent Touch'], ['Basic Touch'], ['Standard Touch'], ['Advanced Touch'], ['Preparatory Touch'], ['Precise Touch'], ['Observe', 'Focused Touch'], ['Hasty Touch'], ['Trained Finesse'], ['Delicate Synthesis'], ['Rapid Synthesis'], ['Intensive Synthesis']];

const durabilityBuffStack = [['Waste Not'], ['Waste Not II'], ['Manipulation'], [`Master's Mend`]];
const touchBuffStack = [['Innovation'], ['Great Strides']];
const synthesisBuffStack = [['Veneration']];

const random = 1;

class CraftSearchTree {
    constructor(root) {
        this.root = root;
        this.bestMacro = null;
    }

    // insert(obj, nodeType) {
    //     if (this.root === null) {
    //         this.root = CraftNode(obj);
    //     }
    //     else {
    //         // this.insertNode(this.root, newNode, nodeType);
    //     }
    // }

    insertNode(node, newNode) {
    // sort by macro in order to prevent duplicates
    if(newNode.obj.macro < node.obj.macro) {
        if(node.left === null) {
            node.left = newNode;
            return node.left;
        }
        else {
            return this.insertNode(node.left, newNode);
        }
    }
    else if (newNode.obj.macro === node.obj.macro) {
        // return found node if existing
        return node;
    }
    else {
        if(node.right === null) {
            node.right = newNode;
            return node.right;
        }
        else {
            return this.insertNode(node.right,newNode);
        }
    }
}

    remove(obj) {
        // needed?
        this.root = this.removeNode(this.root, obj);
    }

    // removeNode(node, obj) {
    //     if(node === null) {
    //         return null;
    //     }
    //     else if (key < node.data) {
    //         node.left = this.removeNode(node.left, key);
    //         return node;
    //     }
    //     else if (key > node.data) {
    //         node.right = this.removeNode(node.right, key);
    //         return node;
    //     }
    //     else {
    //         if (node.left === null && node.right === null) {
    //             node = null;
    //             return node;
    //         }
    //         if (node.left === null) {
    //             node = node.right;
    //             return node;
    //         }
    //         else if (node.right === null) {
    //             node = node.left;
    //             return node;
    //         }
    //         else {
    //             var aux = this.findMinNode(node.right);
    //             node.data = aux.data;
         
    //             node.right = this.removeNode(node.right, aux.data);
    //             return node;
    //         }
    //     }
    // }

    findMinNode(node) {
        if(node.left === null) {
            return node;
        }
        else {
            return this.findMinNode(node.left);
        }
    }

    // Helper function
    // getRootNode()
    // inorder(node)
    preorder(node) {
        if(node !== null) {
            console.log(node.data);
            this.preorder(node.left);
            this.preorder(node.right);
        }
    }     

    postorder(node) {
        if(node !== null) {
            this.preorder(node.left);
            this.preorder(node.right);
            console.log(node.data);
        }
    }           
    // postorder(node)
    // search(node, data)
}

// obj = {macro: [],
//     startSynthesisMacro: [],
//     qualityMacro: [],
//     finishSynthesisMacro: [],
//     returnState: null}
class CraftNode {
    constructor(macroObj) {
        // this.macroObj = {macro: [],
        //     startSynthesisMacro: [],
        //     qualityMacro: [],
        //     finishSynthesisMacro: [],
        //     returnState: null};
        this.macroObj = macroObj;

        this.complete = (macroObj.returnState === 4);
        this.touchNodes = [];
        this.synthesisNodes = [];
        this.touchCount = 0;
        this.synthesisCount = 0;
    }

    set macroObjSet(macroObj) {
        this.macroObj = macroObj;
    }

    get macroObjGet() {
        return this.macroObj;
    }

    addTouchNode(node) {
        this.touchNodes.push(node);
        this.touchCount += 1;
    }

    addSynthesisNode(node) {
        this.synthesisNodes.push(node);
        this.synthesisCount += 1;
    }
}

export default CraftSearchTree;