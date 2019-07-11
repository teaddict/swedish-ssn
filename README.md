Swedish Personal Number or Swedish Social Security Number Validation and Generation
===================================

- A micro Javascript library for validating and generating Swedish Personal Number.
- Lightweight
- No dependencies

Installation
------------

NPM

```sh
npm install swedish-ssn-tool
```

Bower

```sh
bower install swedish-ssn-tool
```

Usage
-----

ES6

``` js
import SwedishSSN from "../swedish-ssn"
const isValid = SwedishSSN.validate('870430-2713');
console.log(isValid);
//  result true

```

Using global namespace.

``` html
<script src="https://unpkg.com/swedish-ssn-tool/swedish-ssn.min.js"></script>
<script>
  // This is valid SSN
  var isValid = SwedishSSN.validate('20870430-2713');
  console.log(isValid);
  //  result true
</script>

```

Examples
--------

Validate SSN

``` js
//  This is valid Swedish SSN
console.log('valid ssn returns ' + SwedishSSN.validate('870430-2713'));
//  'valid ssn returns true'

//  This is invalid Swedish SSN
console.log('invalid ssn returns ' + SwedishSSN.validate('870430-2714'));
//  'invalid ssn returns false'

```

Generate SSN

``` js
//  generate a random SSN
var fakeSSN =  SwedishSSN.generateRandomSSN();
//  now validate it
console.log('Is ssn valid: ' + SwedishSSN.validate(fakeSSN));
```

Generate SSN With Parameters

``` js
//  generate a random SSN for female
var fakeSSN =  SwedishSSN.generateSSNWithParameters(new Date(1970-11-10), 'female');
//  generate a random SSN for male
var fakeSSN =  SwedishSSN.generateSSNWithParameters(new Date(1970-11-10), 'male');
//  generate a random SSN for random gender
var fakeSSN =  SwedishSSN.generateSSNWithParameters(new Date(1970-11-10));
//  now validate it
console.log('Is ssn valid: ' + SwedishSSN.validate(fakeSSN));
```

Functions
---------

### #validate(ssn)

- Validates parameter given SSN. Returns true if SSN is valid, otherwise false

### #generateRandomSSN()

- Generates a random SSN. Returns formatted: '870430-2713'

### #generateSSNWithParameters(birthdate, gender)

- Generates a random SSN with given parameter.
- Birthdate could be `new Date()` , it will format it in the script
- Gender could be `male` and `female`, default is random gender
- Returns formatted: '870430-2713'

Building
--------

```sh
# Build a distributable, minified UMD library compatible with browsers and Node
npm run dist

# Run tests
npm run test

```
Test Online
---------
[check from my website](http://teaddict.net/swedish-ssn.html)

Changelog
---------

### 1.0.0
- Initial release


License
-------

[GPL License](LICENSE)
