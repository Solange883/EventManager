import { Component, OnInit  } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, RouterModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent  implements OnInit{

  registerForm!: FormGroup

  constructor(private authService: AuthService,private router: Router){}
  
  ngOnInit(): void {
    this.registerForm = new FormGroup(
      {
        name: new FormControl('', [Validators.required]),
        email: new FormControl('', [Validators.required]),
        password: new FormControl('', [Validators.required]),
        password_confirmation: new FormControl('', [Validators.required]),
      },
      { validators: this.passwordMatchValidator } // Ajout du validateur de correspondance
    );
  }

  // Validateur personnalisé pour vérifier la correspondance des mots de passe
  passwordMatchValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const password = control.get('password');
    const confirmPassword = control.get('password_confirmation');

    if (password && confirmPassword && password.value !== confirmPassword.value) {
        return { passwordMismatch: true };
    }
    return null;
}

  get f(){
    return this.registerForm.controls;
  }

  submit() {
    if (this.registerForm.invalid) return;

    this.authService.inscription(this.registerForm.value).subscribe({
      next: (res: any) => {
        localStorage.setItem('token', res.access_token); // Stocke le token
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        console.error('Erreur d\'inscription:', err);
        alert(`Erreur: ${err.error?.message || 'Veuillez vérifier vos informations'}`);
      }
    });
  }


}
