import { Component, OnInit  } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent  implements OnInit{

  registerForm!: FormGroup

  constructor(private authService: AuthService,private router: Router){}
  
  ngOnInit(): void {
    this.registerForm = new FormGroup({
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      });
  }

  get f(){
    return this.registerForm.controls;
  }

  submit(){
    console.log('Submit button clicked');
    console.log(this.registerForm.value);
    this.authService.connexion(this.registerForm.value).subscribe((res:any) => {
      console.log('Connexion réussie !');

      if (res.access_token) {
        localStorage.setItem('token', res.access_token); 
        
       this.router.navigateByUrl('/dashboard');}
      else {
        console.error('Token non trouvé dans la réponse de l\'API.');
      
      }
    }, (error) => {
      console.error('Erreur lors de la connexion:', error);
      // Gérer l'erreur ici, par exemple en affichant un message à l'utilisateur
    })
  }


}

