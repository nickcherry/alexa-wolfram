/***********************************************/
/* Imports */
/***********************************************/

const _ = require('lodash');
const parser = require('xml2json');
const rp = require('request-promise');

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

  extractResultText(xml) {
    try {
      const pods = this._parse(xml).queryresult.pod;
      if (!pods) return;
      const primary = this._plaintext(_.find(pods, { primary: 'true' }));
      return primary ? primary : _.compact(pods.map(this._plaintext))[0];
    } catch(e) {}
  }

  _parse(xml) {
    try {
      return parser.toJson(xml, { object: true });
    } catch(e) {}
  }

  _plaintext(pod) {
    if (!pod || !pod.subpod) return;
    return pod.subpod.plaintext;
  };
}

module.exports = WolframService;
