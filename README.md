# EventManager
Une application web fullstack développée avec **Laravel (Back-end)** et **Angular (Front-end)**.

## Prérequis

Assure-toi d’avoir installé les outils suivants :

- PHP >= 8.x
- Composer
- Node.js et npm
- Angular CLI
- MySQL

##  Installation du Backend
- cd EventManager
- composer create-project --prefer-dist laravel/laravel backend
- Configure ton fichier .env avec les informations de ta base de données 
- php artisan serve

##  Installation du Frontend
- cd EventManager
- ng new frontend --style=scss --skip-tests=true
- ng serve

php artisan make:seeder AdminUserSeeder 