<?php

namespace App\Http\Controllers\API;
use Spatie\Permission\Middleware\PermissionMiddleware;

use App\Http\Controllers\Controller;
use App\Models\Task;
use Illuminate\Http\Request;
use App\Models\TaskAssignment;
use App\Http\Resources\TaskResource;
use Illuminate\Support\Facades\Auth;
//use App\Models\User;

class TaskController extends Controller
{

    public function index()
    {

    $user = Auth::user();

            // Check if the user has the 'employee' role
            if ($user->hasRole('admin')) {
                // If the user is an employee, return all tasks
                $tasks = Task::all();
            } else {
                // Otherwise, return tasks created by the authenticated user
                $tasks = Task::where('user_id', $user->id)->get();
            }

            // Check if tasks exist
            if ($tasks->isEmpty()) {
                return response()->json(['message' => 'No tasks found.'], 404);
            }

            // Return the tasks
            return response()->json(['tasks' => TaskResource::collection($tasks)], 200);
    }

    public function getMyTasks()
    {
        // Fetch tasks created by the authenticated user
        $tasks = Task::where('user_id', Auth::id())->get();

        // Check if tasks exist for the authenticated user
        if ($tasks->isEmpty()) {
            return response()->json(['message' => 'No tasks found for this user.'], 404);
        }

        // Return the tasks
        return response()->json($tasks, 200);
    }

    public function show($id)
    {
        $task = Task::findOrFail($id);
        if(!$task){
            return response()->json(['message' => 'Task not found'], 404);
        }

        return response()->json(['task' => $task], 200);
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'user_id' => 'required|int',
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'due_date' => 'nullable|date|date_format:Y-m-d',
            // Add more validation rules as needed
        ]);

        // Create the task with the provided user ID
        $task = Task::create([
            'user_id' => $validatedData['user_id'],
            'title' => $validatedData['title'],
            'description' => $validatedData['description'],
            'due_date' => $validatedData['due_date'],
            // Add other fields as needed
        ]);

        // Return the newly created task
        return new TaskResource($task);
    }

    public function update(Request $request, $id)
    {
        // Find the task by ID
        $task = Task::findOrFail($id);

        // Validate the incoming request data
        $validatedData = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'due_date' => 'nullable|date|date_format:Y-m-d',
        ]);

        // Update the task attributes
        $task->title = $validatedData['title'];
        $task->description = $validatedData['description'];
        $task->due_date = $validatedData['due_date'];

        // Save the updated task
        $task->save();

        // Return the updated task
        return new TaskResource($task);
    }

    public function destroy($id)
    {
        $task = Task::findOrFail($id);
        $task->delete();

        return response()->json(['message' => 'Task deleted successfully'], 200);
    }

    public function assignTask(Request $request)
    {
        // Check if the user has permission to assign tasks
        if (!$request->user()->hasPermissionTo('assign task')) {
            abort(403, 'Unauthorized action.');
        }

        // Logic for task assignment
        $taskAssignment = new TaskAssignment();
        $taskAssignment->task_id = $request->task_id;
        $taskAssignment->user_id = $request->user_id;
        $taskAssignment->save();

        return response()->json(['message' => 'Task assigned successfully']);
    }

}
