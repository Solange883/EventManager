FROM php:8.2-fpm
RUN docker-php-ext-install pdo pdo_mysql
WORKDIR /var/www
COPY . .
RUN curl -sS https://getcomposer.org/installer | php && \
    mv composer.phar /usr/local/bin/composer
RUN composer install
RUN chmod -R 775 storage bootstrap/cache
EXPOSE 8000
CMD ["php", "artisan", "serve", "--host=0.0.0.0", "--port=8000"]
