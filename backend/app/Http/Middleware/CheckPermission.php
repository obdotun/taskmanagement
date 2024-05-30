<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class CheckPermission
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure(\Illuminate\Http\Request): (\Illuminate\Http\Response|\Illuminate\Http\RedirectResponse)  $next
     * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse
     */
    public function handle(Request $request, Closure $next)
    {
        // Check if the authenticated user has the permission directly
        if (auth()->user()->hasPermissionTo($permission)) {
            return $next($request);
        }

        // Check if the authenticated user has the permission through roles
        foreach (auth()->user()->roles as $role) {
            if ($role->hasPermissionTo($permission)) {
                return $next($request);
            }
        }

        // If neither the user nor their roles have the permission, abort with 403 Unauthorized
        abort(403, 'Unauthorized');
    }
}
