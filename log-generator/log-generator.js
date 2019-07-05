const Sentry = require('@sentry/node');

Sentry.init({ dsn: 'http://65c17a5ca12c4810a267677d20452959@localhost:9000/2' });

try {
 iLikeToFail();
} catch (e) {
  Sentry.captureException(e);
}