const Sentry = require('@sentry/node');

Sentry.init({ dsn: 'http://localhost:9000/sentry/nodetest' });

try {
 iLikeToFail();
} catch (e) {
  Sentry.captureException(error);
}