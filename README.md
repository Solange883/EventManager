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
- php artisan make:mail EventRegistrationConfirmation
- composer require barryvdh/laravel-dompdf    bibliothèque  qui fournit un générateur de PDF en PHP, avec Laravel  
- Pour Sactum
     .composer require laravel/sanctum
     .php artisan vendor:publish --provider="Laravel\Sanctum\SanctumServiceProvider"

     .faire dans bootstrap/app.php
          ->withBroadcasting(
             __DIR__.'/../routes/channels.php',
            ['prefix' => 'api', 'middleware' => ['api', 'auth:sanctum']], )
     Cela applique l'authentification via Sanctum. Cela signifie que seuls les utilisateurs authentifiés (avec un token valide) pourront s'abonner aux canaux de diffusion.

     .Mettre use HasApiTokens dans le modele user,il provient du package Laravel Sanctum, et il est utilisé pour donner au modèle d'utilisateur la capacité de générer des tokens API pour l'authentification et d'autres opérations liées aux API.

##  Installation du Frontend
- cd EventManager
- ng new frontend --style=scss --skip-tests=true
- ng serve
- ng add @angular/material


