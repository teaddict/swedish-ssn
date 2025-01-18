/**
 * Project: swedish-ssn
 * Purpose: Validate and generate Swedish SSN's according to https://en.wikipedia.org/wiki/Personal_identity_number_(Sweden)
 * Author:  teaddict
 * Version: 1.0.3
 */
class SwedishSSN {
  /**
   * Validates parameter given SSN. Returns true if SSN is valid, otherwise false.
   * @param {string} ssn - SSN to validate
   * @returns {boolean}
   */
  static validate(ssn) {
    if (ssn === undefined || ssn === null || ssn === '') {
      return false;
    }
    const ssnAsArray = parse(ssn);
    if (ssnAsArray.length !== 10) {
      return false;
    }
    const checkDigit = ssnAsArray.pop();
    return getChecksum(ssnAsArray) === checkDigit;
  }

  /**
   * Creates a valid SSN using random numbers.
   * @returns {string} - valid ssn
   */
  static generateRandomSSN() {
    const birthdate = getRandomDate();
    const secondPart = getRandomNumber(1000, 9998, 'random');
    const randomSsn = yymmdd(birthdate) + secondPart;
    const ssnAsArray = parse(randomSsn);
    const checksum = getChecksum(ssnAsArray);
    ssnAsArray.push(checksum);
    return ssnFormatter(ssnAsArray);
  }

  /**
   * Creates a valid SSN using given date and gender.
   * @param {Date} birthdate - Birth date
   * @param {string} [gender] - 'male' or 'female'
   * @returns {string} - valid ssn
   */
  static generateSSNWithParameters(birthdate, gender) {
    if (!(birthdate instanceof Date) || isNaN(birthdate)) {
      throw new Error('Invalid birthdate provided');
    }
    const secondPart = getRandomNumber(1000, 9999, gender);
    const randomSsn = yymmdd(birthdate) + secondPart;
    const ssnAsArray = parse(randomSsn);
    const checksum = getChecksum(ssnAsArray);
    ssnAsArray.push(checksum);
    return ssnFormatter(ssnAsArray);
  }
}
const genderEnum = Object.freeze({
  MALE: 'male',
  FEMALE: 'female'
});
function yymmdd(birthdate) {
  try {
    return birthdate.toLocaleDateString("sv-SE", {
      year: "2-digit",
      month: "2-digit",
      day: "2-digit"
    }).replace(/\D/g, "");
  } catch (error) {
    throw new Error('Invalid date format');
  }
}

/**
 * Returns a random number as string for second part of ssn
 * @param {number} min - Minimum value
 * @param {number} max - Maximum value
 * @param {string} [gender] - Gender specification
 * @returns {string} - Three digit number as string
 */
function getRandomNumber(min, max, gender) {
  const number = Math.floor(Math.random() * (max - min + 1) + min);
  let result = number;
  switch (gender) {
    case genderEnum.MALE:
      result = isEven(number) ? number + 1 : number;
      break;
    case genderEnum.FEMALE:
      result = isOdd(number) ? number + 1 : number;
      break;
  }
  return result.toString().substring(1);
}
const isEven = x => x % 2 === 0;
const isOdd = x => !isEven(x);
function getRandomDate() {
  const minDate = new Date(1900, 0, 1).getTime();
  const maxDate = new Date(2099, 11, 31).getTime();
  return new Date(minDate + Math.random() * (maxDate - minDate));
}
const flatMap = (arr, f) => arr.flatMap(f);
function getChecksum(ssn) {
  const luhn = [2, 1, 2, 1, 2, 1, 2, 1, 2];
  const multiplied = ssn.map((e, i) => e * luhn[i]);
  const digits = flatMap(multiplied, n => n >= 10 ? [sumOfNum(n)] : [n]);
  const sumOfDigits = digits.reduce((acc, curr) => acc + curr, 0);
  return Math.floor(sumOfDigits * 9 % 10);
}
function sumOfNum(num) {
  return Math.floor(num % 10) + Math.floor(num / 10);
}

/**
 * Returns a formatted SSN 'yymmdd-fjkm'
 * @param {number[]} ssnAsArray - Array of SSN digits
 * @returns {string} - Formatted SSN
 */
function ssnFormatter(ssnAsArray) {
  const firstPart = ssnAsArray.slice(0, 6).join('');
  const secondPart = ssnAsArray.slice(6, 10).join('');
  return `${firstPart}-${secondPart}`;
}

/**
 * Parse parameter given SSN string. Remove all characters except digits.
 * @param {string} ssn - SSN to parse
 * @returns {number[]} - Array of digits
 */
function parse(ssn) {
  const cleaned = ssn.replace(/\D/g, "").split("").map(Number);
  return cleaned.length === 12 ? cleaned.slice(2, 12) : cleaned;
}

export { SwedishSSN as default };
//# sourceMappingURL=swedish-ssn.esm.js.map
