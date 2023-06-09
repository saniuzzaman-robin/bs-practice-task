import { Component } from '@angular/core';
import { ProjectManagerService } from 'src/app/modules/home/services/project-manager.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  constructor(private _projectManagerService: ProjectManagerService) {}
  resetCost(): void {
    this._projectManagerService.resetCost.next(true);
  }
}
