export const minLength = 6;
export const maxTryCount = 1000;

export const defaultLength = 8;
export const defaultCharSet = "s";
export const defaultUseAllType = true;
export const defaultUniqueChars = true;
export const defaultUseUpperCase = true;
export const defaultUseLowerCase = true;
export const defaultUseNumerics = true;
export const defaultUseSymbol = true;
export const defaultDisallowExcluded = true;
export const defaultExcluded = "Il10O8B3Egqvu!|[]{}";

export const charSetAll =
  "!\"#$%&'()*+,-./0123456789:;<=>?@" +
  "ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`" +
  "abcdefghijklmnopqrstuvwxyz{|}~";
export const charSetStd =
  "!#%+23456789:=?@" + //
  "ABCDEFGHJKLMNPRSTUVWXYZ" + //
  "abcdefghijkmnopqrstuvwxyz";
export const charSetExt =
  "!\"#$%&'()*+,-./23456789:;<=>?@" +
  "ABCDEFGHJKLMNOPRSTUVWXYZ[\\]^_" +
  "abcdefghijkmnopqrstuvwxyz{|}~";

/**
 * Get default values
 * @returns {Object}
 */
export const getDefaultValues = () => ({
  length: defaultLength,
  charSet: defaultCharSet,
  useAllTypes: defaultUseAllType,
  uniqueChars: defaultUniqueChars,
  useUpperCase: defaultUseUpperCase,
  useLowerCase: defaultUseLowerCase,
  useNumerics: defaultUseNumerics,
  useSymbols: defaultUseSymbol,
  disallowExcluded: defaultDisallowExcluded,
  excluded: defaultExcluded,
});

/**
 * Check if the values are default values
 * @param {object} param
 * @returns {boolean}
 */
export const isDefaultValues = (param) =>
  param.length === defaultLength &&
  param.charSet === defaultCharSet &&
  param.useAllTypes === defaultUseAllType &&
  param.uniqueChars === defaultUniqueChars &&
  param.useUpperCase === defaultUseUpperCase &&
  param.useLowerCase === defaultUseLowerCase &&
  param.useNumerics === defaultUseNumerics &&
  param.useSymbols === defaultUseSymbol &&
  param.disallowExcluded === defaultDisallowExcluded &&
  param.excluded === defaultExcluded;

/**
 * Generate character set for password
 * @param {object} param
 * @returns {string}
 */
export const generateChars = (param) => {
  let ret;
  switch (param.charSet) {
    case "e":
      ret = charSetExt;
      break;
    case "m":
      ret = charSetAll;
      if (!param.useUpperCase) {
        ret = ret.replace(/[A-Z]/g, "");
      }
      if (!param.useLowerCase) {
        ret = ret.replace(/[a-z]/g, "");
      }
      if (!param.useNumerics) {
        ret = ret.replace(/[0-9]/g, "");
      }
      if (!param.useSymbols) {
        ret = ret.replace(/[^A-Za-z0-9]/g, "");
      }
      if (param.disallowExcluded) {
        for (let i = 0; i < param.excluded.length; ++i) {
          ret = ret.replaceAll(param.excluded.substring(i, i + 1), "");
        }
      }
      break;
    default: // "s"
      ret = charSetStd;
      break;
  }
  return ret;
};

/**
 * Check if the string has unique characters
 * @param {string} val
 * @returns {boolean}
 */
const isUnique = (val) => {
  for (let i = 0; i < val.length - 1; ++i) {
    if (val.indexOf(val.substring(i, i + 1), i + 1) >= 0) {
      return false;
    }
  }
  return true;
};

/**
 * Generate password
 * @param {string} chars
 * @param {object} param
 * @returns
 */
export const generatePassword = (chars, param) => {
  for (let i = 0; i < maxTryCount; ++i) {
    let ret = "";
    for (let j = 0; j < param.length; ++j) {
      ret += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    if (
      ret.length === param.length &&
      (!param.useAllTypes ||
        ((!param.useUpperCase || /[A-Z]/.test(ret)) &&
          (!param.useLowerCase || /[a-z]/.test(ret)) &&
          (!param.useNumerics || /[0-9]/.test(ret)) &&
          (!param.useSymbols || /[^A-Za-z0-9]/.test(ret)))) &&
      (!param.uniqueChars || isUnique(ret))
    ) {
      return ret;
    }
  }
  return "Error";
};
