const defaultLength = 8;
const tryCount = 1000;
const charSetAll = '!"#$%&\'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~';
const charSetStd = '!#%+23456789:=?@ABCDEFGHJKLMNPRSTUVWXYZabcdefghijkmnopqrstuvwxyz';
const charSetExt = '!"#$%&\'()*+,-./23456789:;<=>?@ABCDEFGHJKLMNOPRSTUVWXYZ[\\]^_abcdefghijkmnopqrstuvwxyz{|}~';
const charDefaultExcludes = 'Il10O8B3Egqvu!|[]{}';

export default class Honkipass {
  constructor() {
    this.reset = () => {
      this.password = '';
      this.charSet = 'std'; // 'std', 'ext', 'all'
      this.excludes = charDefaultExcludes;
      this.length = defaultLength;
      this.useUpperCase = true;
      this.useLowerCase = true;
      this.useNumbers = true;
      this.useSymbols = true;
      this.useAllTypes = true;
      this.uniqueChars = true;
      this.excludesEnabled = true;
      this.update();
    };

    const getChars = (charSet) => {
      let chars;
      switch (charSet) {
        case 'ext':
          chars = charSetExt;
          break;
        case 'all':
          chars = charSetAll;
          if (!this.useUpperCase) {
            chars = chars.replace(/[A-Z]/g, '');
          }
          if (!this.useLowerCase) {
            chars = chars.replace(/[a-z]/g, '');
          }
          if (!this.useNumbers) {
            chars = chars.replace(/[0-9]/g, '');
          }
          if (!this.useSymbols) {
            chars = chars.replace(/[^A-Za-z0-9]/g, '');
          }
          if (this.excludesEnabled) {
            // eslint-disable-next-line no-plusplus
            for (let i = 0; i < this.excludes.length; ++i) {
              chars = chars.replaceAll(this.excludes.substring(i, i + 1), '');
            }
          }
          break;
        default:
          chars = charSetStd;
          break;
      }
      return chars;
    };

    const repeated = (val) => {
      // eslint-disable-next-line no-plusplus
      for (let i = 0; i < (val.length - 1); ++i) {
        if (val.indexOf(val.substring(i, i + 1), i + 1) >= 0) {
          return true;
        }
      }
      return false;
    };

    const validate = (generated) => ((generated.length === this.length)
      && (!this.useAllTypes
        || ((!this.useUpperCase || /[A-Z]/.test(generated))
          && (!this.useLowerCase || /[a-z]/.test(generated))
          && (!this.useNumbers || /[0-9]/.test(generated))
          && (!this.useSymbols || /[^A-Za-z0-9]/.test(generated))))
      && (this.uniqueChars || this.uniqueCharsError || !repeated(generated)));

    this.setValue = (id, val) => {
      this[id] = val;
      this.update();
    };

    this.update = () => {
      this.chars = getChars(this.charSet);
      this.generationError = false;
      this.uniqueCharsError = false;

      if (!this.useUpperCase
          && !this.useLowerCase
          && !this.useNumbers
          && !this.useSymbols) {
        this.useUpperCase = true;
        this.useLowerCase = true;
        this.useNumbers = true;
        this.useSymbols = true;
      }
      // eslint-disable-next-line no-plusplus
      for (let i = 0; i < tryCount * 2; ++i) {
        const randoms = new Uint32Array(this.length);
        crypto.getRandomValues(randoms);
        const generated = randoms
          .map((val) => val % this.chars.length)
          .reduce((ret, cur) => ret + this.chars.substring(cur, cur + 1), '');
        if (tryCount <= i) {
          this.uniqueCharsError = true;
        }
        if (validate(generated)) {
          this.password = generated;
          this.generationError = false;
          return;
        }
      }
      this.generationError = true;
      this.uniqueCharsError = false;
    };

    this.toggleFlag = (id) => {
      this[id] = !this[id];
      this.update();
    };

    this.usedChars = () => charSetAll.split('').map((c) => ({
      c,
      // eslint-disable-next-line no-nested-ternary
      stt: this.chars.indexOf(c) < 0
        ? 'ignored'
        : this.password.indexOf(c) < 0
          ? 'staged'
          : 'used',
    }));

    this.reset();
  }
}
