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
  ayahs?: Ayah[];
  edition?: Edition;
}

export interface Ayah {
  number: number;
  audio: string;
  audioSecondary: string[];
  text: string;
  numberInSurah: number;
  juz: number;
  manzil: number;
  page: number;
  ruku: number;
  hizbQuarter: number;
  sajda: boolean;
}

export interface Edition {
  identifier: string;
  language: string;
  name: string;
  englishName: string;
  format: string;
  type: string;
  direction: string | null;
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

  getAyah(ayahId: string, reciterEdition = 'ar.alafasy'): Observable<{ data: Surah }> {
    return this.http.get<{ data: Surah }>(`${this.baseUrl}/surah/${ayahId}/${reciterEdition}`);
  }
}
