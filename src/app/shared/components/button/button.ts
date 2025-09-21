import { Component, input, computed, ChangeDetectionStrategy } from '@angular/core';
import { cn } from '../../utils/tw';

export interface ButtonProps {
  type?: 'button' | 'submit' | 'reset';
  variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'ghost';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  outline?: boolean;
  loading?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  rounded?: 'none' | 'sm' | 'md' | 'lg' | 'full';
}

@Component({
  selector: 'ui-button',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './button.html',
})
export class Button {
  type = input<ButtonProps['type']>('button');
  variant = input<ButtonProps['variant']>('primary');
  size = input<ButtonProps['size']>('md');
  outline = input<boolean>(false);
  disabled = input<boolean>(false);
  rounded = input<ButtonProps['rounded']>('md');
  class = input<string>('');

  buttonClasses = computed((): string => {
    const baseClasses =
      'inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed select-none active:scale-95 cursor-pointer';

    const sizeClasses: Record<string, string> = {
      xs: 'px-2 py-1 text-xs gap-1 min-h-[24px]',
      sm: 'px-3 py-1.5 text-sm gap-1.5 min-h-[32px]',
      md: 'px-4 py-2 text-base gap-2 min-h-[40px]',
      lg: 'px-6 py-3 text-lg gap-2.5 min-h-[48px]',
      xl: 'px-8 py-4 text-xl gap-3 min-h-[56px]',
    };

    const roundedClasses: Record<string, string> = {
      none: 'rounded-none',
      sm: 'rounded-sm',
      md: 'rounded-md',
      lg: 'rounded-lg',
      full: 'rounded-full',
    };

    const variantClasses: Record<string, string> = {
      primary: this.outline()
        ? 'border-2 border-blue-500 text-blue-600 bg-transparent hover:bg-blue-50 focus:ring-blue-500 dark:border-blue-400 dark:text-blue-400 dark:hover:bg-blue-950'
        : 'bg-blue-500 text-white hover:bg-blue-600 focus:ring-blue-500 border-2 border-transparent shadow-sm hover:shadow-md',
    };

    return cn(
      baseClasses,
      sizeClasses[this.size() || 'md'],
      roundedClasses[this.rounded() || 'md'],
      variantClasses[this.variant() || 'primary'],
      this.class()
    );
  });
}
