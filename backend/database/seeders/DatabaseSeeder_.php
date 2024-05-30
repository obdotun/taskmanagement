<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class DatabaseSeeder extends Seeder
{

    /**
     * List of applications to add.
*/
    private $permissions = [
        'role-list',
        'role-create',
        'role-edit',
        'role-delete',
        'task-list',
        'task-create',
        'task-edit',
        'task-delete'
    ];




    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        foreach ($this->permissions as $permission) {
            Permission::create(['name' => $permission]);
        }

        // Create admin User and assign the role to him.
        $user = User::create([
            'name' => 'daniel Ejimadu',
            'email' => 'test@example.com',
            'password' => Hash::make('password')
        ]);

        $role = Role::create(['name' => 'Admin']);

        $permissions = Permission::pluck('id', 'id')->all();

        $role->syncPermissions($permissions);

        $user->assignRole([$role->id]);
/*
        // Create roles
            Role::create(['name' => 'admin']);
            Role::create(['name' => 'manager']);
            Role::create(['name' => 'employee']);

            // Create permissions
            Permission::create(['name' => 'create-task']);
            Permission::create(['name' => 'edit-task']);
            Permission::create(['name' => 'delete-task']);
            Permission::create(['name' => 'list-task']);

            $role = Role::findById(1); // admin role

            $permission = Permission::findById(1); // create task permission

            $role->givePermissionTo($permission);*/
    }
}
