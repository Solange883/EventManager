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
      categorie: new FormControl('', [Validators.required])
      });

     
  }

  get f(){
    return this.form.controls;
  }

  submit(){
    console.log('Submit button clicked');
    console.log(this.form.value);
    this.eventService.create(this.form.value).subscribe((res:any) => {
      console.log('Evenement enregistré avec succès !');
      this.router.navigateByUrl('events/index');
    })
  }

}

