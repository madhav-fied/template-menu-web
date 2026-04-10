// ─── Color math ───────────────────────────────────────────────────────────────

function hexToRgb(hex: string): [number, number, number] {
  const h = hex.replace("#", "");
  return [
    parseInt(h.slice(0, 2), 16),
    parseInt(h.slice(2, 4), 16),
    parseInt(h.slice(4, 6), 16),
  ];
}

function rgbToHsl(r: number, g: number, b: number): [number, number, number] {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const l = (max + min) / 2;
  if (max === min) return [0, 0, l];
  const d = max - min;
  const s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
  let h: number;
  switch (max) {
    case r:  h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
    case g:  h = ((b - r) / d + 2) / 6; break;
    default: h = ((r - g) / d + 4) / 6;
  }
  return [h * 360, s, l];
}

function hslToRgb(h: number, s: number, l: number): [number, number, number] {
  h /= 360;
  if (s === 0) { const v = Math.round(l * 255); return [v, v, v]; }
  const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
  const p = 2 * l - q;
  const f = (t: number) => {
    if (t < 0) t += 1; if (t > 1) t -= 1;
    if (t < 1 / 6) return p + (q - p) * 6 * t;
    if (t < 1 / 2) return q;
    if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
    return p;
  };
  return [Math.round(f(h + 1/3) * 255), Math.round(f(h) * 255), Math.round(f(h - 1/3) * 255)];
}

function toHex(r: number, g: number, b: number): string {
  return "#" + [r, g, b]
    .map(v => Math.max(0, Math.min(255, v)).toString(16).padStart(2, "0"))
    .join("");
}

/** Adjust hue (+degrees), saturation (+fraction), lightness (+fraction) of a hex color. */
function tweak(hex: string, dH = 0, dS = 0, dL = 0): string {
  const [r, g, b] = hexToRgb(hex);
  const [h, s, l] = rgbToHsl(r, g, b);
  return toHex(...hslToRgb(
    (h + dH + 360) % 360,
    Math.max(0, Math.min(1, s + dS)),
    Math.max(0, Math.min(1, l + dL)),
  ));
}

function getLightness(hex: string): number {
  return rgbToHsl(...hexToRgb(hex))[2];
}

// ─── Theme generation ──────────────────────────────────────────────────────────

export interface ThemeVars {
  "--color-cream": string;
  "--color-cream-dark": string;
  "--color-espresso": string;
  "--color-espresso-mid": string;
  "--color-gold": string;
  "--color-gold-light": string;
  "--color-warm-gray": string;
  "--color-divider": string;
}

/**
 * Derives all 8 theme CSS variables from 2 base colors + an optional accent.
 *
 * - color1 / color2: one light, one dark — order doesn't matter, auto-detected.
 * - color3 (optional): explicit accent color. Without it, one is derived from
 *   the dark color shifted toward warm amber (universally suits a cafe aesthetic).
 */
export function generateTheme(
  color1: string,
  color2: string,
  color3?: string,
): ThemeVars {
  // Auto-detect which is the background (lighter) and foreground (darker)
  const [bgColor, fgColor] =
    getLightness(color1) >= getLightness(color2)
      ? [color1, color2]
      : [color2, color1];

  // Background-derived colors
  const cream     = bgColor;
  const creamDark = tweak(bgColor,  0,  0.06, -0.05);
  const divider   = tweak(bgColor,  0, -0.12, -0.17);
  const warmGray  = tweak(bgColor,  0, -0.30, -0.38);

  // Foreground-derived colors
  const espresso    = fgColor;
  const espressoMid = tweak(fgColor, 0, 0, 0.10);

  // Accent colors
  let gold: string;
  let goldLight: string;

  if (color3) {
    gold      = color3;
    goldLight = tweak(color3, 0, -0.05, 0.14);
  } else {
    // Derive a warm amber accent from the foreground hue.
    // If fg is already warm (H < 100°), nudge it; otherwise force to warm amber range.
    const [fgH, fgS] = rgbToHsl(...hexToRgb(fgColor));
    const accentH = fgH < 100 ? (fgH + 15 + 360) % 360 : 40;
    const accentS = Math.min(0.80, Math.max(0.60, fgS + 0.20));
    gold      = toHex(...hslToRgb(accentH, accentS, 0.42));
    goldLight = tweak(gold, 0, -0.05, 0.14);
  }

  return {
    "--color-cream":       cream,
    "--color-cream-dark":  creamDark,
    "--color-espresso":    espresso,
    "--color-espresso-mid": espressoMid,
    "--color-gold":        gold,
    "--color-gold-light":  goldLight,
    "--color-warm-gray":   warmGray,
    "--color-divider":     divider,
  };
}
