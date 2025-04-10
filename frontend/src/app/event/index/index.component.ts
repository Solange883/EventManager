import { Component, OnInit  } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { RouterModule } from '@angular/router';
import { EventService } from '../event.service';
import { Event } from '../event';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';


@Component({
  selector: 'app-index',
  imports: [NgFor,NgIf, RouterModule,FormsModule, MatDatepickerModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatInputModule],
  templateUrl: './index.component.html',
  styleUrl: './index.component.scss'
})
export class IndexComponent  implements OnInit{
  events: Event[] = [];
  isLoggedIn: boolean = false;
  isAdmin: boolean = false;

  filterDate: any= '';
  filterLieu: string = '';
  filterCategorie: string = '';
  
  constructor(private eventService: EventService, private router: Router,) {}

  ngOnInit(): void {
    this.eventService.getAll().subscribe((data: Event[]) => {
    this.events = data;
    });
    this.isLoggedIn = !!localStorage.getItem('token');
    this.checkUserRole();
    
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
    

  pdf(id: number){
    // Appeler la méthode pour générer et télécharger le PDF
    this.eventService.downloadRegistrationsPdf(id).subscribe(
      (pdfBlob) => {
        // Créer un URL temporaire pour le PDF et l'ouvrir dans un nouvel onglet
        const blobUrl = URL.createObjectURL(pdfBlob);
        const link = document.createElement('a');
        link.href = blobUrl;
        link.download = `inscriptions_${id}.pdf`; // Nom du fichier PDF
        link.click(); // Simule un clic pour démarrer le téléchargement
        URL.revokeObjectURL(blobUrl); // Libère l'URL après utilisation
      },
      (error) => {
        console.error('Erreur lors de la génération du PDF:', error);
      }
    );
}
  // Appliquer les filtres
  applyFilter(): void {
    let formattedDate = '';

    if (this.filterDate instanceof Date) {
      const year = this.filterDate.getFullYear();
      const month = (this.filterDate.getMonth() + 1).toString().padStart(2, '0');
      const day = this.filterDate.getDate().toString().padStart(2, '0');
      formattedDate = `${year}-${month}-${day}`; // format API : YYYY-MM-DD
    }

    this.eventService.getAll(formattedDate, this.filterLieu, this.filterCategorie).subscribe(
      (data: Event[]) => {
        this.events = data;
      },
      (error) => {
        console.error('Erreur lors du filtrage des événements', error);
      }
    );
    
  }

}

