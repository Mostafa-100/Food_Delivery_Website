<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Cart extends Model
{

    protected $fillable = [
        'user_id',
    ];

    public function dishes()
    {
        return $this->hasMany(Dish::class);
    }
}
