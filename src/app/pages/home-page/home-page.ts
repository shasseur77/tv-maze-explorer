import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TvmazeService } from '../../services/tvmaze';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './home-page.html',
  styleUrl: './home-page.css'
})
export class HomePage implements OnInit {
  private tvmazeService = inject(TvmazeService);

  searchQuery = signal('');
  shows = signal<any[]>([]);
  loading = signal(false);

  ngOnInit() {
    // Restaurer la dernière recherche stockée
    const savedQuery = localStorage.getItem('tvmaze_last_query');
    const savedShows = localStorage.getItem('tvmaze_last_shows');
    if (savedQuery) {
      this.searchQuery.set(savedQuery);
    }
    if (savedShows) {
      this.shows.set(JSON.parse(savedShows));
    }
  }

  onSearch() {
    const query = this.searchQuery().trim();
    if (!query) return;

    this.loading.set(true);
    this.tvmazeService.searchShows(query).subscribe({
      next: (results) => {
        const showList = results.map((item: any) => item.show);
        this.shows.set(showList);
        this.loading.set(false);

        // Sauvegarde l'état dans le localStorage pour ne pas perdre la requête lors de l'appui sur "Retour à la recherche"
        localStorage.setItem('tvmaze_last_query', query);
        localStorage.setItem('tvmaze_last_shows', JSON.stringify(showList));
      },
      error: (err) => {
        console.error('Erreur lors de la recherche', err);
        this.loading.set(false);
      }
    });
  }
}