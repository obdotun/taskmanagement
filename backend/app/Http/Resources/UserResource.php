<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'email' => $this->email,
            'token' => $this->createToken("Token")->plainTextToken,
            'roles' => $this->roles->pluck('name') ?? [],
            'roles.permission' => $this->getPermissionsViaRoles()->pluck('name') ?? [],
            //'permissions' => $this->getPermissions(),
        ];
    }

     /**
         * Get permissions associated with user's roles.
         *
         * @return array
         */
        protected function getPermissions()
        {
            $permissions = [];

            // Loop through user's roles and retrieve permissions
            foreach ($this->roles as $role) {
                $permissions = array_merge($permissions, $role->permissions->pluck('name')->toArray());
            }

            return $permissions;
        }
}
