import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { ProjectManagerService } from '../../services/project-manager.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-project-overview',
  templateUrl: './project-overview.component.html',
  styleUrls: ['./project-overview.component.scss'],
})
export class ProjectOverviewComponent implements OnInit, OnDestroy {
  subscriptions: Subscription[] = [];
  totalCost: number = 0;
  constructor(private _projectManagerService: ProjectManagerService) {}
  ngOnInit(): void {
    this.subscriptions.push(
      this._projectManagerService.addCost.subscribe((resourceType) => {
        if (resourceType) {
          this.totalCost +=
            resourceType === 1 ? 300 : resourceType === 2 ? 1000 : 500;
        }
      }),
      this._projectManagerService.resetCost.subscribe((res) => {
        if (res) {
          this.totalCost = 0;
        }
      })
    );
  }
  ngOnDestroy(): void {
    this.subscriptions.forEach((item) => item.unsubscribe());
  }
  addNewResource(type: number): void {
    this._projectManagerService.addResource.next(type);
  }
}
