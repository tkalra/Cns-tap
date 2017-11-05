import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

/*
  Generated class for the ColorProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
export class Rgb {
  r: number;
  g: number;
  b: number;

  constructor(r: number, g: number, b: number) {
    this.r = r;
    this.g = g;
    this.b = b;
  }
}

@Injectable()
export class ColorProvider {
  constructor() {}

  // Need to handle 1.0 as 100%, since once it is a number, there is no difference between it and 1
  // <http://stackoverflow.com/questions/7422072/javascript-how-to-detect-number-as-a-decimal-including-1-0>
  isOnePointZero(n) {
    return typeof n == 'string' && n.indexOf('.') != -1 && parseFloat(n) === 1;
  }

  // Check to see if string passed in is a percentage
  isPercentage(n) {
    return typeof n === 'string' && n.indexOf('%') != -1;
  }

  // Take input from [0, n] and return it as [0, 1]
  bound01(n, max) {
    if (this.isOnePointZero(n)) {
      n = '100%';
    }

    var processPercent = this.isPercentage(n);
    n = Math.min(max, Math.max(0, parseFloat(n)));

    // Automatically convert percentage into number
    if (processPercent) {
      n = max;
    }

    // Handle floating point rounding errors
    if (Math.abs(n - max) < 0.000001) {
      return 1;
    }

    // Convert into [0, 1] range if it isn't already
    return (n % max) / parseFloat(max);
  }

  // `rgbToHsl`
  // Converts an RGB color value to HSL.
  // *Assumes:* r, g, and b are contained in [0, 255] or [0, 1]
  // *Returns:* { h, s, l } in [0, 1]
  rgbToHsl(r, g, b) {
    r = this.bound01(r, 255);
    g = this.bound01(g, 255);
    b = this.bound01(b, 255);

    var max = Math.max(r, g, b),
      min = Math.min(r, g, b);
    var h,
      s,
      l = (max + min) / 2;

    if (max == min) {
      h = s = 0; // achromatic
    } else {
      var d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r:
          h = (g - b) / d + (g < b ? 6 : 0);
          break;
        case g:
          h = (b - r) / d + 2;
          break;
        case b:
          h = (r - g) / d + 4;
          break;
      }

      h /= 6;
    }

    return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) };
  }

  // `hslToRgb`
  // Converts an HSL color value to RGB.
  // *Assumes:* h is contained in [0, 1] or [0, 360] and s and l are contained [0, 1] or [0, 100]
  // *Returns:* { r, g, b } in the set [0, 255]
  hslToRgb(h, s, l) {
    var r, g, b;

    h = this.bound01(h, 360);
    s = this.bound01(s, 100);
    l = this.bound01(l, 100);

    function hue2rgb(p, q, t) {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    }

    if (s === 0) {
      r = g = b = l; // achromatic
    } else {
      var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      var p = 2 * l - q;
      r = hue2rgb(p, q, h + 1 / 3);
      g = hue2rgb(p, q, h);
      b = hue2rgb(p, q, h - 1 / 3);
    }

    return { r: Math.round(r * 255), g: Math.round(g * 255), b: Math.round(b * 255) };
  }

  /**
   * Given a baseColor in Rgb and a number intensity, return a new Rgb color
   * that is lighter by intensity
   * @param baseColor the initial color in Rgb
   * @param intensity the amount to lighten color by
   * @return an Rgb object
   */
  getColor(baseColor: Rgb, intensity: number) {
    let hslColor = this.rgbToHsl(baseColor.r, baseColor.g, baseColor.b);
    let newL = hslColor.l + intensity;
    if (newL >= 0 && newL <= 100) {
      hslColor.l = newL;
    }
    let obj = this.hslToRgb(hslColor.h, hslColor.s, hslColor.l);
    return new Rgb(obj.r, obj.g, obj.b);
  }
}
