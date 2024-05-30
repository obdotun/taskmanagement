<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Task;
use Illuminate\Http\Request;
use App\Http\Resources\TaskResource;

class TaskController extends Controller
{
    public function index()
    {
        // Retrieve the list of tasks
        $tasks = Task::orderBy('id', 'desc')
            ->with('user') // Eager loading the user relationship
            ->get();

        // Now each task object will contain the associated user's information
        foreach ($tasks as $task) {
            $username = $task->user->name; // Assuming 'name' is the attribute representing the username
            // You can use $username as needed
        }

        //return response()->json(['tasks' => TaskResource::collection($tasks)], 200);
        return response()->json(['tasks' => 'hello'], 200);
    }

    public function show($id)
    {
        // Return a specific task
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'due_date' => 'nullable|date|date_format:Y-m-d',
        ]);

        $task = new Task();
        $task->title = $request->title;
        $task->description = $request->description;
        $task->due_date = $request->due_date;
        $task->user_id = $request->user_id;
        $task->status = $request->status;
        $task->save();

        return response()->json(['message' => 'Task created successfully'], 201);
    }

    public function update(Request $request, $id)
    {
        // Update an existing task
    }

    public function destroy($id)
    {
        // Delete a task
    }
}

