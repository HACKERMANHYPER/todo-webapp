<?php

namespace App\Http\Controllers;

use App\Models\Todo;
use App\Models\TodoList;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TodoController extends Controller
{
    use AuthorizesRequests;
    
    /**
     * Display a listing of Todos for a specific TodoList.
     */
    public function index(TodoList $todoList)
    {
        $this->authorize('view', $todoList);

        $todos = Todo::where('list_id', $todoList->id)->get();

        return Inertia::render('Todos/Index', [
            'list' => $todoList,
            'todos' => $todos,
        ]);
    }

    /**
     * Show the form for creating a new Todo.
     */
    public function create(TodoList $todoList)
    {
        $this->authorize('view', $todoList);

        return Inertia::render('Todos/Create', [
            'list' => $todoList,
        ]);
    }

    /**
     * Store a newly created Todo in storage.
     */
    public function store(Request $request, TodoList $todoList)
    {
        $this->authorize('view', $todoList);

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'status' => 'nullable|in:open,in_progress,completed',
        ]);

        Todo::addToDo(
            $todoList->id,
            $validated['name'],
            $validated['status'] ?? 'open'
        );

        return redirect()->route('todo-lists.show', $todoList)
            ->with('success', 'Todo erstellt.');
    }

    /**
     * Show the form for editing the specified Todo.
     */
    public function edit(TodoList $todoList, Todo $todo)
    {
        $this->authorize('view', $todoList);

        if ($todo->list_id !== $todoList->id) {
            abort(404);
        }

        return Inertia::render('Todos/Edit', [
            'list' => $todoList,
            'todo' => $todo,
        ]);
    }

    /**
     * Update the specified Todo in storage.
     */
    public function update(Request $request, TodoList $todoList, Todo $todo)
    {
        $this->authorize('view', $todoList);

        if ($todo->list_id !== $todoList->id) {
            abort(404);
        }

        $validated = $request->validate([
            'name' => 'nullable|string|max:255',
            'status' => 'nullable|in:open,in_progress,completed',
        ]);

        // Wenn nur Status gesendet wird (Status-Toggle), wechsle den Status
        if (!isset($validated['name']) && isset($validated['status'])) {
            $todo->status = $validated['status'];
            $todo->save();
        } else {
            // Sonst normales Update
            $validated = $request->validate([
                'name' => 'required|string|max:255',
                'status' => 'required|in:open,in_progress,completed',
            ]);
            Todo::editToDo($todo->id, $validated['name'], $validated['status']);
        }

        $todos = Todo::where('list_id', $todoList->id)->get();

        return Inertia::render('TodoLists/Show', [
            'list' => $todoList,
            'todos' => $todos,
        ]);
    }

    /**
     * Remove the specified Todo from storage.
     */
    public function destroy(TodoList $todoList, Todo $todo)
    {
        $this->authorize('view', $todoList);

        if ($todo->list_id !== $todoList->id) {
            abort(404);
        }

        $todo->delete();

        return redirect()->route('todo-lists.show', $todoList)
            ->with('success', 'Todo gelöscht.');
    }
}
