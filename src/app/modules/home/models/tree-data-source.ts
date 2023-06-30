import { NestedTreeControl } from "@angular/cdk/tree";
import { Component, ViewChild, AfterViewInit } from "@angular/core";
import { MatTreeNestedDataSource, MatTree } from "@angular/material/tree";

/**
 * Food data with nested structure.
 * Each node has a name and an optional list of children.
 */
export interface ButtonNode {
  name: string;
  children?: ButtonNode[];
}

export class TreeDataSource extends MatTreeNestedDataSource<ButtonNode> {
  constructor(
    private treeControl: NestedTreeControl<ButtonNode>,
    intialData: ButtonNode[]
  ) {
    super();
    super.data = intialData;
  }

  /** Add node as child of parent */
  public add(node: ButtonNode, parent: ButtonNode) {
    // add dummy root so we only have to deal with `ButtonNode`s
    const newTreeData = { name: "Dummy Root", children: this.data };
    this._add(node, parent, newTreeData);
    this.data = newTreeData.children;
  }

  /*
   * For immutable update patterns, have a look at:
   * https://redux.js.org/recipes/structuring-reducers/immutable-update-patterns/
   */

  protected _add(newNode: ButtonNode, parent: ButtonNode, tree: ButtonNode): boolean {
    if (tree === parent) {
      console.log(
        `replacing children array of '${parent.name}', adding ${newNode.name}`
      );
      tree.children = [...tree.children!, newNode];
      this.treeControl.expand(tree);
      return true;
    }
    if (!tree.children) {
      console.log(`reached leaf node '${tree.name}', backing out`);
      return false;
    }
    return this.update(tree, this._add.bind(this, newNode, parent));
  }

  protected update(tree: ButtonNode, predicate: (n: ButtonNode) => boolean) {
    let updatedTree: ButtonNode, updatedIndex: number;

    tree.children!.find((node, i) => {
      if (predicate(node)) {
        console.log(`creating new node for '${node.name}'`);
        updatedTree = { ...node };
        updatedIndex = i;
        this.moveExpansionState(node, updatedTree);
        return true;
      }
      return false;
    });

    if (updatedTree!) {
      console.log(`replacing node '${tree.children![updatedIndex!].name}'`);
      tree.children![updatedIndex!] = updatedTree!;
      return true;
    }
    return false;
  }

  moveExpansionState(from: ButtonNode, to: ButtonNode) {
    if (this.treeControl.isExpanded(from)) {
      console.log(`'${from.name}' was expanded, setting expanded on new node`);
      this.treeControl.collapse(from);
      this.treeControl.expand(to);
    }
  }
}
