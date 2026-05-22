#!/bin/bash
set -e

php bin/console cache:clear --env=prod --no-debug
php bin/console assets:install --env=prod
php bin/console doctrine:migrations:migrate --no-interaction --env=prod

exec php -S "0.0.0.0:${PORT:-8000}" -t public/ public/router.php
