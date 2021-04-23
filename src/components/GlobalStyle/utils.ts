import Color from 'color';
import { Theme,Font } from '../../store/configs';
import { unionBy } from 'lodash';

export function createFontApi(fonts: Font[]) {
  // filter duplicate fonts
  const uniqs = unionBy(fonts, 'name');

  // transform >>> 'family=Font+Name:wght@400;700'
  const familyStrings = uniqs.map(f => {
    const weights = f.weights.sort((a, b) => a - b).join(';');
    const familyName = f.name.replace(/\s/g, '+');
    return `family=${familyName}:wght@${weights}`;
  });

  // join family strings by '&'
  return familyStrings.join('&');
}

export function createColorVariables(theme: Theme) {
  const colors: { name: string; rgb: Color }[] = [];
  for (const name in theme.colors) {
    colors.push({
      name: name,
      rgb: Color(theme.colors[name as keyof Theme['colors']]).rgb(),
    });
  }

  const strings = colors.map(c => [
    `--${c.name}: ${c.rgb.string()};`,
    `--${c.name}-10: ${c.rgb.alpha(0.1).string()};`,
    `--${c.name}-20: ${c.rgb.alpha(0.2).string()};`,
    `--${c.name}-30: ${c.rgb.alpha(0.3).string()};`,
    `--${c.name}-40: ${c.rgb.alpha(0.4).string()};`,
    `--${c.name}-50: ${c.rgb.alpha(0.5).string()};`,
    `--${c.name}-60: ${c.rgb.alpha(0.6).string()};`,
    `--${c.name}-70: ${c.rgb.alpha(0.7).string()};`,
    `--${c.name}-80: ${c.rgb.alpha(0.8).string()};`,
    `--${c.name}-90: ${c.rgb.alpha(0.9).string()};`,
    `--${c.name}-rgb: ${c.rgb.array().join(',')};`,
  ]);

  // join
  return strings.map(s => s.join('\n')).join('\n');
}
