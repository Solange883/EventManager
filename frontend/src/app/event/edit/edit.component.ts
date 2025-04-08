import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormControl, FormGroup,  ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule  } from '@angular/common';
import { EventService } from '../event.service';
import { Event } from '../event';

@Component({
  selector: 'app-edit',
  imports: [CommonModule,
    ReactiveFormsModule,
    RouterModule,],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.scss'
})
export class EditComponent implements OnInit {
  id!: number;
  event!: Event;
  form!: FormGroup;

  constructor(
    private eventService: EventService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Récupération de l'ID du paramètre de la route
    this.id = this.route.snapshot.params['id'];
    
    // Récupérer les données du post à modifier
    this.eventService.find(this.id).subscribe((data: Event) => {
      this.event = data;
    });

    // Initialisation du formulaire avec les validations
    this.form = new FormGroup({
      titre: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      date: new FormControl('', [Validators.required]),
      lieu: new FormControl('', [Validators.required]),
      categorie: new FormControl('', [Validators.required])
    });
  }

  // Getter pour accéder aux contrôles du formulaire plus facilement
  get f() {
    return this.form.controls;
  }

  // Méthode de soumission du formulaire
  submit() {
    console.log(this.form.value);
    // Mise à jour du post avec les nouvelles valeurs
    this.eventService.update(this.id, this.form.value).subscribe((res: any) => {
      console.log('Evenement modifié avec succès !');
      // Redirection vers la liste des posts après modification
      this.router.navigateByUrl('events/index'); //on utilise pas routerLink a cause de la logique supplementaire
    });
  }
}
