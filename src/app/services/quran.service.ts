import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Surah {
  number: number;
  name: string;
  englishName: string;
  englishNameTranslation: string;
  numberOfAyahs: number;
  revelationType: string;
}

@Injectable({
  providedIn: 'root',
})
export class QuranService {
  private readonly baseUrl = 'https://api.alquran.cloud/v1';

  constructor(private http: HttpClient) {}

  getSurahs(): Observable<{ data: Surah[] }> {
    return this.http.get<{ data: Surah[] }>(`${this.baseUrl}/surah`);
  }

  getAyah(ayahId: string, reciterEdition = 'ar.alafasy'): Observable<{ data: any }> {
    return this.http.get<{ data: any }>(`${this.baseUrl}/surah/${ayahId}/${reciterEdition}`);
  }
}
