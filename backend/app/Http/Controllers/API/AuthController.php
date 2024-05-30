<?php
namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Helpers\Helper;
use App\Http\Requests\LoginRequest;
use App\Http\Requests\RegisterRequest;
use App\Http\Resources\UserResource;
use Spatie\Permission\Models\Role;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function login(LoginRequest $request)
    {
        // Attempt to login user
        if (!Auth::attempt($request->only('email', 'password'))) {
            return response()->json(['message' => 'Email or password incorrect'], 401);
        }

        // Send response
        return new UserResource(auth()->user());
    }

    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json(['message' => 'Successfully logged out'], 200);
    }

    public function register(RegisterRequest $request)
    {
        try {
            // Register user
            $user = User::create([
                'name' => $request->name,
                'email' => $request->email,
                'password' => Hash::make($request->password)
            ]);

            // Retrieve the 'user' role
            $userRole = Role::where('name', 'user')->first();
            if ($userRole) {
                $user->assignRole($userRole);
            }

            // Return the user resource
            return new UserResource($user);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Registration failed'], 500);
        }
    }


}
