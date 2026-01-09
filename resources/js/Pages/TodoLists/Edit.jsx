import { Head, Link, usePage, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Edit() {
    const { list } = usePage().props;
    const { data, setData, put, errors, processing } = useForm({
        name: list.name,
        color: list.color,
        icon: list.icon,
    });

    const icons = [
        { value: 'list', emoji: '📋', label: 'Liste' },
        { value: 'star', emoji: '⭐', label: 'Stern' },
        { value: 'check', emoji: '✓', label: 'Haken' },
        { value: 'rocket', emoji: '🚀', label: 'Rakete' },
    ];

    const colors = [
        '#3B82F6',
        '#EF4444',
        '#10B981',
        '#F59E0B',
        '#8B5CF6',
        '#EC4899',
    ];

    const handleSubmit = (e) => {
        e.preventDefault();
        put(`/todo-lists/${list.id}`);
    };

    return (
        <AuthenticatedLayout>
            <Head title={`${list.name} bearbeiten`} />

            <div className="py-12">
                <div className="max-w-2xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <h1 className="text-2xl font-bold mb-6">TodoListe bearbeiten</h1>

                            <form onSubmit={handleSubmit}>
                                {/* Name */}
                                <div className="mb-6">
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                                        Name *
                                    </label>
                                    <input
                                        id="name"
                                        type="text"
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                        className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                            errors.name ? 'border-red-500' : 'border-gray-300'
                                        }`}
                                    />
                                    {errors.name && (
                                        <p className="mt-1 text-sm text-red-500">{errors.name}</p>
                                    )}
                                </div>

                                {/* Icon */}
                                <div className="mb-6">
                                    <label className="block text-sm font-medium text-gray-700 mb-3">
                                        Icon
                                    </label>
                                    <div className="flex gap-3">
                                        {icons.map((icon) => (
                                            <button
                                                key={icon.value}
                                                type="button"
                                                onClick={() => setData('icon', icon.value)}
                                                className={`text-3xl p-2 rounded-lg border-2 transition ${
                                                    data.icon === icon.value
                                                        ? 'border-blue-500 bg-blue-50'
                                                        : 'border-gray-300 hover:border-gray-400'
                                                }`}
                                                title={icon.label}
                                            >
                                                {icon.emoji}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Color */}
                                <div className="mb-6">
                                    <label className="block text-sm font-medium text-gray-700 mb-3">
                                        Farbe
                                    </label>
                                    <div className="flex gap-3">
                                        {colors.map((color) => (
                                            <button
                                                key={color}
                                                type="button"
                                                onClick={() => setData('color', color)}
                                                className={`w-10 h-10 rounded-lg border-2 transition ${
                                                    data.color === color
                                                        ? 'border-gray-900 scale-110'
                                                        : 'border-gray-300'
                                                }`}
                                                style={{ backgroundColor: color }}
                                            />
                                        ))}
                                    </div>
                                </div>

                                {/* Buttons */}
                                <div className="flex gap-3">
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 transition"
                                    >
                                        {processing ? 'Wird gespeichert...' : 'Speichern'}
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
