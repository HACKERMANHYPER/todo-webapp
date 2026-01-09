import { Head, Link, usePage } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Index() {
    const { lists } = usePage().props;

    return (
        <AuthenticatedLayout>
            <Head title="Meine TodoListen" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center mb-6">
                        <h1 className="text-3xl font-bold text-gray-900">
                            Meine TodoListen
                        </h1>
                        <Link
                            href="/todo-lists/create"
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                        >
                            + Neue TodoListe
                        </Link>
                    </div>

                    {lists.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {lists.map((list) => (
                                <Link
                                    key={list.id}
                                    href={`/todo-lists/${list.id}`}
                                    className="block p-6 bg-white rounded-lg shadow hover:shadow-lg transition transform hover:scale-105"
                                >
                                    <div className="flex items-center mb-2">
                                        <span className="text-3xl mr-3">
                                            {list.icon === 'list' ? '📋' :
                                             list.icon === 'star' ? '⭐' :
                                             list.icon === 'check' ? '✓' :
                                             list.icon === 'rocket' ? '🚀' : '📝'}
                                        </span>
                                        <h2 className="text-xl font-bold text-gray-900">
                                            {list.name}
                                        </h2>
                                    </div>
                                    <div
                                        className="h-2 rounded-full mb-2"
                                        style={{
                                            backgroundColor: list.color || '#3B82F6',
                                            opacity: 0.5,
                                        }}
                                    ></div>
                                    <p className="text-sm text-gray-600">
                                        {list.todos?.length || 0} Todos
                                    </p>
                                </Link>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-12 bg-white rounded-lg shadow">
                            <p className="text-gray-500 text-lg mb-4">
                                Du hast noch keine TodoListen erstellt.
                            </p>
                            <Link
                                href="/todo-lists/create"
                                className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                            >
                                Jetzt eine erstellen
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
