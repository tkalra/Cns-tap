import { Rgb, ColorProvider } from './color';

describe('ColorProvider', () => {
  var rgb;
  var colorProvider: ColorProvider;

  beforeEach(() => {
    rgb = new Rgb();
  });

  it('should return white when given intensity is 0', () => {
    Object.assign(rgb, { r: 255, g: 0, b: 0 });
    expect(rgb.r).toBe(255);
    expect(rgb.g).toBe(0);
    expect(rgb.b).toBe(0);
    let newRgb = colorProvider.getColor(rgb, 0);
    expect(newRgb.r).toBe(255);
    expect(newRgb.g).toBe(255);
    expect(newRgb.b).toBe(255);
  });
});
