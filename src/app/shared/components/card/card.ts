import { Component, computed, input } from '@angular/core';
import { cn } from '../../utils/tw';

@Component({
  selector: 'ui-card',
  imports: [],
  templateUrl: './card.html',
})
export class Card {
  class = input<string>('');

  cardClasses = computed((): string => {
    const baseClasses = 'rounded-xl shadow-md border border-gray-200 p-4 bg-white';

    return cn(baseClasses, this.class());
  });
}
