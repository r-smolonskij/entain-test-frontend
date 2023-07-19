import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EventsListComponent } from './views/events-list/events-list.component';
import { EventsCreateComponent } from './views/events-create/events-create.component';

const routes: Routes = [
  { path: "", redirectTo: "/events", pathMatch: "full" },
  { path: "events", component: EventsListComponent },
  { path: "events/create", component: EventsCreateComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
