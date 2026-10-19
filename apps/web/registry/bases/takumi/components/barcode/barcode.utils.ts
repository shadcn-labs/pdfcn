import type { BarcodeFormat } from "./barcode.types";

/** A single filled bar, positioned in module units from the left edge. */
export interface BarcodeBar {
  x: number;
  width: number;
}

export interface EncodedBarcode {
  bars: BarcodeBar[];
  /** Symbol width in narrow modules, excluding quiet zones. */
  modules: number;
}

/** Quiet zone on each side, in narrow modules (spec minimum is 10x). */
export const QUIET_ZONE_MODULES = 10;

const CODE128_PATTERNS = [
  "212222",
  "222122",
  "222221",
  "121223",
  "121322",
  "131222",
  "122213",
  "122312",
  "132212",
  "221213",
  "221312",
  "231212",
  "112232",
  "122132",
  "122231",
  "113222",
  "123122",
  "123221",
  "223211",
  "221132",
  "221231",
  "213212",
  "223112",
  "312131",
  "311222",
  "321122",
  "321221",
  "312212",
  "322112",
  "322211",
  "212123",
  "212321",
  "232121",
  "111323",
  "131123",
  "131321",
  "112313",
  "132113",
  "132311",
  "211313",
  "231113",
  "231311",
  "112133",
  "112331",
  "132131",
  "113123",
  "113321",
  "133121",
  "313121",
  "211331",
  "231131",
  "213113",
  "213311",
  "213131",
  "311123",
  "311321",
  "331121",
  "312113",
  "312311",
  "332111",
  "314111",
  "221411",
  "431111",
  "111224",
  "111422",
  "121124",
  "121421",
  "141122",
  "141221",
  "112214",
  "112412",
  "122114",
  "122411",
  "142112",
  "142211",
  "241211",
  "221114",
  "413111",
  "241112",
  "134111",
  "111242",
  "121142",
  "121241",
  "114212",
  "124112",
  "124211",
  "411212",
  "421112",
  "421211",
  "212141",
  "214121",
  "412121",
  "111143",
  "111341",
  "131141",
  "114113",
  "114311",
  "411113",
  "411311",
  "113141",
  "114131",
  "311141",
  "411131",
  "211412",
  "211214",
  "211232",
];
const CODE128_STOP = "2331112";
const CODE128_START_B = 104;

const CODE39_PATTERNS: Record<string, string> = {
  " ": "nwwnnnwnn",
  $: "nwnwnwnnn",
  "%": "nnwnwnwnn",
  "*": "nwnnwnwnn",
  "+": "nwnnnwnwn",
  "-": "nwnnnnwnw",
  ".": "wwnnnnwnn",
  "/": "nwnwnnnwn",
  "0": "nnnwwnwnn",
  "1": "wnnwnnnnw",
  "2": "nnwwnnnnw",
  "3": "wnwwnnnnn",
  "4": "nnnwwnnnw",
  "5": "wnnwwnnnn",
  "6": "nnwwwnnnn",
  "7": "nnnwnnwnw",
  "8": "wnnwnnwnn",
  "9": "nnwwnnwnn",
  A: "wnnnnwnnw",
  B: "nnwnnwnnw",
  C: "wnwnnwnnn",
  D: "nnnnwwnnw",
  E: "wnnnwwnnn",
  F: "nnwnwwnnn",
  G: "nnnnnwwnw",
  H: "wnnnnwwnn",
  I: "nnwnnwwnn",
  J: "nnnnwwwnn",
  K: "wnnnnnnww",
  L: "nnwnnnnww",
  M: "wnwnnnnwn",
  N: "nnnnwnnww",
  O: "wnnnwnnwn",
  P: "nnwnwnnwn",
  Q: "nnnnnnwww",
  R: "wnnnnnwwn",
  S: "nnwnnnwwn",
  T: "nnnnwnwwn",
  U: "wwnnnnnnw",
  V: "nwwnnnnnw",
  W: "wwwnnnnnn",
  X: "nwnnwnnnw",
  Y: "wwnnwnnnn",
  Z: "nwwnwnnnn",
};
const CODE39_WIDE = 3;

const EAN_LEFT_PARITY = [
  "LLLLLL",
  "LLGLGG",
  "LLGGLG",
  "LLGGGL",
  "LGLLGG",
  "LGGLLG",
  "LGGGLL",
  "LGLGLG",
  "LGLGGL",
  "LGGLGL",
];
const EAN_L = [
  "0001101",
  "0011001",
  "0010011",
  "0111101",
  "0100011",
  "0110001",
  "0101111",
  "0111011",
  "0110111",
  "0001011",
];

const toRuns = (widths: number[]): EncodedBarcode => {
  const bars: BarcodeBar[] = [];
  let x = 0;
  for (const [index, width] of widths.entries()) {
    if (index % 2 === 0) {
      bars.push({ width, x });
    }
    x += width;
  }
  return { bars, modules: x };
};

const widthsFromPatterns = (patterns: string[]): number[] =>
  patterns.flatMap((pattern) => [...pattern].map(Number));

const bitsToRuns = (bits: string): EncodedBarcode => {
  const runs: number[] = [];
  for (const bit of bits) {
    const isBar = (runs.length - 1) % 2 === 0;
    if (runs.length === 0 || (bit === "1") !== isBar) {
      runs.push(1);
    } else {
      runs[runs.length - 1] += 1;
    }
  }
  if (bits.endsWith("0")) {
    runs.pop();
  }
  return toRuns(runs);
};

const encodeCode128 = (data: string): EncodedBarcode | null => {
  if (data.length === 0) {
    return null;
  }
  const codes: number[] = [CODE128_START_B];
  for (const char of data) {
    const code = (char.codePointAt(0) ?? 0) - 32;
    if (code < 0 || code > 95) {
      return null;
    }
    codes.push(code);
  }
  let checksum = CODE128_START_B;
  for (const [index, code] of codes.slice(1).entries()) {
    checksum += (index + 1) * code;
  }
  codes.push(checksum % 103);
  const patterns = codes.map((code) => CODE128_PATTERNS[code]);
  patterns.push(CODE128_STOP);
  return toRuns(widthsFromPatterns(patterns));
};

const encodeCode39 = (data: string): EncodedBarcode | null => {
  const text = data.toUpperCase();
  if (text.length === 0) {
    return null;
  }
  const patterns: number[][] = [];
  for (const char of `*${text}*`) {
    const pattern = CODE39_PATTERNS[char];
    if (pattern === undefined) {
      return null;
    }
    patterns.push([...pattern].map((mark) => (mark === "w" ? CODE39_WIDE : 1)));
  }
  // 1-module gap between characters, none after the final one
  const widths = patterns.flatMap((pattern, index) =>
    index === patterns.length - 1 ? pattern : [...pattern, 1]
  );
  return toRuns(widths);
};

const eanChecksum = (digits: string): number => {
  let sum = 0;
  for (const [index, char] of [...digits].entries()) {
    sum += Number(char) * (index % 2 === 0 ? 1 : 3);
  }
  return (10 - (sum % 10)) % 10;
};

const encodeEan13 = (data: string): EncodedBarcode | null => {
  if (!/^\d{12,13}$/.test(data)) {
    return null;
  }
  const digits = data.length === 12 ? data + eanChecksum(data) : data;
  if (eanChecksum(digits.slice(0, 12)) !== Number(digits[12])) {
    return null;
  }
  const parity = EAN_LEFT_PARITY[Number(digits[0])];
  if (parity === undefined) {
    return null;
  }
  let bits = "101";
  for (const [index, char] of [...digits].slice(1, 7).entries()) {
    const l = EAN_L[Number(char)];
    if (l === undefined) {
      return null;
    }
    // G parity is the complement of L reversed
    bits +=
      parity[index] === "L"
        ? l
        : [...l]
            .toReversed()
            .map((bit) => (bit === "0" ? "1" : "0"))
            .join("");
  }
  bits += "01010";
  for (const char of digits.slice(7)) {
    const l = EAN_L[Number(char)];
    if (l === undefined) {
      return null;
    }
    bits += [...l].map((bit) => (bit === "0" ? "1" : "0")).join("");
  }
  bits += "101";
  return bitsToRuns(bits);
};

/**
 * Encodes data into bars for the requested symbology.
 * @returns null when the data is not valid for the format.
 */
export const encodeBarcode = (
  data: string,
  format: BarcodeFormat
): EncodedBarcode | null => {
  switch (format) {
    case "Code39": {
      return encodeCode39(data);
    }
    case "EAN13": {
      return encodeEan13(data);
    }
    default: {
      return encodeCode128(data);
    }
  }
};
