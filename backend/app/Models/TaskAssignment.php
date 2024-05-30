<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TaskAssignment extends Model
{
    use HasFactory;

    protected $fillable = [
            'task_id',
            'assigned_to',
            'assigned_by',
            'status',
            'due_date',
        ];

        /**
         * Get the task that this assignment belongs to.
         */
        public function task()
        {
            return $this->belongsTo(Task::class);
        }

        /**
         * Get the user who is assigned to the task.
         */
        public function assignedTo()
        {
            return $this->belongsTo(User::class, 'assigned_to');
        }

        /**
         * Get the user who assigned the task.
         */
        public function assignedBy()
        {
            return $this->belongsTo(User::class, 'assigned_by');
        }
}
