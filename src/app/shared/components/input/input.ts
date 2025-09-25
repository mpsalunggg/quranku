import {
  Component,
  input,
  computed,
  output,
  ChangeDetectionStrategy,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { LucideAngularModule, Search, User, Mail, Lock, Eye, EyeOff } from 'lucide-angular';
import { cn } from '../../utils/tw';

export interface InputProps {
  type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'default' | 'outline' | 'filled';
  disabled?: boolean;
  readonly?: boolean;
  required?: boolean;
  invalid?: boolean;
  rounded?: 'none' | 'sm' | 'md' | 'lg' | 'full';
}

@Component({
  selector: 'ui-input',
  standalone: true,
  imports: [LucideAngularModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './input.html',
})
export class Input {
  @ViewChild('input', { static: true }) inputRef!: ElementRef<HTMLInputElement>;
  
  private iconMap: Record<string, any> = {
    search: Search,
    user: User,
    mail: Mail,
    lock: Lock,
    eye: Eye,
    'eye-off': EyeOff
  };

  type = input<InputProps['type']>('text');
  size = input<InputProps['size']>('md');
  variant = input<InputProps['variant']>('default');
  placeholder = input<string>('');
  value = input<string>('');
  invalid = input<boolean>(false);
  rounded = input<InputProps['rounded']>('md');
  icon = input<string>('');
  iconPosition = input<'left' | 'right'>('left');
  class = input<string>('');

  onChange = output<string>();

  containerClasses = computed((): string => {
    const baseClasses = 'relative flex items-center';

    return cn(baseClasses, this.class());
  });

  inputClasses = computed((): string => {
    const baseClasses =
      'w-full font-medium transition-all duration-200 focus:outline-none outline-none disabled:opacity-50 disabled:cursor-not-allowed placeholder:text-gray-400 bg-transparent border-0 outline-none';

    const sizeClasses: Record<string, string> = {
      xs: 'px-2 py-1 text-xs min-h-[24px]',
      sm: 'px-3 py-1.5 text-sm min-h-[32px]',
      md: 'px-4 py-2 text-base min-h-[40px]',
      lg: 'px-6 py-3 text-lg min-h-[48px]',
      xl: 'px-8 py-4 text-xl min-h-[56px]',
    };

    const iconAdjustment = this.icon() ? (this.iconPosition() === 'left' ? 'pl-10' : 'pr-10') : '';

    return cn(baseClasses, sizeClasses[this.size() || 'md'], iconAdjustment);
  });

  wrapperClasses = computed((): string => {
    const baseClasses = 'relative flex items-center w-full border transition-all duration-200';

    const sizeClasses: Record<string, string> = {
      xs: 'min-h-[24px]',
      sm: 'min-h-[32px]',
      md: 'min-h-[40px]',
      lg: 'min-h-[48px]',
      xl: 'min-h-[56px]',
    };

    const roundedClasses: Record<string, string> = {
      none: 'rounded-none',
      sm: 'rounded-sm',
      md: 'rounded-md',
      lg: 'rounded-lg',
      full: 'rounded-full',
    };

    const variantClasses: Record<string, string> = {
      default: this.invalid()
        ? 'border-red-300 bg-white focus-within:border-red-500 focus-within:ring-red-500'
        : 'border-gray-300 bg-white hover:border-gray-400 focus-within:border-blue-500 focus-within:ring-blue-500',
      outline: this.invalid()
        ? 'border-2 border-red-500 bg-transparent focus-within:ring-red-500'
        : 'border-2 border-gray-300 bg-transparent hover:border-gray-400 focus-within:border-blue-500 focus-within:ring-blue-500',
      filled: this.invalid()
        ? 'border border-red-300 bg-gray-50 focus-within:border-red-500 focus-within:ring-red-500 focus-within:bg-white'
        : 'border border-gray-300 bg-gray-50 hover:bg-gray-100 focus-within:border-blue-500 focus-within:ring-blue-500 focus-within:bg-white',
    };

    return cn(
      baseClasses,
      sizeClasses[this.size() || 'md'],
      roundedClasses[this.rounded() || 'md'],
      variantClasses[this.variant() || 'default']
    );
  });

  iconClasses = computed((): string => {
    const baseClasses = 'absolute text-gray-400 pointer-events-none top-1/2 transform -translate-y-1/2';

    const sizeClasses: Record<string, string> = {
      xs: 'w-3 h-3',
      sm: 'w-4 h-4',
      md: 'w-5 h-5',
      lg: 'w-6 h-6',
      xl: 'w-7 h-7',
    };

    const positionClasses = this.iconPosition() === 'left' ? 'left-3' : 'right-3';

    return cn(baseClasses, sizeClasses[this.size() || 'md'], positionClasses);
  });

  getIcon() {
    return this.iconMap[this.icon()];
  }

  onInputChange(event: Event) {
    const target = event.target as HTMLInputElement;
    this.onChange.emit(target.value);
  }
}
