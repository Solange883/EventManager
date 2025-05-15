# Image PHP avec FPM (Laravel 12 fonctionne avec PHP 8.1+)
FROM php:8.2-fpm

# Installer quelques extensions nécessaires pour Laravel
RUN docker-php-ext-install pdo pdo_mysql

# Copier les fichiers du projet dans le conteneur
WORKDIR /var/www
COPY . .

# Installer Composer
RUN curl -sS https://getcomposer.org/installer | php && \
    mv composer.phar /usr/local/bin/composer

# Installer les dépendances Laravel
RUN composer install

# Donner les bons droits
RUN chmod -R 775 storage bootstrap/cache

# Exposer le port 8000 (artisan serve)
EXPOSE 8000

# Démarrer Laravel (dev)
CMD ["php", "artisan", "serve", "--host=0.0.0.0", "--port=8000"]
