(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define("SwedishSSN", ["module", "exports"], factory);
  } else if (typeof exports !== "undefined") {
    factory(module, exports);
  } else {
    var mod = {
      exports: {}
    };
    factory(mod, mod.exports);
    global.SwedishSSN = mod.exports;
  }
})(this, function (module, exports) {
  "use strict";
  /**
   * Project: swedish-ssn
   * Purpose: Validate and generate Swedish SSN's according to https://en.wikipedia.org/wiki/Personal_identity_number_(Sweden)
   * Author:  teaddict
   */
  //! https://github.com/teaddict/swedish-ssn | Version: 1.0.0

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  var SwedishSSN = function () {
    function SwedishSSN() {
      _classCallCheck(this, SwedishSSN);
    }

    _createClass(SwedishSSN, null, [{
      key: "validate",
      value: function validate(ssn) {
        if (ssn === undefined || ssn === null) {
          return false;
        }

        var ssnAsArray = parse(ssn);

        if (ssnAsArray.length === 10) {
          var checkDigit = ssnAsArray.pop();

          switch (getChecksum(ssnAsArray)) {
            case checkDigit:
              return true;

            default:
              return false;
          }
        } else {
          return false;
        }
      }
    }, {
      key: "generateRandomSSN",
      value: function generateRandomSSN() {
        var birthdate = getRandomDate();
        var secondPart = getRandomNumber(1000, 9998, 'random');
        var randomSsn = yymmdd(birthdate) + secondPart;
        var ssnAsArray = parse(randomSsn);
        var checksum = getChecksum(ssnAsArray);
        ssnAsArray.push(checksum);
        return ssnFormatter(ssnAsArray);
      }
    }, {
      key: "generateSSNWithParameters",
      value: function generateSSNWithParameters(birthdate, gender) {
        var secondPart = getRandomNumber(1000, 9999, gender);
        var randomSsn = yymmdd(birthdate) + secondPart;
        var ssnAsArray = parse(randomSsn);
        var checksum = getChecksum(ssnAsArray);
        ssnAsArray.push(checksum);
        return ssnFormatter(ssnAsArray);
      }
    }]);

    return SwedishSSN;
  }();

  exports.default = SwedishSSN;
  var genderEnum = {
    MALE: 'male',
    FEMALE: 'female'
  };

  function yymmdd(birthdate) {
    var formatted = birthdate.toLocaleDateString("sv-SE", {
      year: "2-digit",
      month: "2-digit",
      day: "2-digit"
    }).replace(/\D/g, "");
    return formatted;
  }
  /**
  *returns a random number as string for second part of ssn
  */


  function getRandomNumber(min, max, gender) {
    var number = Math.floor(Math.random() * (max - min + 1) + min);

    switch (gender) {
      case genderEnum.MALE:
        if (isEven(number)) {
          number = number + 1;
        }

        break;

      case genderEnum.FEMALE:
        if (isOdd(number)) {
          number = number + 1;
        }

        break;

      default:
        break;
    }

    return number.toString().substring(1);
  }

  function isEven(x) {
    return x % 2 === 0;
  }

  function isOdd(x) {
    return !isEven(x);
  }

  function getRandomDate(start, end) {
    return new Date(new Date(1900, 1, 1).getTime() + Math.random() * (new Date(2099, 1, 1).getTime() - new Date(1900, 1, 1).getTime()));
  }

  var flatMap = function flatMap(arr, f) {
    return [].concat.apply([], arr.map(f));
  };

  function getChecksum(ssn) {
    var luhn = [2, 1, 2, 1, 2, 1, 2, 1, 2];
    var multiplied = ssn.map(function (e, i) {
      return e * luhn[i];
    });
    var digits = flatMap(multiplied, function (n) {
      return n >= 10 ? [sumOfNum(n)] : [n];
    });

    var reducer = function reducer(accumulator, currentValue) {
      return accumulator + currentValue;
    };

    var sumOfDigits = digits.reduce(reducer);
    var checksum = Math.floor(sumOfDigits * 9 % 10);
    return checksum;
  }

  function sumOfNum(num) {
    return Math.floor(num % 10) + Math.floor(num / 10);
  }
  /**
  * returns a formatted SSN 'yymmdd-fjkm'
  */


  function ssnFormatter(ssnAsArray) {
    var formattedSSN = ssnAsArray.slice(0, 6).join('').toString() + "-" + ssnAsArray.slice(6, 10).join('').toString();
    return formattedSSN;
  }
  /**
   * Parse parameter given SSN string. Remove all characters except digits.
   * @param ssn - {String} SSN to parse
   * @returns Int[]
   */


  function parse(ssn) {
    var cleaned = ssn.replace(/\D/g, "").split("");

    if (cleaned.length === 12) {
      return cleaned.slice(2, 12).map(Number);
    }

    return cleaned.map(Number);
  }

  module.exports = exports["default"];
});

