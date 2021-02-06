import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddtaskComponent } from './addtask/addtask.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ViewtaskComponent } from './viewtask/viewtask.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
  },
  {
    path: 'addTask',
    component: AddtaskComponent,
  },
  {
    path: 'viewTask',
    component: ViewtaskComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
