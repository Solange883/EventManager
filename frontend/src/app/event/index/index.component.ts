import { Component, OnInit  } from '@angular/core';
import { NgFor } from '@angular/common';
import { RouterModule } from '@angular/router';
import { EventService } from '../event.service';
import { Event } from '../event';


@Component({
  selector: 'app-index',
  imports: [NgFor, RouterModule,],
  templateUrl: './index.component.html',
  styleUrl: './index.component.scss'
})
export class IndexComponent  implements OnInit{
  events: Event[] = [];
  
  constructor(private eventService: EventService) {}

  ngOnInit(): void {
    this.eventService.getAll().subscribe((data: Event[]) => {
    this.events = data;
    })
  }

  deleteEvent(id: number){
    this.eventService.delete(id).subscribe(res => {
    this.events = this.events.filter(item => item.id != id);
    })
  }
  inscrireEvent(id: number){
    this.eventService.createRegistration(id).subscribe(res => {
      alert("Inscription réussie");
    })
  }

}

