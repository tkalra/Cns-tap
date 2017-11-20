import { Rgb, ColorProvider } from './color';

describe('ColorProvider', () => {
  let rgb;
  let colorProvider: ColorProvider;

  beforeEach(() => {
    rgb = new Rgb(255, 0, 0);
    colorProvider = new ColorProvider();
  });

  it('should return white when given intensity is 0', () => {
    expect(rgb.r).toBe(255);
    expect(rgb.g).toBe(0);
    expect(rgb.b).toBe(0);
    let newRgb = colorProvider.getColor(rgb, 10);
    expect(newRgb.r).toBe(255);
    expect(newRgb.g).toBe(51);
    expect(newRgb.b).toBe(51);
  });
});
