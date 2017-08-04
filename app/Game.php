<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Game extends Model
{
    protected $fillable = ['name', 'level', 'score', 'game_time', 'speed_time'];

    protected $guarded = ['id', 'created_at', 'updated_at'];

}
