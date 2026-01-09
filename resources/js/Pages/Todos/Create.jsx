import { Head, Link, usePage, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Create() {
    const { list } = usePage().props;
    const { data, setData, post, errors, processing } = useForm({
        name: '',
        status: 'open',
    });

    const statuses = [
        { value: 'open', label: 'Offen' },
        { value: 'in_progress', label: 'In Bearbeitung' },
        { value: 'completed', label: 'Abgeschlossen' },
    ];

    const handleSubmit = (e) => {
        e.preventDefault();
        post(`/todo-lists/${list.id}/todos`);
    };

    return (
        <AuthenticatedLayout>
            <Head title="Neues Todo" />

            <div className="py-12">
                <div className="max-w-2xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <h1 className="text-2xl font-bold mb-6">
                                Neues Todo in "{list.name}"
                            </h1>

                            <form onSubmit={handleSubmit}>
                                {/* Name */}
                                <div className="mb-6">
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                                        Todo-Name *
                                    </label>
                                    <input
                                        id="name"
                                        type="text"
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                        placeholder="z.B. Einkaufen gehen"
                                        className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                            errors.name ? 'border-red-500' : 'border-gray-300'
                                        }`}
                                    />
                                    {errors.name && (
                                        <p className="mt-1 text-sm text-red-500">{errors.name}</p>
                                    )}
                                </div>

                                {/* Status */}
                                <div className="mb-6">
                                    <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-2">
                                        Status
                                    </label>
                                    <select
                                        id="status"
                                        value={data.status}
                                        onChange={(e) => setData('status', e.target.value)}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    >
                                        {statuses.map((status) => (
                                            <option key={status.value} value={status.value}>
                                                {status.label}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                {/* Buttons */}
                                <div className="flex gap-3">
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-400 transition"
                                    >
                                        {processing ? 'Wird erstellt...' : 'Erstellen'}
                                    </button>
                                    <Link
                                        href={`/todo-lists/${list.id}`}
                                        className="px-6 py-2 bg-gray-300 text-gray-900 rounded-lg hover:bg-gray-400 transition"
                                    >
                                        Abbrechen
                                    </Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
