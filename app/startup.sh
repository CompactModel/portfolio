#!/bin/bash

echo "=== Startup BEGIN ==="

# Write env vars to .env
{
    echo "APP_ENV=${APP_ENV:-prod}"
    [ -n "$APP_SECRET" ]   && echo "APP_SECRET=$APP_SECRET"
    [ -n "$DATABASE_URL" ] && echo "DATABASE_URL=$(echo "$DATABASE_URL" | xargs)"
    echo "DEFAULT_URI=https://${RAILWAY_PUBLIC_DOMAIN:-localhost}"
} > /app/.env

echo "=== .env written ==="

# Compile .env into .env.local.php
COMPOSER_ALLOW_SUPERUSER=1 composer dump-env prod && echo "=== dump-env OK ===" || echo "=== dump-env FAILED ==="

# Cache and assets (non-fatal)
php bin/console cache:clear --env=prod --no-debug && echo "=== cache:clear OK ===" || echo "=== cache:clear FAILED ==="
php bin/console assets:install --env=prod && echo "=== assets OK ===" || echo "=== assets FAILED ==="

# Migrations (non-fatal)
if [ -n "$DATABASE_URL" ]; then
    php bin/console doctrine:migrations:migrate --no-interaction --env=prod && echo "=== migrations OK ===" || echo "=== migrations FAILED ==="
fi

echo "=== Starting PHP server on port ${PORT:-8080} ==="
exec php -S "0.0.0.0:${PORT:-8080}" -t public/ public/router.php
