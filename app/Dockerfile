FROM php:8.2-cli

RUN apt-get update && apt-get install -y \
    git unzip zip libicu-dev libzip-dev \
    && docker-php-ext-install pdo pdo_mysql opcache intl zip \
    && rm -rf /var/lib/apt/lists/*

COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

WORKDIR /app

COPY . .

# Shim for symfony-cmd (Symfony CLI) used in composer auto-scripts.
# Errors suppressed — real cache:clear runs in startup.sh with actual env vars.
RUN printf '#!/bin/sh\nexit 0\n' > /usr/local/bin/symfony-cmd \
    && chmod +x /usr/local/bin/symfony-cmd

RUN COMPOSER_ALLOW_SUPERUSER=1 composer install --no-dev --optimize-autoloader \
    && mkdir -p var/cache var/log \
    && chmod -R 777 var/ \
    && chmod +x startup.sh

EXPOSE 8000
CMD ["./startup.sh"]
