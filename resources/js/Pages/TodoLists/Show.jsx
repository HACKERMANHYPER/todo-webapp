import React from 'react';
import { Head, Link, usePage, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Show() {
    const { list } = usePage().props;
    const { post } = useForm();

    const getIconEmoji = (icon) => {
        const iconMap = {
            list: '📋',
            star: '⭐',
            check: '✓',
            rocket: '🚀',
        };
        return iconMap[icon] || '📝';
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'open':
                return 'bg-gray-100 text-gray-800';
            case 'in_progress':
                return 'bg-yellow-100 text-yellow-800';
            case 'completed':
                return 'bg-green-100 text-green-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    const getStatusLabel = (status) => {
        switch (status) {
            case 'open':
                return 'Offen';
            case 'in_progress':
                return 'In Bearbeitung';
            case 'completed':
                return 'Abgeschlossen';
            default:
                return status;
        }
    };

    const handleToggleStatus = (todo) => {
        post(`/todo-lists/${list.id}/todos/${todo.id}/toggle-status`);
    };

    return (
        <AuthenticatedLayout>
            <Head title={list.name} />

            <div className="py-12">
                <div className="max-w-4xl mx-auto sm:px-6 lg:px-8">
                    {/* Header */}
                    <div className="mb-8">
                        <div className="flex justify-between items-start mb-4">
                            <div className="flex items-center gap-3">
                                <span className="text-4xl">
                                    {getIconEmoji(list.icon)}
                                </span>
                                <div>
                                    <h1 className="text-3xl font-bold text-gray-900">
                                        {list.name}
                                    </h1>
                                    <div
                                        className="h-2 rounded-full mt-2 w-20"
                                        style={{ backgroundColor: list.color }}
                                    ></div>
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <Link
                                    href={`/todo-lists/${list.id}/edit`}
                                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                                >
                                    Bearbeiten
                                </Link>
                                <Link
                                    href="/todo-lists"
                                    className="px-4 py-2 bg-gray-300 text-gray-900 rounded-lg hover:bg-gray-400 transition"
                                >
                                    Zurück
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Todos Section */}
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg mb-6">
                        <div className="p-6">
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-2xl font-bold text-gray-900">
                                    Todos ({list.todos?.length || 0})
                                </h2>
                                <Link
                                    href={`/todo-lists/${list.id}/todos/create`}
                                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                                >
                                    + Neues Todo
                                </Link>
                            </div>

                            {list.todos && list.todos.length > 0 ? (
                                <ul className="space-y-3">
                                    {list.todos.map((todo) => (
                                        <li
                                            key={todo.id}
                                            className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition"
                                        >
                                            <div className="flex items-center gap-4 flex-1">
                                                <button
                                                    onClick={() => handleToggleStatus(todo)}
                                                    className={`flex-shrink-0 w-6 h-6 rounded-md border-2 flex items-center justify-center transition ${
                                                        todo.status === 'completed'
                                                            ? 'bg-green-500 border-green-500'
                                                            : 'border-gray-300 hover:border-green-500'
                                                    }`}
                                                >
                                                    {todo.status === 'completed' && (
                                                        <span className="text-white text-sm">✓</span>
                                                    )}
                                                </button>
                                                <div>
                                                    <p
                                                        className={`font-medium ${
                                                            todo.status === 'completed'
                                                                ? 'line-through text-gray-500'
                                                                : 'text-gray-900'
                                                        }`}
                                                    >
                                                        {todo.name}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <span
                                                    className={`text-xs px-3 py-1 rounded-full ${getStatusColor(
                                                        todo.status
                                                    )}`}
                                                >
                                                    {getStatusLabel(todo.status)}
                                                </span>
                                                <Link
                                                    href={`/todo-lists/${list.id}/todos/${todo.id}/edit`}
                                                    className="text-blue-600 hover:text-blue-800 transition"
                                                >
                                                    Bearbeiten
                                                </Link>
                                                <Link
                                                    href={`/todo-lists/${list.id}/todos/${todo.id}`}
                                                    method="delete"
                                                    as="button"
                                                    className="text-red-600 hover:text-red-800 transition"
                                                    onClick={(e) => {
                                                        if (
                                                            !window.confirm(
                                                                'Wirklich löschen?'
                                                            )
                                                        ) {
                                                            e.preventDefault();
                                                        }
                                                    }}
                                                >
                                                    Löschen
                                                </Link>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p className="text-center py-8 text-gray-500">
                                    Keine Todos vorhanden. Erstelle eins, um zu beginnen!
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Delete Button */}
                    <Link
                        href={`/todo-lists/${list.id}`}
                        method="delete"
                        as="button"
                        className="w-full px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                        onClick={(e) => {
                            if (!window.confirm('Diese TodoListe und alle Todos wirklich löschen?')) {
                                e.preventDefault();
                            }
                        }}
                    >
                        TodoListe löschen
                    </Link>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
