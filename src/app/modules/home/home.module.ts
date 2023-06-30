import { MatMenuModule } from '@angular/material/menu';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectOverviewComponent } from './components/project-overview/project-overview.component';
import { ProjectTreeComponent } from './components/project-tree/project-tree.component';
import { ProjectManagerComponent } from './components/project-manager/project-manager.component';
import { Route, RouterModule } from '@angular/router';
import {CdkTreeModule} from '@angular/cdk/tree';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatTreeModule} from '@angular/material/tree';

const routes: Route[] = [{
  path: '',
  component: ProjectManagerComponent
}]
@NgModule({
  declarations: [
    ProjectOverviewComponent,
    ProjectTreeComponent,
    ProjectManagerComponent
  ],
  imports: [
    CommonModule,
    MatTreeModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    CdkTreeModule,
    RouterModule.forChild(routes)
  ]
})
export class HomeModule { }
