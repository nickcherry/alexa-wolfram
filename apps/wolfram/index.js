"use strict"

/***********************************************/
/* Settings */
/***********************************************/

module.change_code = 1;


/***********************************************/
/* Imports */
/***********************************************/

const alexa = require('alexa-app');
const app = new alexa.app('wolfram');
const bugsnag = require("bugsnag");

const Config = require('./config');
const WolframService = require('./wolfram_service');


/***********************************************/
/* Skill */
/***********************************************/

const wolfram = new WolframService(Config.wolframAppId);

bugsnag.register(Config.bugsnagApiKey);
bugsnag.autoNotify({ context: 'askWolfram' }, () => {
  app.intent('askWolfram',
    {
      slots: {
        query: 'LITERAL'
      }
    }, (req, res) => {
      const query = req.slot('query');
      const handleError = (err) => {
        res.say("Well, shit. Something went wrong.").send()
      };
      wolfram.ask(query)
        .then((wolframResponse) => {
          const answer = wolfram.extractResultText(wolframResponse.body);
          answer ? res.say(answer).send() : handleError();
        })
        .catch(handleError);
      return false; // returning false tells alexa-app this is an async request
    }
  );
});

/***********************************************/
/* Exports */
/***********************************************/

module.exports = app;
