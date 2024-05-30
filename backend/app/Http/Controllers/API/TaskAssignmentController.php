<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Task;
use App\Models\TaskAssignment;

class TaskAssignmentController extends Controller
{
        public function taskAssignedBy($assigned_by)
        {
           $tasks = TaskAssignment::where('assigned_by',$assigned_by)->get();
           if (!$tasks) {
                return response()->json(['message' => 'No task assigned'], 404);
           }
           return response()->json(['tasks_assigned_by' => UserResource::collection($tasks)], 200);
        }
}
