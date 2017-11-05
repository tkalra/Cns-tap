import { Directive, ElementRef, HostListener, Renderer, Input } from '@angular/core';
import { Rgb, ColorProvider } from '../../providers/color/color';

const START_COLOR = new Rgb(255, 152, 0);
const TAP_COLOR = new Rgb(191, 54, 12);

@Directive({
  selector: '[tapColor]'
})
export class TapColorDirective {
  @Input('tapColor') countdown: number;

  currentColor: Rgb;
  currentCountdown;

  constructor(private el: ElementRef, private renderer: Renderer, private colorProvider: ColorProvider) {
    this.currentColor = START_COLOR;
    this.updateColor(this.currentColor);
  }

  ngOnInit() {
    this.currentCountdown = this.countdown;
    this.startSessionDarkenColor();
  }

  private startSessionDarkenColor() {
    setTimeout(() => {
      this.currentColor = this.colorProvider.getColor(this.currentColor, -1);
      this.updateColor(this.currentColor);
      this.currentCountdown -= 0.05;
      if (this.currentCountdown > 0) {
        this.startSessionDarkenColor();
      }
    }, 50);
  }

  @HostListener('tap')
  onTouchTap() {
    this.currentColor = this.colorProvider.getColor(this.currentColor, 3);
    this.updateColor(TAP_COLOR);
  }

  private updateColor(rgb: Rgb) {
    this.renderer.setElementStyle(this.el.nativeElement, 'backgroundColor', this.getColorFormat(rgb));
  }

  private getColorFormat(rgb: Rgb) {
    return 'rgb(' + rgb.r + ',' + rgb.g + ',' + rgb.b + ')';
  }
}
