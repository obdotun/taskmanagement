<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    use HasFactory;

    protected $fillable = [
            'user_id',
            'title',
            'description',
            'status',
            'due_date',
        ];

        /**
         * Get the user who owns the task.
         */
        public function user()
        {
            return $this->belongsTo(User::class);
        }
}
