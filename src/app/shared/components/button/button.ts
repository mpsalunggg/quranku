import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'ui-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './button.html',
})
export class Button {
  @Input() type: 'button' | 'submit' | 'reset' = 'button';
  @Input() variant: 'primary' | 'secondary' | 'success' | 'danger' = 'primary';
  @Input() size: 'sm' | 'md' | 'lg' = 'md';
  @Input() outline = false;
  @Input() disabled = false;

  get classes(): string {
    const base =
      'inline-flex items-center justify-center font-medium rounded-lg focus:outline-none transition disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer';

    const sizes: Record<string, string> = {
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-4 py-2 text-base',
      lg: 'px-6 py-3 text-lg',
    };

    const variants: Record<string, string> = {
      primary: this.outline
        ? 'border border-blue-600 text-blue-600 hover:bg-blue-50'
        : 'bg-blue-600 text-white hover:bg-blue-700',
      secondary: this.outline
        ? 'border border-gray-400 text-gray-700 hover:bg-gray-100'
        : 'bg-gray-200 text-gray-800 hover:bg-gray-300',
      success: this.outline
        ? 'border border-green-600 text-green-600 hover:bg-green-50'
        : 'bg-green-600 text-white hover:bg-green-700',
      danger: this.outline
        ? 'border border-red-600 text-red-600 hover:bg-red-50'
        : 'bg-red-600 text-white hover:bg-red-700',
    };

    return `${base} ${sizes[this.size]} ${variants[this.variant]}`;
  }
}
