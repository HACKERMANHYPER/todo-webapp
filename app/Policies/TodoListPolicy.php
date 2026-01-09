<?php

namespace App\Policies;

use App\Models\TodoList;
use App\Models\User;

class TodoListPolicy
{
    /**
     * Determine if the user can view the TodoList.
     */
    public function view(User $user, TodoList $todoList): bool
    {
        return $user->id === $todoList->user_id;
    }

    /**
     * Determine if the user can update the TodoList.
     */
    public function update(User $user, TodoList $todoList): bool
    {
        return $user->id === $todoList->user_id;
    }

    /**
     * Determine if the user can delete the TodoList.
     */
    public function delete(User $user, TodoList $todoList): bool
    {
        return $user->id === $todoList->user_id;
    }
}
