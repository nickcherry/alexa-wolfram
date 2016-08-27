"use strict"

/***********************************************/
/* Imports */
/***********************************************/

const chai = require('chai');
const expect = chai.expect;
const fs = require('fs');

const Config = require('../config');
const WolframService = require('../wolfram_service');


/***********************************************/
/* Config */
/***********************************************/

chai.config.includeStack = true;


/***********************************************/
/* Tests */
/***********************************************/

describe('WolframService', () => {
  const subject = new WolframService(Config.wolframAppId);
  const twoPlusTwoXml = fs.readFileSync(__dirname + '/support/query_2+2.xml').toString();
  const fortyXml = fs.readFileSync(__dirname + '/support/forty.xml').toString();
  const ehhhXml = fs.readFileSync(__dirname + '/support/ehhh.xml').toString();

  describe('#ask', () => {
    context('with invalid input', () => {
      it('gets rejected', () => {
        const input = undefined;
        expect(subject.ask(input)).to.be.rejected;
      });
    });
    context('with a valid input', () => {
      it('returns an API response with XML in the body', (done) => {
        const input = 'what is 2 + 2';
        subject.ask(input).then((response) => {
          expect(response.body).to.include("<?xml version=\'1.0\' encoding=\'UTF-8\'?>");
          expect(response.body).to.include("<queryresult success='true'");
          expect(response.body).to.include("<pod title='Result'");
          done();
        });
      });
    });
  });

  describe('extractResultText', () => {
    context('from a response with a primary pod', () => {
      it('should return the plain-text from the primary pod', () => {
        const expected = '4';
        expect(subject.extractResultText(twoPlusTwoXml)).to.eq(expected);
      });
    });
    context('from a response with no primary pod', () => {
      it('should return the first plain-text response it finds', () => {
        const expected = '40';
        expect(subject.extractResultText(fortyXml)).to.eq(expected);
      });
    });
    context('from a response with no pods', () => {
      expect(subject.extractResultText(ehhhXml)).to.be.undefined;
    });
    context('from invalid xml', () => {
      const schmexml = '<gobbledygook <<<<>';
      expect(subject.extractResultText(schmexml)).to.be.undefined;
    });
  });

  describe('#_parse', () => {
    context('with valid xml from Wolfram', () => {
      it('should parse the document and return an XmlDocument object', () => {
        const xml = subject._parse(twoPlusTwoXml);
        expect(xml.constructor.name).to.eq('XmlDocument');
      });
    });
    context('with invalid xml', () => {
      it('should return undefined', () => {
        const schmexml = '<gobbledygook <<<<>';
        const parsed = subject._parse(schmexml);
        expect(parsed).to.be.undefined;
      });
    });
  });
});
