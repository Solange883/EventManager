import { Component, OnInit  } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { RouterModule } from '@angular/router';
import { EventService } from '../event.service';
import { Event } from '../event';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-index',
  imports: [NgFor,NgIf, RouterModule,FormsModule],
  templateUrl: './index.component.html',
  styleUrl: './index.component.scss'
})
export class IndexComponent  implements OnInit{
  events: Event[] = [];
  isLoggedIn: boolean = false;

  filterDate: string = '';
  filterLieu: string = '';
  filterCategorie: string = '';
  
  constructor(private eventService: EventService, private router: Router,) {}

  ngOnInit(): void {
    this.eventService.getAll().subscribe((data: Event[]) => {
    this.events = data;
    });
    this.isLoggedIn = !!localStorage.getItem('token');
  }

 
  

  deleteEvent(id: number){
    
    this.eventService.delete(id).subscribe(res => {
    this.events = this.events.filter(item => item.id != id);
    alert("Suppression réussie");
    })
  }

  

  inscrireEvent(id: number){
    this.eventService.createRegistration(id).subscribe(res => {
      alert("Inscription réussie");
    })
  }

  // Appliquer les filtres
  applyFilter(): void {
    this.eventService.getAll(this.filterDate, this.filterLieu, this.filterCategorie).subscribe(
      (data: Event[]) => {
        this.events = data;
      },
      (error) => {
        console.error('Erreur lors du filtrage des événements', error);
      }
    );
  }

}

