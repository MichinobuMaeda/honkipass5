const maxTryCount = 1000;

interface Param {
  length: number;
  preset: string;
  lowerCase: boolean;
  upperCase: boolean;
  numerics: boolean;
  symbols: boolean;
  allTypes: boolean;
  uniqueChars: boolean;
  applyExcluded: boolean;
  excludedChars: string;
}

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
 * @param {Param} param - Parameters for character set generation.
 * @returns {string} Generated character set.
 */
export const generateChars = (param: Param): string => {
  let ret: string;
  switch (param.preset) {
    case "ext":
      ret = charSetExt;
      break;
    case "manual":
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
    default: // "std"
      ret = charSetStd;
      break;
  }
  return ret;
};

/**
 * Generate candidate
 * @param {Param} param - Parameters for password generation.
 * @param {string} chars - Available character set.
 * @returns {string} Generated candidate password.
 */
const generateCandidate = (param: Param, chars: string): string => {
  const buff = new Uint32Array(param.length);
  crypto.getRandomValues(buff);
  return buff.reduce((p, c) => p + chars.charAt(c % chars.length), "");
};

/**
 * Validate password
 * @param {Param} param - Parameters for validation.
 * @param {string} password - Password to validate.
 * @returns {boolean} True if password meets criteria.
 */
const validatePassword = (param: Param, password: string): boolean =>
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
 * @param {Param} param - Parameters for password generation.
 * @param {string} chars - Available character set.
 * @returns {string} Generated password or empty string if failed.
 */
export const generatePassword = (param: Param, chars: string): string => {
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
