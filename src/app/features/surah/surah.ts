import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuranService, Surah as SurahModel } from '../../services/quran.service';

@Component({
  selector: 'app-surah',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './surah.html',
})
export class Surah {
  surahs = signal<SurahModel[]>([]);
  loading = signal<boolean>(false);
  error = signal<string | null>(null);

  constructor(private quranService: QuranService) {
    this.loadSurahs();
  }

  loadSurahs() {
    this.loading.set(true);
    this.error.set(null);

    this.quranService.getSurahs().subscribe({
      next: (response) => {
        console.log("res" , response)
        this.surahs.set(response.data);
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set('Failed to load surahs');
        this.loading.set(false);
      },
    });
  }
}
