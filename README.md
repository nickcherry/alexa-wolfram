# Alexa Wolfram

## Dependencies

To install required Node dependencies, run the following from the project root:

```shell
  npm install
```

## Credentials

In order to connect to Wolfram Alpha's API, you'll need to [create a developer account](https://developer.wolframalpha.com/portal/apisignup.html?_ga=1.97656918.812542650.1472253586) and register a new app. Once you've obtained an App ID, you'll want to copy the template secrets file:

```shell
cp app/wolfram/secrets.template.json app/wolfram/secrets.json
```

Then replace the placeholder API key with the one provided by Wolfram Alpha.


## Development Server

To start the [alexa-app-server](https://github.com/matt-kruse/alexa-app-server), run the following from the project root:

```shell
npm start
```

## Tests

To run the test suite, run the following from the project root:

```shell
npm test
```

To run the test suite with debugging enabled, run the following from the project root:

```shell
npm run test-debug
```
