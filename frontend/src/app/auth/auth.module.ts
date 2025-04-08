import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { RouterModule, RouterOutlet } from '@angular/router';
import { AuthRoutes } from './auth.routes';  // Importer le fichier des routes spécifiques au module
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,  // Importer RouterOutlet pour la navigation entre les composants
    RouterModule.forChild(AuthRoutes), // Utiliser RouterModule.forChild pour les routes du module
  ],
})
export class AuthModule { }

