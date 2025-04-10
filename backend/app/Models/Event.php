<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Event extends Model
{
    use HasFactory;

    protected $fillable = [
        'titre',
        'description',
        'date',
        'lieu',  
        'categorie' ,
        'image',
    ];

      
       

    public function registrations()
    {
        return $this->hasMany(Registration::class);
    }
}
