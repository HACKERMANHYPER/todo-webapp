import React from 'react';
import { Link, usePage } from '@inertiajs/react';

export default function AuthenticatedLayout({ children }) {
    const { auth } = usePage().props;

    return (
        <div className="min-h-screen bg-gray-100">
            {/* Navigation */}
            <nav className="bg-white shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <Link
                            href="/"
                            className="text-xl font-bold text-blue-600 hover:text-blue-700"
                        >
                            📋 Todo Webapp
                        </Link>
                        <div className="flex items-center gap-6">
                            <span className="text-gray-600">
                                Hallo, {auth.user.name}!
                            </span>
                            <Link
                                href="/logout"
                                method="post"
                                as="button"
                                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                            >
                                Logout
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <main>
                {children}
            </main>
        </div>
    );
}
