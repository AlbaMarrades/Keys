import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appHighlights]'
})

export class HighlightsDirective {

  @HostListener('mouseenter') onMouseEnter(): void {
    this.element.nativeElement.style.backgroundColor = '#607d8b'
  }

  @HostListener('mouseleave') onMouseLeave(): void {
    this.element.nativeElement.style.backgroundColor = ''
  }

  constructor(private element: ElementRef) { }

}
