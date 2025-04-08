import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Event } from '../event';
import { EventService } from '../event.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-view',
  imports: [RouterModule, CommonModule],
  templateUrl: './view.component.html',
  styleUrl: './view.component.scss'
})
export class ViewComponent implements OnInit {
  id!: number;
  event!: Event;

  constructor(
    private eventService: EventService, 
    private route: ActivatedRoute, 
    private router: Router
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.eventService.find(this.id).subscribe((data: Event) => {
      this.event = data;
    });
  }

 
}
