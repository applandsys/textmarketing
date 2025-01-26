<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SendLog extends Model
{
    protected $fillable = ['campaign_id', 'number_id', 'status'];
}
