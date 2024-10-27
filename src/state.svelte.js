import { writable, derived } from "svelte/store";

export const minLength = 6;
export const maxTryCount = 1000;

const defaultLength = 8;
const defaultCharSet = "s";
const defaultUseAllType = true;
const defaultUniqueChars = true;
const defaultUseUpperCase = true;
const defaultUseLowerCase = true;
const defaultUseNumerics = true;
const defaultUseSymbol = true;
const defaultDisallowExcluded = true;
const defaultExcluded = "Il10O8B3Egqvu!|[]{}";

export const charSetAll =
  "!\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~";
const charSetStd =
  "!#%+23456789:=?@ABCDEFGHJKLMNPRSTUVWXYZabcdefghijkmnopqrstuvwxyz";
const charSetExt =
  "!\"#$%&'()*+,-./23456789:;<=>?@ABCDEFGHJKLMNOPRSTUVWXYZ[\\]^_abcdefghijkmnopqrstuvwxyz{|}~";

export const length = writable(defaultLength);
export const tryCount = writable(maxTryCount);
export const charSet = writable(defaultCharSet);
export const useAllTypes = writable(defaultUseAllType);
export const uniqueChars = writable(defaultUniqueChars);
export const useUpperCase = writable(defaultUseUpperCase);
export const useLowerCase = writable(defaultUseLowerCase);
export const useNumerics = writable(defaultUseNumerics);
export const useSymbols = writable(defaultUseSymbol);
export const disallowExcluded = writable(defaultDisallowExcluded);
export const excluded = writable(defaultExcluded);
export const chars = derived(
  [
    charSet,
    useUpperCase,
    useLowerCase,
    useNumerics,
    useSymbols,
    disallowExcluded,
    excluded,
  ],
  ([
    $charSet,
    $useUpperCase,
    $useLowerCase,
    $useNumerics,
    $useSymbols,
    $disallowExcluded,
    $excluded,
  ]) => {
    let ret;
    switch ($charSet) {
      case "e":
        ret = charSetExt;
        break;
      case "m":
        ret = charSetAll;
        if (!$useUpperCase) {
          ret = ret.replace(/[A-Z]/g, "");
        }
        if (!$useLowerCase) {
          ret = ret.replace(/[a-z]/g, "");
        }
        if (!$useNumerics) {
          ret = ret.replace(/[0-9]/g, "");
        }
        if (!$useSymbols) {
          ret = ret.replace(/[^A-Za-z0-9]/g, "");
        }
        if ($disallowExcluded) {
          for (let i = 0; i < $excluded.length; ++i) {
            ret = ret.replaceAll($excluded.substring(i, i + 1), "");
          }
        }
        break;
      default: // "s"
        ret = charSetStd;
        break;
    }
    return ret;
  },
);

export const password = derived(
  [
    tryCount,
    length,
    chars,
    useAllTypes,
    uniqueChars,
    useUpperCase,
    useLowerCase,
    useNumerics,
    useSymbols,
  ],
  ([
    $tryCount,
    $length,
    $chars,
    $useAllTypes,
    $uniqueChars,
    $useUpperCase,
    $useLowerCase,
    $useNumerics,
    $useSymbols,
  ]) => {
    const isUnique = (ret) => {
      for (let i = 0; i < ret.length - 1; ++i) {
        if (ret.indexOf(ret.substring(i, i + 1), i + 1) >= 0) {
          return false;
        }
      }
      return true;
    };
    for (let i = 0; i < $tryCount; ++i) {
      let ret = "";
      for (let j = 0; j < $length; ++j) {
        ret += $chars.charAt(Math.floor(Math.random() * $chars.length));
      }
      if (
        ret.length === $length &&
        (!$useAllTypes ||
          ((!$useUpperCase || /[A-Z]/.test(ret)) &&
            (!$useLowerCase || /[a-z]/.test(ret)) &&
            (!$useNumerics || /[0-9]/.test(ret)) &&
            (!$useSymbols || /[^A-Za-z0-9]/.test(ret)))) &&
        (!$uniqueChars || isUnique(ret))
      ) {
        return ret;
      }
    }
    return "Error";
  },
);

export const reset = () => {
  length.set(defaultLength);
  charSet.set(defaultCharSet);
  useAllTypes.set(defaultUseAllType);
  uniqueChars.set(defaultUniqueChars);
  useUpperCase.set(defaultUseUpperCase);
  useLowerCase.set(defaultUseLowerCase);
  useNumerics.set(defaultUseNumerics);
  useSymbols.set(defaultUseSymbol);
  disallowExcluded.set(defaultDisallowExcluded);
  excluded.set(defaultExcluded);
};

export const canReset = derived(
  [
    length,
    charSet,
    useAllTypes,
    uniqueChars,
    useUpperCase,
    useLowerCase,
    useNumerics,
    useSymbols,
    disallowExcluded,
    excluded,
  ],
  ([
    $length,
    $charSet,
    $useAllTypes,
    $uniqueChars,
    $useUpperCase,
    $useLowerCase,
    $useNumerics,
    $useSymbols,
    $disallowExcluded,
    $excluded,
  ]) =>
    $length === defaultLength &&
    $charSet === defaultCharSet &&
    $useAllTypes === defaultUseAllType &&
    $uniqueChars === defaultUniqueChars &&
    $useUpperCase === defaultUseUpperCase &&
    $useLowerCase === defaultUseLowerCase &&
    $useNumerics === defaultUseNumerics &&
    $useSymbols === defaultUseSymbol &&
    $disallowExcluded === defaultDisallowExcluded &&
    $excluded === defaultExcluded,
);
