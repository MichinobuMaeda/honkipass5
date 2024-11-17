export const minLength = 6;
const maxTryCount = 1000;

/**
 * @typedef {Object} Param
 * @property {number} length
 * @property {string} charSet
 * @property {boolean} useAllTypes
 * @property {boolean} uniqueChars
 * @property {boolean} useUpperCase
 * @property {boolean} useLowerCase
 * @property {boolean} useNumerics
 * @property {boolean} useSymbols
 * @property {boolean} disallowExcluded
 * @property {string} excluded
 */

/**
 * @type {Param}
 */
const defaultValues = {
	length: 8,
	charSet: 's',
	useAllTypes: true,
	uniqueChars: true,
	useUpperCase: true,
	useLowerCase: true,
	useNumerics: true,
	useSymbols: true,
	disallowExcluded: true,
	excluded: 'Il10O8B3Egqvu!|[]{}'
};

export const charSetAll =
	'!"#$%&\'()*+,-./0123456789:;<=>?@' +
	'ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`' +
	'abcdefghijklmnopqrstuvwxyz{|}~';
export const charSetStd =
	'!#%+23456789:=?@' + //
	'ABCDEFGHJKLMNPRSTUVWXYZ' + //
	'abcdefghijkmnopqrstuvwxyz';
export const charSetExt =
	'!"#$%&\'()*+,-./23456789:;<=>?@' +
	'ABCDEFGHJKLMNOPRSTUVWXYZ[\\]^_' +
	'abcdefghijkmnopqrstuvwxyz{|}~';

/**
 * Get default values
 * @returns {Param}
 */
export const getDefaultValues = () => ({ ...defaultValues });

/**
 * Check if the values are default values
 * @param {Param} param
 * @returns {boolean}
 */
export const isDefaultValues = (param) =>
	Object.keys(defaultValues).every((key) => param[key] === defaultValues[key]);

/**
 * Generate character set for password
 * @param {Param} param
 * @returns {string}
 */
export const generateChars = (param) => {
	let ret;
	switch (param.charSet) {
		case 'e':
			ret = charSetExt;
			break;
		case 'm':
			ret = charSetAll;
			if (!param.useUpperCase) {
				ret = ret.replace(/[A-Z]/g, '');
			}
			if (!param.useLowerCase) {
				ret = ret.replace(/[a-z]/g, '');
			}
			if (!param.useNumerics) {
				ret = ret.replace(/[0-9]/g, '');
			}
			if (!param.useSymbols) {
				ret = ret.replace(/[^A-Za-z0-9]/g, '');
			}
			if (param.disallowExcluded) {
				param.excluded.split('').forEach((c) => {
					ret = ret.replace(c, '');
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
const generateCandidate = (param) => {
	const chars = generateChars(param);
	const buff = new Uint32Array(param.length);
	crypto.getRandomValues(buff);
	return buff.reduce((p, c) => p + chars.charAt(c % chars.length), '');
};

/**
 * Validate password
 * @param {object} param
 * @param {string} password
 * @returns {boolean}
 */
const validatePassword = (param, password) =>
	password.length === param.length &&
	(!param.useAllTypes ||
		((!param.useUpperCase || /[A-Z]/.test(password)) &&
			(!param.useLowerCase || /[a-z]/.test(password)) &&
			(!param.useNumerics || /[0-9]/.test(password)) &&
			(!param.useSymbols || /[^A-Za-z0-9]/.test(password)))) &&
	(!param.uniqueChars || password.split('').every((c, i, all) => !all.slice(i + 1).includes(c)));

/**
 * Generate password
 * @param {object} param
 * @returns {string}
 */
export const generatePassword = (param) => {
	for (let i = 0; i < maxTryCount; ++i) {
		const password = generateCandidate(param);
		if (validatePassword(param, password)) {
			return password;
		}
	}
	return '';
};

export const exportedForTesting = {
	generateCandidate,
	validatePassword
};
