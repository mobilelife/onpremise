# Sentry On-Premise - Edited version for workstation development (WIP)


Official bootstrap for running your own [Sentry](https://sentry.io/) with [Docker](https://www.docker.com/).

## Requirements

 * Docker 1.10.0+
 * Compose 1.17.0+ _(optional)_
 
 ## Minimum Hardware Requirements:
 
 * You need at least 3GB Ram

## Up and Running

### Installation
1. Create folders for volumes
 * $HOME/volumes/vol-sentry-data
 * $HOME/volumes/vol-sentry-postgres
2. `docker-compose --verbose build` - Build and tag the Docker services
3. `docker-compose run --rm web config generate-secret-key` - Generate a secret key.
    Add it to `.env` as `SENTRY_SECRET_KEY`.
4. `docker-compose run --rm web upgrade` - Build the database.
    Use the interactive prompts to create a user account.
5. `docker-compose up -d` - Lift all services (detached/background mode).
6. Access your instance at `localhost:9000`, when prompted for an admin email, give a real email (if you want to test errors).

### Generate an error
1. In Sentry, click 'Projects' and 'Add new ...' --> 'Project' (or navigate to http://localhost:9000/organizations/sentry/projects/new/)
2. Choose NodeJS, for the example call the project 'Nodetest' and create it.
3. Select your project, go to 'Settings' --> 'Client Keys (DSN)' (or navigate to http://localhost:9000/settings/sentry/projects/nodetest/keys/)
4. Copy the 'DSN' key and edit /log-generator/log-generator.js to use this key.
5. In the terminal, go to /log-generator and run 'npm i'
6. Run 'node log-generator.js' to trigger an error and log it to Sentry.

You can check out the error in Sentry, or check your email.

You should have an email saying something like:
```
Exception

ReferenceError: iLikeToFail is not defined
  File "/Users/:your-user:/sunday/onpremise/log-generator/log-generator.js", line 6, in Object.<anonymous>
    iLikeToFail();
...
(2 additional frame(s) were not displayed)
User

IP Address:	172.19.0.1
```

## Securing Sentry with SSL/TLS

If you'd like to protect your Sentry install with SSL/TLS, there are
fantastic SSL/TLS proxies like [HAProxy](http://www.haproxy.org/)
and [Nginx](http://nginx.org/).

## Updating Sentry

Updating Sentry using Compose is relatively simple. Just use the following steps to update. Make sure that you have the latest version set in your Dockerfile. Or use the latest version of this repository.

Use the following steps after updating this repository or your Dockerfile:
```sh
docker-compose build --pull # Build the services again after updating, and make sure we're up to date on patch version
docker-compose run --rm web upgrade # Run new migrations
docker-compose up -d # Recreate the services
```

## Resources

 * [Documentation](https://docs.sentry.io/server/installation/docker/)
 * [Bug Tracker](https://github.com/getsentry/onpremise)
 * [Forums](https://forum.sentry.io/c/on-premise)
 * [IRC](irc://chat.freenode.net/sentry) (chat.freenode.net, #sentry)
