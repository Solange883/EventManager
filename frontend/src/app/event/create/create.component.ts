import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule, NgIf } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { EventService } from '../event.service';


@Component({
  selector: 'app-create',
  imports: [CommonModule,
    ReactiveFormsModule,
    RouterModule,],
  templateUrl: './create.component.html',
  styleUrl: './create.component.scss'
})
export class CreateComponent  implements OnInit {

  form!: FormGroup
 


  constructor(private eventService: EventService,private router: Router){}
  
  ngOnInit(): void {
    this.form = new FormGroup({
      titre: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      date: new FormControl('', [Validators.required]),
      lieu: new FormControl('', [Validators.required]),
      categorie: new FormControl('', [Validators.required]),
      image: new FormControl('', [Validators.required]),
      });

     
  }

  get f(){
    return this.form.controls;
  }


  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.form.patchValue({
        image: file
      });
    }
  }

  previewUrl: string | ArrayBuffer | null = null;
  selectedFile: File | null = null;

  onFileSelected(e: Event): void {
    const input = e.target as HTMLInputElement;
  
    if (input.files && input.files[0]) {
      this.selectedFile = input.files[0];
  
      const reader = new FileReader();
      reader.onload = () => {
        this.previewUrl = reader.result;
      };
      reader.readAsDataURL(this.selectedFile);
    }
  }
  

  submit() {
    const formData = new FormData();
    formData.append('titre', this.form.get('titre')?.value);
    formData.append('description', this.form.get('description')?.value);
    formData.append('date', this.form.get('date')?.value);
    formData.append('lieu', this.form.get('lieu')?.value);
    formData.append('categorie', this.form.get('categorie')?.value);
    if (this.selectedFile) {
      formData.append('image', this.selectedFile, this.selectedFile.name);
    }
  
    this.eventService.create(formData).subscribe((res: any) => {
      alert('Événement enregistré avec succès !');
      this.router.navigateByUrl('events/index');
    });
  }
  


 
}

