<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class PermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // Create roles
            $adminRole = Role::create(['name' => 'admin']);
            $employeeRole = Role::create(['name' => 'employee']);
            $userRole = Role::create(['name' => 'user']);

            // Create permissions
            $createTaskPermission = Permission::create(['name' => 'create task']);
            $editTaskPermission = Permission::create(['name' => 'edit task']);
            $deleteTaskPermission = Permission::create(['name' => 'delete task']);

            // Create permissions for task assignments
            $assignTaskPermission = Permission::create(['name' => 'assign task']);

            // Assign permissions to roles
            $adminRole->syncPermissions([$createTaskPermission, $editTaskPermission, $deleteTaskPermission,$assignTaskPermission]);
            $employeeRole->syncPermissions([$createTaskPermission, $editTaskPermission,$assignTaskPermission]);
            $userRole->syncPermissions([$createTaskPermission]);

            // Create admin User and assign the role to him.
                    $user = User::create([
                        'name' => 'daniel Ejimadu',
                        'email' => 'admin@example.com',
                        'password' => Hash::make('password')
                    ]);

            $user->assignRole('admin'); // Example for assigning role to a user

            // Create admin User and assign the role to him.
                $user = User::create([
                    'name' => 'employee',
                    'email' => 'employee@example.com',
                    'password' => Hash::make('password')
                ]);

            $user->assignRole('employee'); // Example for assigning role to a user

            // Create admin User and assign the role to him.
                $user = User::create([
                    'name' => 'user',
                    'email' => 'user@example.com',
                    'password' => Hash::make('password')
                ]);

            $user->assignRole('user'); // Example for assigning role to a user
    }
}
