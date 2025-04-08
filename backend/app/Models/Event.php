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
    'categorie' , ];

      
       

    public function registrations()
    {
        return $this->belongsToMany(User::class, 'registrations', 'event_id', 'user_id');
    }
}
