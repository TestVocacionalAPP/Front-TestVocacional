import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appMask]'
})
export class InputMaskDirective {
  @Input('appMask') mask: string = '';

  constructor(private el: ElementRef) {}

  @HostListener('input', ['$event'])
  onInputChange(event: Event) {
    const input = this.el.nativeElement as HTMLInputElement;
    let value = input.value.replace(/\D+/g, '');
    if (this.mask === 'card') {
      value = value.replace(/(\d{4})(?=\d)/g, '$1 ');
    } else if (this.mask === 'expiry') {
      value = value.replace(/(\d{2})(?=\d)/g, '$1/');
    }
    input.value = value.trim();
  }
}
