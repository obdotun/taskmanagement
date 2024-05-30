<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Spatie\Permission\Models\Role;
use Illuminate\Http\Request;

class RoleController extends Controller
{
    public function index()
    {
        // Retrieve the list of roles
        $roles = Role::all();

        return response()->json(['roles' => $roles], 200);
    }

    public function show($id)
    {
        // Return a specific role
        $role = Role::find($id);

        if (!$role) {
            return response()->json(['message' => 'Role not found'], 404);
        }

        return response()->json(['role' => $role], 200);
    }

    public function store(Request $request)
    {
        // Store a new role
         $role = Role::create([
         'name' => $request->name,
         'guard_name' => 'web',
         ]);
         return response()->json(['message' => 'Role created successfully', 'role' => $role], 201);
    }

    public function update(Request $request, $id)
    {
        // Update an existing role
        $role = Role::findOrFail($id);

        // Validate the request data
        $validatedData = $request->validate([
            'name' => 'required|string|max:255'
        ]);

        // Update the role
        $role->update($validatedData);

        return response()->json(['message' => 'Role updated successfully', 'role' => $role], 200);
    }

    public function destroy($id)
        {
            try {
                $role = Role::findById($id, 'web'); // Specify the guard name here
                if ($role) {
                    $role->delete();
                    return response()->json(['success' => 'Role deleted successfully.']);
                } else {
                    return response()->json(['error' => 'Role not found.'], 404);
                }
            } catch (\Exception $e) {
                return response()->json(['error' => 'Failed to delete role: ' . $e->getMessage()], 500);
            }
        }
}
