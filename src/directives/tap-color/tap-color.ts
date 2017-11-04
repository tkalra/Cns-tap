import { Directive, ElementRef, HostListener, Renderer } from '@angular/core';
import { Rgb, ColorProvider } from '../../providers/color/color';

const START_COLOR = new Rgb(63, 81, 181);

@Directive({
  selector: '[tapColor]'
})
export class TapColorDirective {
  currentColor: Rgb;

  constructor(private el: ElementRef, private renderer: Renderer, private colorProvider: ColorProvider) {
    this.currentColor = START_COLOR;
  }

  @HostListener('tap')
  onTouchTap() {
    this.currentColor = this.colorProvider.getColor(this.currentColor, 1);
    this.updateColor(this.currentColor);
  }

  private updateColor(rgb: Rgb) {
    this.renderer.setElementStyle(this.el.nativeElement, 'backgroundColor', this.getColorFormat(rgb));
  }

  private getColorFormat(rgb: Rgb) {
    return 'rgb(' + rgb.r + ',' + rgb.g + ',' + rgb.b + ')';
  }
}
