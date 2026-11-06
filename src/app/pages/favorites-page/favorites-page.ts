import { Component, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-favorites-page',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './favorites-page.html',
  styleUrl: './favorites-page.css'
})
export class FavoritesPage implements OnInit {
  favorites = signal<any[]>([]);

  ngOnInit() {
    const saved = localStorage.getItem('tvmaze_favorites');
    if (saved) {
      this.favorites.set(JSON.parse(saved));
    }
  }

  removeFavorite(id: number) {
    const updated = this.favorites().filter(show => show.id !== id);
    this.favorites.set(updated);
    localStorage.setItem('tvmaze_favorites', JSON.stringify(updated));
  }
}