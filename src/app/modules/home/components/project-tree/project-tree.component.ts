import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProjectManagerService } from '../../services/project-manager.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-project-tree',
  templateUrl: './project-tree.component.html',
  styleUrls: ['./project-tree.component.scss'],
})
export class ProjectTreeComponent implements OnInit, OnDestroy {
  subscriptions: Subscription[] = [];
  rootTreeElement: HTMLElement = document.createElement('div');
  constructor(private _projectManagerService: ProjectManagerService) {}

  ngOnInit(): void {
    this.createInitalTreeContainer();
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
  clearTree(): void {
    while (this.rootTreeElement.firstChild) {
      this.rootTreeElement.removeChild(this.rootTreeElement.firstChild);
    }
  }
  createInitalTreeContainer(): void {
    this.rootTreeElement.setAttribute('id', 'treeRooUl');
    const treeContainer = document.getElementById('treeContainer');
    treeContainer?.appendChild(this.rootTreeElement);
  }
  addResourceToRoot(resourceType: number): void {
    let element = document.createElement('div');
    let rootElement = document.getElementById('treeRooUl');
    if (resourceType === 1) {
      let guid = this.newGuid();
      let pmElementContainer = document.createElement('div');
      pmElementContainer.className = 'pm-container';
      let pmElement = document.createElement('button');
      let pmElementText = document.createElement('span');
      let pmElementIcon = document.createElement('span');
      pmElementText.innerHTML  = "PM";
      pmElementIcon.innerHTML = ">";
      pmElement.appendChild(pmElementText);
      pmElement.appendChild(pmElementIcon);
      pmElement.className = 'list-item-btn';

      pmElementContainer.appendChild(pmElement);

      let pmElementGroupAndList = document.createElement('div');
      pmElementGroupAndList.className = 'group-list';
      let pmElementList = document.createElement('div');
      let pmElementAddButtonGroup = document.createElement('div');
      let pmElementAddPm = document.createElement('button');
      pmElementAddPm.innerHTML = "+ PM";
      pmElementAddPm.className = 'list-item-btn';
      let pmElementAddDeveloper = document.createElement('button');
      pmElementAddDeveloper.innerHTML = "+ Developer";
      pmElementAddDeveloper.className = 'list-item-btn';
      pmElementAddDeveloper.style.marginLeft = '8px';
      let pmElementAddQa = document.createElement('button');
      pmElementAddQa.innerHTML = "+ QA";
      pmElementAddQa.className = 'list-item-btn';
      pmElementAddQa.style.marginLeft = '8px';
      pmElementAddQa.setAttribute('id', '10');
      pmElementAddButtonGroup.appendChild(pmElementAddPm);
      pmElementAddButtonGroup.appendChild(pmElementAddDeveloper);
      pmElementAddButtonGroup.appendChild(pmElementAddQa);

      pmElementGroupAndList.appendChild(pmElementAddButtonGroup);
      pmElementGroupAndList.appendChild(pmElementList);

      pmElementContainer.appendChild(pmElementGroupAndList);
      element.appendChild(pmElementContainer);
    } else if (resourceType === 2) {
      element.innerHTML = `<button class="list-item-btn" (click)="addNestedItem()">Developer</button>`;
    } else {
      element.innerHTML = `<button class="list-item-btn">QA</button>`;
    }
    element.style.marginTop = '16px';
    rootElement?.appendChild(element);
    this._projectManagerService.addCost.next(
      resourceType === 1 ? 300 : resourceType === 2 ? 1000 : 500
    );
  }
  addNestedItem(): void {
    console.log('nested button working');
  }
  newGuid(): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0,
      v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }
}
