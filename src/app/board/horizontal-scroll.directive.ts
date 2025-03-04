import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appHorizontalScroll]'
})
export class HorizontalScrollDirective {
  private isDragging = false;
  private startX = 0;
  private scrollLeft = 0;

  constructor(private el: ElementRef) {}

  @HostListener('mousedown', ['$event'])
  onMouseDown(event: MouseEvent): void {
    this.isDragging = true;
    this.startX = event.pageX - this.el.nativeElement.offsetLeft;
    this.scrollLeft = this.el.nativeElement.scrollLeft;
    this.el.nativeElement.style.cursor = 'grabbing';
  }

  @HostListener('mouseleave')
  onMouseLeave(): void {
    this.isDragging = false;
    this.el.nativeElement.style.cursor = 'grab';
  }

  @HostListener('mouseup')
  onMouseUp(): void {
    this.isDragging = false;
    this.el.nativeElement.style.cursor = 'grab';
  }

  @HostListener('mousemove', ['$event'])
  onMouseMove(event: MouseEvent): void {
    if (!this.isDragging) return;
    event.preventDefault();
    const x = event.pageX - this.el.nativeElement.offsetLeft;
    const walk = (x - this.startX) * 2;
    this.el.nativeElement.scrollLeft = this.scrollLeft - walk;
  }
}
