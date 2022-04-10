const PromBundle = require('express-prom-bundle');

const PrometheusConfig = PromBundle({
  includePath: true,
  includeStatusCode: true,
  normalizePath: true,
  promClient: {
    collectDefaultMetrics: {},
  },
});

module.exports = PrometheusConfig;