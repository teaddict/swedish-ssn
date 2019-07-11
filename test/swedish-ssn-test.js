"use strict"
import SwedishSSN from "../src/swedish-ssn"
import {expect} from "chai"


describe("SwedishSSN", () => {

  describe("#validate", () => {
    it("Should fail when given empty String", () => {
      expect(SwedishSSN.validate("")).to.equal(false)
    })

    it("Should fail when given undefined", () => {
      expect(SwedishSSN.validate(undefined)).to.equal(false)
    })

    it("Should fail when given null", () => {
      expect(SwedishSSN.validate(null)).to.equal(false)
    })
   
    it("Should pass when given valid Swedish ssn with yy format year", () => {
      expect(SwedishSSN.validate("870430-2713")).to.equal(true)
    })

    it("Should pass when given valid Swedish ssn yyyy format year", () => {
      expect(SwedishSSN.validate("20870430-2713")).to.equal(true)
    })

    it("Should fail when given invalid Swedish sss", () => {
      expect(SwedishSSN.validate("530913-5701")).to.equal(false)
    })
  })

  describe("#generateSSN", () => {
    it("Should generate valid Swedish SSN", () => {
      let fakeSSN = SwedishSSN.generateRandomSSN()
      expect(SwedishSSN.validate(fakeSSN)).to.equal(true)
    })
  })

  describe("#generateSSNWithParameters", () => {
    it("Should generate valid Swedish SSN with gender female", () => {
      const birthDate = new Date();
      let fakeSSN = SwedishSSN.generateSSNWithParameters(birthDate,'female')
      let genderNum = Number(fakeSSN.split('')[9]);
      expect(SwedishSSN.validate(fakeSSN)).to.equal(true)
      expect((genderNum%2) === 0).to.equal(true)
    })

    it("Should generate valid Swedish SSN with gender male", () => {
      const birthDate = new Date();
      let fakeSSN = SwedishSSN.generateSSNWithParameters(birthDate,'male')
      let genderNum = Number(fakeSSN.split('')[9]);
      expect(SwedishSSN.validate(fakeSSN)).to.equal(true)
      expect((genderNum%2) !== 0).to.equal(true)
    })

    it("Should generate valid Swedish SSN with random gender", () => {
      const birthDate = new Date();
      let fakeSSN = SwedishSSN.generateSSNWithParameters(birthDate)
      expect(SwedishSSN.validate(fakeSSN)).to.equal(true)
    })
  })
})
