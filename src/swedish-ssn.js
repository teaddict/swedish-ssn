"use strict"
/**
 * Project: swedish-ssn
 * Purpose: Validate and generate Swedish SSN's according to https://en.wikipedia.org/wiki/Personal_identity_number_(Sweden)
 * Author:  teaddict
 */

//! https://github.com/teaddict/swedish-ssn | Version: 1.0.0
export default class SwedishSSN {
  /**
   * Validates parameter given SSN. Returns true if SSN is valid, otherwise false.
   * @param ssn - {String}
   * @returns {boolean}
   */
  static validate(ssn) {
    if (ssn === undefined || ssn === null) {
      return false;
    }

    let ssnAsArray = parse(ssn);
    if (ssnAsArray.length === 10) {
      const checkDigit = ssnAsArray.pop();
      switch(getChecksum(ssnAsArray)) {
        case checkDigit: return true;
        default: return false;
      }
    } else {
      return false;
    }
  }

  /**
   * Creates a valid SSN using random numbers.
   * @returns {String} - valid ssn.
   */
  static generateRandomSSN() {
    const birthdate = getRandomDate();
    let secondPart = getRandomNumber(1000, 9998, 'random');
    let randomSsn = yymmdd(birthdate) + secondPart;
    let ssnAsArray = parse(randomSsn);
    const checksum = getChecksum(ssnAsArray);
    ssnAsArray.push(checksum)
    return ssnFormatter(ssnAsArray);
  }

  /**
   * Creates a valid SSN using given date and gender.
   * @returns {String} - valid ssn.
   */
  static generateSSNWithParameters(birthdate, gender) {
    let secondPart = getRandomNumber(1000, 9999, gender);
    let randomSsn = yymmdd(birthdate) + secondPart;
    let ssnAsArray = parse(randomSsn);
    const checksum = getChecksum(ssnAsArray);
    ssnAsArray.push(checksum)
    return ssnFormatter(ssnAsArray);
  }
}

const genderEnum = {
  MALE: 'male',
  FEMALE: 'female'
}

function yymmdd(birthdate) {
  const formatted = birthdate.toLocaleDateString("en-CA", {year: "2-digit", month: "2-digit", day: "2-digit"}).replace(/\D/g, "");
  return formatted;
}

/**
*returns a random number as string for second part of ssn
*/
function getRandomNumber(min, max, gender) {
  let number = Math.floor(Math.random() * (max - min + 1) + min);
  switch (gender) {
    case genderEnum.MALE:
      if(isEven(number)) {
        number = number +1;
      }
      break;
    case genderEnum.FEMALE:
      if(isOdd(number)) {
        number = number + 1;
      }
      break;
    default:
      break;
  }
  return number.toString().substring(1);
}

function isEven(x) { return (x%2) === 0; }
function isOdd(x) { return !isEven(x); }

function getRandomDate(start, end) {
  return new Date(new Date(1900, 1, 1).getTime() + Math.random() * (new Date(2099,1,1).getTime() - new Date(1900, 1, 1).getTime()))
}

const flatMap = (arr, f) => [].concat.apply([], arr.map(f))

function getChecksum(ssn) {
  const luhn = [2, 1, 2, 1, 2, 1, 2, 1, 2]
  const multiplied = ssn.map(function (e, i) {
    return e * luhn[i];
  });
  const digits = flatMap(multiplied, (n) =>
    (n >= 10) ? [sumOfNum(n)] : [n]
  );

  const reducer = (accumulator, currentValue) => accumulator + currentValue;
  const sumOfDigits = digits.reduce(reducer);
  const checksum = Math.floor((sumOfDigits * 9) % 10);
  return checksum;
}

function sumOfNum(num) {
  return (Math.floor(num % 10) + Math.floor(num / 10));
}

/**
* returns a formatted SSN 'yymmdd-fjkm'
*/
function ssnFormatter(ssnAsArray) {
  const formattedSSN = ssnAsArray.slice(0,6).join('').toString() + "-" + ssnAsArray.slice(6,10).join('').toString();
  return formattedSSN;
}

/**
 * Parse parameter given SSN string. Remove all characters except digits.
 * @param ssn - {String} SSN to parse
 * @returns Int[]
 */
function parse(ssn) {
  const cleaned = ssn.replace(/\D/g, "").split("")
  if(cleaned.length === 12) {
    return cleaned.slice(2,12).map(Number);
  }
  return cleaned.map(Number);
}
