"use strict"
import SwedishSSN from "../src/swedish-ssn"

describe("SwedishSSN", () => {
  describe("#validate", () => {
    it("Should fail when given empty String", () => {
      expect(SwedishSSN.validate("")).toBe(false)
    })

    it("Should fail when given undefined", () => {
      expect(SwedishSSN.validate(undefined)).toBe(false)
    })

    it("Should fail when given null", () => {
      expect(SwedishSSN.validate(null)).toBe(false)
    })
   
    it("Should pass when given valid Swedish ssn with yy format year", () => {
      expect(SwedishSSN.validate("870430-2713")).toBe(true)
    })

    it("Should pass when given valid Swedish ssn yyyy format year", () => {
      expect(SwedishSSN.validate("20870430-2713")).toBe(true)
    })

    it("Should fail when given invalid Swedish ssn", () => {
      expect(SwedishSSN.validate("530913-5701")).toBe(false)
    })

    it("Should fail when given malformed input", () => {
      expect(SwedishSSN.validate("abc123")).toBe(false)
      expect(SwedishSSN.validate("12345")).toBe(false)
      expect(SwedishSSN.validate("123456-789")).toBe(false)
    })
  })

  describe("#generateRandomSSN", () => {
    it("Should generate valid Swedish SSN", () => {
      const fakeSSN = SwedishSSN.generateRandomSSN()
      expect(SwedishSSN.validate(fakeSSN)).toBe(true)
      expect(fakeSSN).toMatch(/^\d{6}-\d{4}$/)
    })

    it("Should generate unique SSNs", () => {
      const ssn1 = SwedishSSN.generateRandomSSN()
      const ssn2 = SwedishSSN.generateRandomSSN()
      expect(ssn1).not.toBe(ssn2)
    })
  })

  describe("#generateSSNWithParameters", () => {
    it("Should generate valid Swedish SSN with gender female", () => {
      const birthDate = new Date()
      const fakeSSN = SwedishSSN.generateSSNWithParameters(birthDate, 'female')
      const genderNum = Number(fakeSSN.split('')[9])
      
      expect(SwedishSSN.validate(fakeSSN)).toBe(true)
      expect(genderNum % 2 === 0).toBe(true)
    })

    it("Should generate valid Swedish SSN with gender male", () => {
      const birthDate = new Date()
      const fakeSSN = SwedishSSN.generateSSNWithParameters(birthDate, 'male')
      const genderNum = Number(fakeSSN.split('')[9])
      
      expect(SwedishSSN.validate(fakeSSN)).toBe(true)
      expect(genderNum % 2 !== 0).toBe(true)
    })

    it("Should generate valid Swedish SSN with random gender", () => {
      const birthDate = new Date()
      const fakeSSN = SwedishSSN.generateSSNWithParameters(birthDate)
      expect(SwedishSSN.validate(fakeSSN)).toBe(true)
    })

    it("Should throw error with invalid date", () => {
      expect(() => SwedishSSN.generateSSNWithParameters("invalid date", 'male'))
        .toThrow('Invalid birthdate provided')
      expect(() => SwedishSSN.generateSSNWithParameters(new Date('invalid'), 'male'))
        .toThrow('Invalid birthdate provided')
    })
  })
})
