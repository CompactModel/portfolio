FROM php:8.2-cli

RUN apt-get update && apt-get install -y \
    git unzip zip libicu-dev libzip-dev \
    && docker-php-ext-install pdo pdo_mysql opcache intl zip \
    && rm -rf /var/lib/apt/lists/*

COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

WORKDIR /app

COPY . .

RUN composer install --no-dev --optimize-autoloader --no-scripts \
    && mkdir -p var/cache var/log \
    && chmod -R 777 var/ \
    && chmod +x startup.sh

EXPOSE 8000
CMD ["./startup.sh"]
