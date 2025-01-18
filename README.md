Swedish Personal Number or Swedish Social Security Number Validation and Generation
===================================

A modern JavaScript library for validating and generating Swedish Personal Numbers (Social Security Numbers).

[![npm version](https://badge.fury.io/js/swedish-ssn-tool.svg)](https://badge.fury.io/js/swedish-ssn-tool)
[![License: GPL](https://img.shields.io/badge/License-GPL-blue.svg)](LICENSE)

## Features

- 🔍 Validate Swedish Personal Numbers
- 🎲 Generate valid random SSNs
- 👥 Generate SSNs with specific gender
- 📅 Support for both YY and YYYY date formats
- 0️⃣ Zero dependencies
- 🌐 Works in Node.js and browsers
- 📦 Modern ES modules and UMD builds

## Installation

```bash
# Using npm
npm install swedish-ssn-tool

# Using yarn
yarn add swedish-ssn-tool

# Using pnpm
pnpm add swedish-ssn-tool
```

## Usage

### ES Modules (Recommended)

```js
import SwedishSSN from 'swedish-ssn-tool';

// Validate an SSN
const isValid = SwedishSSN.validate('870430-2713');
console.log(isValid); // true

// Generate a random SSN
const randomSSN = SwedishSSN.generateRandomSSN();
console.log(randomSSN); // e.g., '901224-1234'

// Generate SSN for specific gender and date
const femaleSSN = SwedishSSN.generateSSNWithParameters(
  new Date('1990-12-24'), 
  'female'
);
```

### Browser (UMD)

```html
<script src="https://unpkg.com/swedish-ssn-tool/dist/swedish-ssn.min.js"></script>
<script>
  // Library is available as global SwedishSSN
  const isValid = SwedishSSN.validate('20870430-2713');
  console.log(isValid); // true
</script>
```

## API Reference

### `validate(ssn: string): boolean`

Validates a Swedish SSN. Returns `true` if valid, `false` otherwise.

```js
SwedishSSN.validate('870430-2713');  // true
SwedishSSN.validate('20870430-2713'); // true (YYYY format)
SwedishSSN.validate('invalid');       // false
```

### `generateRandomSSN(): string`

Generates a random valid Swedish SSN.

```js
const ssn = SwedishSSN.generateRandomSSN();
// Returns formatted SSN like '870430-2713'
```

### `generateSSNWithParameters(birthdate: Date, gender?: 'male' | 'female'): string`

Generates a valid SSN with specified parameters.

```js
// Generate female SSN
const femaleSSN = SwedishSSN.generateSSNWithParameters(
  new Date('1987-04-30'), 
  'female'
);

// Generate male SSN
const maleSSN = SwedishSSN.generateSSNWithParameters(
  new Date('1987-04-30'), 
  'male'
);

// Generate random gender SSN
const randomSSN = SwedishSSN.generateSSNWithParameters(
  new Date('1987-04-30')
);
```

## Development

```bash
# Install dependencies
npm install

# Run tests
npm test

# Build distribution files
npm run build

# Lint code
npm run lint

# Format code
npm run format
```

## Format Specification

Swedish Personal Numbers follow this format:
- YYMMDD-XXXX (10 digits)
- YYYYMMDD-XXXX (12 digits)

Where:
- YY/YYYY = Year
- MM = Month
- DD = Day
- XXXX = Four digit sequence where last digit is a checksum
- The second to last digit indicates gender (even for female, odd for male)

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

[GPL License](LICENSE)

## Author

teaddict - [GitHub](https://github.com/teaddict)

## Changelog

### 1.0.2
- Modernized build system with Rollup
- Added ESM module support
- Improved testing setup
- Added TypeScript types
- Enhanced documentation

### 1.0.1
- Bug fixes and improvements

### 1.0.0
- Initial release
