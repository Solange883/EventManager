<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

class AdminUserSeeder extends Seeder
{
    public function run(): void
    {
        User::updateOrCreate(
            ['email' => 'admin@example.com'], // si tu relances plusieurs fois, pas de doublon
            [
                'name' => 'Solange Diouf',
                'email' => 'admin@example.com',
                'password' => Hash::make('password'), // tu peux changer le mot de passe ici
                'role' => 'admin' // très important : ce champ doit exister dans ta table users
            ]
        );
    }
}
