/***********************************************/
/* Imports */
/***********************************************/

const AlexaAppServer = require('alexa-app-server');


/***********************************************/
/* Server */
/***********************************************/

const server = new AlexaAppServer({
  app_dir: 'apps',
  app_root: '/alexa/',
  debug: true,
  port: 8080,
});

server.start();
