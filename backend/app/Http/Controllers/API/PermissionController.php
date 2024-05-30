<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Spatie\Permission\Models\Permission;
use Illuminate\Http\Request;

class PermissionController extends Controller
{
    public function index()
    {
        // Return all permissions
        $permissions = Permission::all();
        return response()->json(['permissions' => $permissions], 200);
    }

    public function show($id)
    {
        // Return a specific permission
        $permission = Permission::find($id);
       if (!$permission) {
            return response()->json(['message' => 'Permission not found'], 404);
       }

       return response()->json(['permission' => $permission], 200);
    }

    public function store(Request $request)
    {
        // Store a new permission
         $permission = Permission::create(['name' => $request->name,'guard_name' => 'web']);
         return response()->json(['message' => 'Permission created successfully', 'permission' => $permission], 201);
    }

    public function update(Request $request, $id)
    {
        // Update an existing permission
        $permission = Permission::findOrFail($id);

        // Validate the request data
        $validatedData = $request->validate([
            'name' => 'required|string|max:255'
        ]);

        // Update the permission
        $permission->update($validatedData);
        return response()->json(['message' => 'Permission updated successfully', 'permission' => $permission], 200);
    }

    public function destroy($id)
    {
        // Delete a permission
        $permission = Permission::findOrFail($id);
        $permission->delete();

        return response()->json(['message' => 'Permission deleted successfully'], 200);
    }
}
