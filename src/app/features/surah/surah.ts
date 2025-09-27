import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuranService, Surah as SurahModel } from '../../services/quran.service';
import { Card } from '../../shared/components/card/card';
import { Input } from '../../shared/components/input/input';
import { createDebouncedSignal } from '../../shared/utils/debounce';

@Component({
  selector: 'app-surah',
  standalone: true,
  imports: [CommonModule, Card, Input],
  templateUrl: './surah.html',
})
export class Surah {
  surahs = signal<SurahModel[]>([]);
  loading = signal<boolean>(false);
  error = signal<string | null>(null);
  searchTerm = signal<string>('');
  debouncedSearchTerm = createDebouncedSignal(this.searchTerm, 300);

  filteredSurahs = computed(() => {
    const term = this.debouncedSearchTerm().toLowerCase();
    if (!term) return this.surahs();

    return this.surahs().filter(
      (surah) =>
        surah.name.toLowerCase().includes(term) ||
        surah.englishName.toLowerCase().includes(term) ||
        surah.englishNameTranslation.toLowerCase().includes(term)
    );
  });

  constructor(private quranService: QuranService) {
    this.loadSurahs();
  }

  loadSurahs() {
    this.loading.set(true);
    this.error.set(null);

    this.quranService.getSurahs().subscribe({
      next: (response) => {
        this.surahs.set(response.data);
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set('Failed to load surahs');
        this.loading.set(false);
      },
    });
  }

  onSearchChange(searchValue: string) {
    console.log('search :', searchValue);
    this.searchTerm.set(searchValue);
  }
}
