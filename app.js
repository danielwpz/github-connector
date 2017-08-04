'use strict';

const Innjector = require('innjector');
const logger = require('winston');

const bodyParser = require('body-parser');
const compression = require('compression');

const express = require('express');
const app = express();

new Innjector(process.cwd() + '/lib', bootstrap);

function bootstrap(err, container) {
  container.resolve(function (config,
                              v1Route,
                              requestLogMiddleware,
                              responseMiddleware) {

    if (err) {
      logger.error(err);
      process.exit(1);
    }

    require(process.cwd() + '/lib/util/logger')(config);

    app.use(compression());

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    app.use(requestLogMiddleware.log);

    const v1Router = express.Router();
    v1Route.mount(v1Router);
    app.use('/v1', v1Router);

    app.use(responseMiddleware.respond);
    app.use(responseMiddleware.respondError);

    app.listen(config.express.port, function () {
      logger.notice('Server running on', config.express.port);
    });
  });
}