"use strict"

/***********************************************/
/* Imports */
/***********************************************/

const fs = require('fs');


/***********************************************/
/* Config */
/***********************************************/

const secrets = JSON.parse(fs.readFileSync(__dirname + '/secrets.json'));

class Config {
  static get wolframAppId() {
    return secrets.wolframAppId;
  }
  static get bugsnagApiKey() {
    return secrets.bugsnagApiKey;
  }
}

module.exports = Config;
