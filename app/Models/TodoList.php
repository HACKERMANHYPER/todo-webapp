<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class TodoList extends Model
{
    protected $table = 'todo_lists';

    protected $fillable = [
        'user_id',
        'name',
        'color',
        'icon',
    ];

    /**
     * Get the user that owns this TodoList.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get all todos for this TodoList.
     */
    public function todos(): HasMany
    {
        return $this->hasMany(Todo::class, 'list_id');
    }

    public static function addToDoList($user_id, $name, $color, $icon)
    {
        $todoList = new TodoList();
        $todoList->user_id = $user_id;
        $todoList->name = $name;
        $todoList->color = $color;
        $todoList->icon = $icon;
        $todoList->save();
    }

    public static function getTodoList($user_id)
    {
        return TodoList::where('user_id', $user_id)->get();
    }
}
