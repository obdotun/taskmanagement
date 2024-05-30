<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use App\Http\Helpers\Helper;
use App\Models\User;
use App\Http\Resources\UserResource;

class UserController extends Controller
{
    public function index()
        {
            // Retrieve the list of users
            $users = User::orderBy('id', 'desc')->get();

           // return response()->json(['users' => $users], 200);
            return UserResource::collection($users);
        }

    public function show($id)
    {
        // Retrieve the user by ID
        $user = User::find($id);

        if (!$user) {
            return response()->json(['message' => 'User not found'], 404);
        }

//        return response()->json(['user' => $user], 200);
         return new UserResource($user);
    }

    public function store(Request $request)
    {
        // Validate the request data
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8',
            // Add more validation rules as needed
        ]);

        // Create the user
        $user = User::create([
            'name' => $validatedData['name'],
            'email' => $validatedData['email'],
            'password' => Hash::make($validatedData['password']),
            // Add more fields as needed
        ]);

        return response()->json(['message' => 'User created successfully', 'user' => new UserResource($user)], 201);
    }

    public function updatePassword(Request $request, $id)
    {
            $user = User::findOrFail($id);

            $validatedData = $request->validate([
                'password' => 'required|string|min:8'
            ]);

            $hashedPassword = Hash::make($validatedData['password']);

            // Update the user's password
            $user->update(['password' => $hashedPassword]);

            return response()->json(['message' => 'Password updated successfully'], 200);
    }

    public function update(Request $request, $id)
    {
        // Update an existing user
        $user = User::findOrFail($id);

        // Validate the request data
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users,email,' . $user->id,
            // Add more validation rules as needed
        ]);

        // Update the user
        $user->update($validatedData);

        return response()->json(['message' => 'User updated successfully', 'user' => new UserResource($user)], 200);
    }

    public function destroy($id)
    {
        $user = User::findOrFail($id);
        $user->delete();

        return response()->json(['message' => 'User deleted successfully'], 200);
    }
}
