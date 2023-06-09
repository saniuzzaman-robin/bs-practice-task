import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectOverviewComponent } from './components/project-overview/project-overview.component';
import { ProjectTreeComponent } from './components/project-tree/project-tree.component';
import { ProjectManagerComponent } from './components/project-manager/project-manager.component';
import { Route, RouterModule } from '@angular/router';


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
    RouterModule.forChild(routes)
  ]
})
export class HomeModule { }
