import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzButtonModule, NzButtonType } from 'ng-zorro-antd/button';
import { NzSizeLDSType } from 'ng-zorro-antd/core/types';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'icon' | 'text' | 'danger';

@Component({
  standalone: true,
  selector: 'app-button',
  imports: [CommonModule, NzButtonModule],
  template: `
    <button
      nz-button
      [type]="type"
      [nzType]="getNzType()"
      [nzSize]="size"
      [nzBlock]="block"
      [nzDanger]="danger"
      [nzGhost]="ghost"
      [nzLoading]="loading"
      [disabled]="disabled"
      [ngClass]="getButtonClasses()"
      (click)="onClick($event)"
    >
      <ng-content></ng-content>
    </button>
  `,
  styleUrl: './Button.scss',
})
export class ButtonComponent {
  @Input() variant: ButtonVariant = 'primary';
  @Input() size: NzSizeLDSType = 'default';
  @Input() block?: boolean;
  @Input() danger?: boolean;
  @Input() ghost?: boolean;
  @Input() loading?: boolean;
  @Input() disabled?: boolean;
  @Input() className?: string;
  @Input() type: 'button' | 'submit' | 'reset' = 'button';

  @Output() click = new EventEmitter<MouseEvent>();

  onClick(event: MouseEvent) {
    if (!this.disabled && !this.loading) {
      this.click.emit(event);
    }
  }

  getNzType(): NzButtonType {
    return 'default';
  }

  getButtonClasses(): string {
    const variantClasses = this.getVariantClasses();
    const sizeClasses = this.getSizeClasses();
    const baseClasses = '!border-solid focus-visible:!outline-none';

    const allClasses = [baseClasses, variantClasses, sizeClasses, this.className]
      .filter(Boolean)
      .join(' ');

    return allClasses;
  }

  private getVariantClasses(): string {
    const variantMap: Record<ButtonVariant, string> = {
      primary:
        '!bg-primary !text-white focus:!bg-primary focus:!text-white !border-transparent focus:!border-transparent hover:!bg-primary/80 hover:!text-white !border-primary disabled:!bg-primary/50 disabled:!text-white disabled:!border-transparent',
      secondary:
        '!bg-[#F4F5F6] !text-secondary focus:!bg-[#F4F5F6] focus:!text-secondary !border-[#F4F5F6] focus:!border-secondary hover:!bg-[#F4F5F6] hover:!text-secondary hover:!border-[#F4F5F6]',
      ghost:
        '!bg-transparent !text-primary focus:!bg-transparent focus:!text-primary !border-solid !border-primary focus:!border-primary hover:!bg-transparent hover:!text-primary hover:!border-primary',
      icon: '!bg-transparent hover:!bg-transparent hover:!text-transparent focus:!bg-transparent focus:!text-transparent active:!bg-transparent active:!text-transparent !border-solid !border-transparent hover:!border-transparent active:!border-transparent focus:!border-transparent focus-visible:!outline-none disabled:!bg-transparent',
      text: '!bg-transparent !text-gray-600 focus:!bg-transparent focus:!text-gray-800 !border-transparent focus:!border-transparent !shadow-none',
      danger:
        '!text-red hover:!border-red hover:!text-red focus:!text-red !border-red focus:!border-red',
    };

    return variantMap[this.variant] || variantMap.primary;
  }

  private getSizeClasses(): string {
    // Using arbitrary values for custom padding (21px, 19px) and standard p-12 (3rem from spacing config)
    const sizeMap: Record<NzSizeLDSType, string> = {
      large: '!p-[21px] !w-full',
      default: '!p-[19px] !w-full',
      small: '!p-12 !w-full',
    };

    return sizeMap[this.size] || sizeMap.default;
  }
}
