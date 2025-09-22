import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Button } from '../../shared/components/button/button';

@Component({
  selector: 'app-home',
  imports: [Button],
  templateUrl: './home.html',
})
export class Home {
  constructor(private router: Router) {}

  goToSurah() {
    this.router.navigate(['/surah']);
  }
}
