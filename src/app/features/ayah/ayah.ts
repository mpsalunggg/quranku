import { Component, effect, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuranService } from '../../services/quran.service';

@Component({
  selector: 'app-ayah',
  standalone: true,
  templateUrl: './ayah.html',
})
export class Ayah {
  ayahId = signal<string | null>(null);
  loading = signal<boolean>(false);
  error = signal<string | null>(null);
  ayahData = signal<any>(null);

  constructor(private quranService: QuranService, private route: ActivatedRoute) {
    effect(() => {
      this.route.paramMap.subscribe((params) => {
        const id = params.get('ayahId');
        this.ayahId.set(id);
        this.loadAyah(id as string);
        console.log('Ayah ID:', id);
      });
    });
  }

  loadAyah(id: string) {
    this.loading.set(true);
    this.error.set(null);

    this.quranService.getAyah(id).subscribe({
      next: (response) => {
        console.log('response ayah:', response);
        this.ayahData.set(response.data);
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set('Failed to load ayah');
        this.loading.set(false);
      },
    });
  }
}
