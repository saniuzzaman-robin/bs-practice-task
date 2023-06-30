import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProjectManagerService } from '../../services/project-manager.service';
import { Subscription } from 'rxjs';
import { ButtonNode, TreeDataSource } from '../../models/tree-data-source';
import { NestedTreeControl } from '@angular/cdk/tree';

let TREE_DATA: ButtonNode[] = [];

@Component({
  selector: 'app-project-tree',
  templateUrl: './project-tree.component.html',
  styleUrls: ['./project-tree.component.scss'],
})
export class ProjectTreeComponent implements OnInit, OnDestroy {
  subscriptions: Subscription[] = [];
  treeControl = new NestedTreeControl<ButtonNode>((node) => node.children);
  dataSource = new TreeDataSource(this.treeControl, TREE_DATA);
  constructor(private _projectManagerService: ProjectManagerService) {}

  ngOnInit(): void {
    this.subscriptions.push(
      this._projectManagerService.addResource.subscribe((res) => {
        if (res) {
          this.addResourceToRoot(res);
        }
      }),
      this._projectManagerService.resetCost.subscribe((res) => {
        if (res) {
          this.clearTree();
        }
      })
    );
  }
  ngOnDestroy(): void {
    this.subscriptions.forEach((item) => item.unsubscribe());
  }
  hasChild = (_: number, node: ButtonNode) =>
    !!node.children && node.children.length > 0;

  addResource(type: number, parentNode: ButtonNode) {
    let btnNode: ButtonNode = {
      name: type === 1 ? 'PM' : type === 2 ? 'Developer' : 'QA',
      children: [],
    };
    this.dataSource.add(btnNode, parentNode);
    this._projectManagerService.addCost.next(type);
  }
  clearTree(): void {
    TREE_DATA = [];
    this.dataSource = new TreeDataSource(this.treeControl, TREE_DATA);
  }
  addResourceToRoot(type: number): void {
    let btnNode: ButtonNode = {
      name: type === 1 ? 'PM' : type === 2 ? 'Developer' : 'QA',
      children: [],
    };
    TREE_DATA.push(btnNode);
    this.dataSource = new TreeDataSource(this.treeControl, TREE_DATA);
    this._projectManagerService.addCost.next(type);
  }
}
