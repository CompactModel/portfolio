FROM php:8.2-cli

RUN apt-get update && apt-get install -y \
    git unzip zip libicu-dev libzip-dev \
    && docker-php-ext-install pdo pdo_mysql opcache intl zip \
    && rm -rf /var/lib/apt/lists/*

COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

WORKDIR /app

ENV APP_ENV=prod APP_DEBUG=0

COPY . .

RUN COMPOSER_ALLOW_SUPERUSER=1 composer install --no-dev --optimize-autoloader \
    && mkdir -p var/cache var/log \
    && chmod -R 777 var/ \
    && chmod +x startup.sh

EXPOSE 8000
CMD ["./startup.sh"]
