import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { EventService } from '@app/event/event.service';


@Component({
  selector: 'app-dashboard',
  imports: [RouterModule, CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {

  isAdmin: boolean = false;
  isLoggedIn: boolean = false;

  constructor(private router: Router,private eventService: EventService) {}

  ngOnInit(): void {
    this.checkUserRole();
    // Vérifie si un token est présent dans le localStorage 
    this.isLoggedIn = !!localStorage.getItem('token');
  
  }

  checkUserRole(): void {
    this.eventService.getUserRole().subscribe(
        response => {
            this.isAdmin = response.role === 'admin';
        },
        error => {
            console.error('Error getting user role:', error);
            //  Gérer l'erreur (par exemple, afficher un message)
        }
    );
}

  navigateToEvents() {
      this.router.navigate(['/events']);
  }

  navigateToCreateEvent() {
        this.router.navigate(['/events/create']);
}

  logout(): void {
    localStorage.removeItem('token');
    
    sessionStorage.removeItem('token');
 
    this.isLoggedIn = false;
    // Rediriger vers la page de login
    this.router.navigate(['/login']);
  }

}
