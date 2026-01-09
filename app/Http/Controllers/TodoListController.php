<?php

namespace App\Http\Controllers;

use App\Models\TodoList;
use Illuminate\Http\Request;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class TodoListController extends Controller
{
    use AuthorizesRequests;
    /**
     * Display a listing of all TodoLists for the authenticated user.
     */
    public function index()
    {
        $user = Auth::user();
        $lists = TodoList::where('user_id', $user->id)
            ->with('todos')
            ->get();

        return Inertia::render('TodoLists/Index', [
            'lists' => $lists,
        ]);
    }

    /**
     * Show the form for creating a new TodoList.
     */
    public function create()
    {
        return Inertia::render('TodoLists/Create');
    }

    /**
     * Store a newly created TodoList in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'color' => 'nullable|string|max:10',
            'icon' => 'nullable|string|max:50',
        ]);

        $user = Auth::user();

        TodoList::addToDoList(
            $user->id,
            $validated['name'],
            $validated['color'] ?? '#3B82F6',
            $validated['icon'] ?? 'list'
        );

        return redirect()->route('todo-lists.index')
            ->with('success', 'TodoList erstellt.');
    }

    /**
     * Display the specified TodoList.
     */
    public function show(TodoList $todoList)
    {
        $this->authorize('view', $todoList);

        $todoList->load('todos');

        return Inertia::render('TodoLists/Show', [
            'list' => $todoList,
        ]);
    }

    /**
     * Show the form for editing the specified TodoList.
     */
    public function edit(TodoList $todoList)
    {
        $this->authorize('update', $todoList);

        return Inertia::render('TodoLists/Edit', [
            'list' => $todoList,
        ]);
    }

    /**
     * Update the specified TodoList in storage.
     */
    public function update(Request $request, TodoList $todoList)
    {
        $this->authorize('update', $todoList);

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'color' => 'nullable|string|max:10',
            'icon' => 'nullable|string|max:50',
        ]);

        $todoList->update($validated);

        return redirect()->route('todo-lists.show', $todoList)
            ->with('success', 'TodoList aktualisiert.');
    }

    /**
     * Remove the specified TodoList from storage.
     */
    public function destroy(TodoList $todoList)
    {
        $this->authorize('delete', $todoList);

        $todoList->delete();

        return redirect()->route('todo-lists.index')
            ->with('success', 'TodoList gelöscht.');
    }
}
