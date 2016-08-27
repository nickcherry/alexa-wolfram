"use strict"

/***********************************************/
/* Imports */
/***********************************************/

const _ = require('lodash');
const rp = require('request-promise');
const xmldoc = require('xmldoc');

const WOLFRAM_BASE_URL = 'http://api.wolframalpha.com/v2/query';


/***********************************************/
/* Service */
/***********************************************/

class WolframService {
  constructor(appId) {
    this.appId = appId;
  }

  ask(input) {
    const opts = {
      json: true,
      qs: {
        appid: this.appId,
        input: input,
        reinterpret: true
      },
      resolveWithFullResponse: true,
      uri: WOLFRAM_BASE_URL
    };
    return rp(opts);
  }

  extractResultText(xmlString) {
    try {
      const xml = this._parse(xmlString);
      const primaryPod = xml.childWithAttribute('primary', 'true');
      if (primaryPod) return this._plaintext(primaryPod);
      return _.compact(xml.childrenNamed('pod').map(this._plaintext))[0];
    } catch(e) {}
  }

  _parse(xmlString) {
    try {
      return new xmldoc.XmlDocument(xmlString);
    } catch(e) {}
  }

  _plaintext(podXml) {
    return podXml ? podXml.descendantWithPath('subpod.plaintext').val : undefined;
  };
}

module.exports = WolframService;
