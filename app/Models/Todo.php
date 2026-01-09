<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Todo extends Model
{
    protected $table = 'todo';

    protected $fillable = [
        'list_id',
        'name',
        'status',
    ];

    /**
     * Get the TodoList that this Todo belongs to.
     */
    public function list(): BelongsTo
    {
        return $this->belongsTo(TodoList::class, 'list_id');
    }

    public static function addToDo($list_id, $name, $status)
    {
        $todo = new Todo();
        $todo->list_id = $list_id;
        $todo->name = $name;
        $todo->status = $status ?? 'open';
        $todo->save();
    }
    public static function editToDo($todo_id, $name, $status)
    { 
        $todo = Todo::find($todo_id);
        if ($todo) {
            $todo->name = $name;
            $todo->status = $status;
            $todo->save();
        }
    }

    public static function getTodo($list_id)
    {
        return Todo::where('list_id', $list_id)->get();
    }
}
