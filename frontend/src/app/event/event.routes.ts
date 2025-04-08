import { Routes } from "@angular/router";
import { IndexComponent } from "./index/index.component";
import { CreateComponent } from "./create/create.component";
import { ViewComponent } from "./view/view.component";
import { EditComponent } from "./edit/edit.component";

export const EventRoutes: Routes = [
    { path: '', redirectTo: 'index', pathMatch: 'full' },  // /events/ → /events/index
    { path: 'index', component: IndexComponent },          // /events/index
    { path: 'create', component: CreateComponent },        // /events/create
    { path: ':id/view', component: ViewComponent },        // /events/1/view
    { path: ':id/edit', component: EditComponent } ,        // /events/1/edit
];

 