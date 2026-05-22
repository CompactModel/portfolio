#!/bin/bash
set -e

# Write Railway env vars into .env so Symfony Dotenv can find them
{
    echo "APP_ENV=${APP_ENV:-prod}"
    [ -n "$APP_SECRET" ]    && echo "APP_SECRET=$APP_SECRET"
    [ -n "$DATABASE_URL" ]  && echo "DATABASE_URL=$DATABASE_URL"
    echo "DEFAULT_URI=https://${RAILWAY_PUBLIC_DOMAIN:-localhost}"
} > /app/.env

if [ -n "$DATABASE_URL" ] && [ -n "$APP_SECRET" ]; then
    php bin/console cache:clear --env=prod --no-debug
    php bin/console assets:install --env=prod
    php bin/console doctrine:migrations:migrate --no-interaction --env=prod
else
    echo "WARNING: DATABASE_URL or APP_SECRET not set — skipping setup"
fi

exec php -S "0.0.0.0:${PORT:-8000}" -t public/ public/router.php
