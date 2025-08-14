const maxTryCount = 1000;

/**
 * @typedef {Object} Param
 * @property {number} length
 * @property {string} preset
 * @property {boolean} lowerCase
 * @property {boolean} upperCase
 * @property {boolean} numerics
 * @property {boolean} symbols
 * @property {boolean} allTypes
 * @property {boolean} uniqueChars
 * @property {boolean} applyExcluded
 * @property {string} excludedChars
 */

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
export const defaultExcludedChars = "Il10O8B3Egqvu!|[]{}";

/**
 * Generate character set for password
 * @param {Param} param
 * @returns {string}
 */
export const generateChars = (param) => {
  let ret;
  switch (param.preset) {
    case "e":
      ret = charSetExt;
      break;
    case "m":
      ret = charSetAll;
      if (!param.upperCase) {
        ret = ret.replace(/[A-Z]/g, "");
      }
      if (!param.lowerCase) {
        ret = ret.replace(/[a-z]/g, "");
      }
      if (!param.numerics) {
        ret = ret.replace(/[0-9]/g, "");
      }
      if (!param.symbols) {
        ret = ret.replace(/[^A-Za-z0-9]/g, "");
      }
      if (param.applyExcluded) {
        param.excludedChars.split("").forEach((c) => {
          ret = ret.replace(c, "");
        });
      }
      break;
    default: // "s"
      ret = charSetStd;
      break;
  }
  return ret;
};

/**
 * Generate candidate
 * @param {object} param
 * @returns {string}
 */
const generateCandidate = (param, chars) => {
  const buff = new Uint32Array(param.length);
  crypto.getRandomValues(buff);
  return buff.reduce((p, c) => p + chars.charAt(c % chars.length), "");
};

/**
 * Validate password
 * @param {object} param
 * @param {string} password
 * @returns {boolean}
 */
const validatePassword = (param, password) =>
  password.length === param.length &&
  (!param.allTypes ||
    ((!param.upperCase || /[A-Z]/.test(password)) &&
      (!param.lowerCase || /[a-z]/.test(password)) &&
      (!param.numerics || /[0-9]/.test(password)) &&
      (!param.symbols || /[^A-Za-z0-9]/.test(password)))) &&
  (!param.uniqueChars ||
    password.split("").every((c, i, all) => !all.slice(i + 1).includes(c)));

/**
 * Generate password
 * @param {object} param
 * @returns {string}
 */
export const generatePassword = (param, chars) => {
  for (let i = 0; i < maxTryCount; ++i) {
    const password = generateCandidate(param, chars);
    if (validatePassword(param, password)) {
      return password;
    }
  }
  return "";
};

export const exportedForTesting = {
  generateCandidate,
  validatePassword,
};
