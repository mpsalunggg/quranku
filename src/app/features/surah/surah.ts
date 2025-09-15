import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuranService, Surah as SurahModel } from '../../services/quran.service';

@Component({
  selector: 'app-surah',
  imports: [CommonModule],
  templateUrl: './surah.html',
})
export class Surah {
  surahs: SurahModel[] = [];
  loading = false;
  error: string | null = null;

  constructor(private quranService: QuranService) {}

  ngOnInit() {
    this.loadSurahs();
  }

  loadSurahs() {
    this.loading = true;
    this.error = null;

    this.quranService.getSurahs().subscribe({
      next: (response) => {
        this.surahs = response.data;
        this.loading = false;
      },
      error: () => {
        this.error = 'Failed to load surahs';
        this.loading = false;
      },
    });
  }
}
