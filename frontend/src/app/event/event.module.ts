import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { IndexComponent } from './index/index.component';
import { CreateComponent } from './create/create.component';
import { ViewComponent } from './view/view.component';
import { EditComponent } from './edit/edit.component';
import { EventRoutes } from './event.routes';  // Importer le fichier des routes spécifiques au module




@NgModule({
  imports: [
    
    IndexComponent, 
    ViewComponent,
    CreateComponent,
    EditComponent,
    CommonModule,
    RouterModule.forChild(EventRoutes)
  ],
})
export class EventModule { }
