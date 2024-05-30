<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\TaskController;
use App\Http\Controllers\API\UserController;
use App\Http\Controllers\API\RoleController;
use App\Http\Controllers\API\PermissionController;
use App\Http\Controllers\API\AuthController;
use App\Http\Resources\UserResource;

// Middleware for permission to create tasks
Route::middleware(['permission:create task'])->group(function () {
    // Routes accessible only to users with the "create task" permission
});

/////////////// User Login API Start ////////////////////////

// Login Routes
Route::post('/login', [AuthController::class, 'Login']);

// Register Routes
Route::post('/register', [AuthController::class, 'Register']);

// Forget Password Routes
Route::post('/forgetpassword', [AuthController::class, 'ForgetPassword']);

// Reset Password Routes
Route::post('/resetpassword', [AuthController::class, 'ResetPassword']);

// Current User Route
Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return new UserResource(auth()->user());
});

// Logout Route
Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');

// Authenticated routes
Route::middleware('auth:sanctum')->group(function () {

    // Admin routes
    Route::group(['middleware' => ['role:admin']], function () {
        // User routes
        Route::get('/users', [UserController::class, 'index']);
        Route::get('/users/{id}', [UserController::class, 'show']);
        Route::post('/users', [UserController::class, 'store']);

        Route::delete('/users/{id}', [UserController::class, 'destroy']);

        // Permission routes
        Route::get('/permissions', [PermissionController::class, 'index']);
        Route::get('/permissions/{id}', [PermissionController::class, 'show']);
        Route::post('/permissions', [PermissionController::class, 'store']);
        Route::put('/permissions/{id}', [PermissionController::class, 'update']);
        Route::delete('/permissions/{id}', [PermissionController::class, 'destroy']);

        // Role routes
        Route::get('/roles', [RoleController::class, 'index']);
        Route::get('/roles/{id}', [RoleController::class, 'show']);
        Route::post('/roles', [RoleController::class, 'store']);
        Route::put('/roles/{id}', [RoleController::class, 'update']);
        Route::delete('/roles/{id}', [RoleController::class, 'destroy']);
    });

    // Routes for admin, user, and employee roles
    Route::group(['middleware' => ['role:admin|user|employee']], function () {
        Route::post('/tasks', [TaskController::class, 'store']);
        Route::put('/users/{id}', [UserController::class, 'update']);
                        Route::put('/users/{id}/updatepassword', [UserController::class, 'updatePassword']);
    });

    // Routes for admin and employee roles
    Route::group(['middleware' => ['role:admin|employee']], function () {
        // Task routes
        Route::get('/tasks', [TaskController::class, 'index']);
        Route::get('/tasks/{id}', [TaskController::class, 'show']);
        Route::put('/tasks/{id}', [TaskController::class, 'update']);
        Route::delete('/tasks/{id}', [TaskController::class, 'destroy']);
        Route::get('/tasks/mytasks', [TaskController::class, 'getMyTasks']);


    });

});
