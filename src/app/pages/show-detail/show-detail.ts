import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { TvmazeService } from '../../services/tvmaze';

@Component({
  selector: 'app-show-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './show-detail.html',
  styleUrl: './show-detail.css'
})
export class ShowDetail implements OnInit {
  private route = inject(ActivatedRoute);
  private tvmazeService = inject(TvmazeService);

  show = signal<any>(null);
  loading = signal(true);

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.tvmazeService.getShowDetails(id).subscribe({
        next: (data) => {
          this.show.set(data);
          this.loading.set(false);
        },
        error: (err) => {
          console.error('Erreur lors du chargement des détails', err);
          this.loading.set(false);
        }
      });
    }
  }

  toggleFavorite() {
    const currentShow = this.show();
    if (!currentShow) return;

    const saved = localStorage.getItem('tvmaze_favorites');
    let favorites: any[] = saved ? JSON.parse(saved) :[]

    const index = favorites.findIndex((s: any) => s.id === currentShow.id);
    if (index > -1) {
      favorites.splice(index, 1); // Retirer si déjà présent
    } else {
      favorites.push(currentShow); // Ajouter
    }

    localStorage.setItem('tvmaze_favorites', JSON.stringify(favorites));
    alert('Favoris mis à jour !');
  }
}