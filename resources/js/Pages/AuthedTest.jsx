import React from 'react'
import { Head } from '@inertiajs/react'

export default function AuthedTest() {
    return (
        <div className="min-h-screen bg-white p-6">
            <Head title="Authentifiziert" />
            <h1 className="text-3xl font-bold text-gray-900">Authentifiziert!</h1>
            <p className="mt-4 text-gray-600">Inertia.js is working!</p>
            <p className="mt-4 text-gray-600">Sven stinkt immernoch heftig</p>
        </div>
    )
}
