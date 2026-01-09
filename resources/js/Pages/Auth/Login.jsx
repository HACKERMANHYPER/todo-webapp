import { Head, useForm } from '@inertiajs/react'

export default function Login() {
    const { data, setData, post, errors, processing } = useForm({
        email: '',
        password: '',
    })

    const submit = (e) => {
        e.preventDefault()
        post('/login')
    }

    return (
        <div className="min-h-screen bg-white p-6">
            <Head title="Login" />
            <div className="max-w-md mx-auto">
                <h1 className="text-3xl font-bold text-gray-900 mb-6">Anmelden</h1>
                
                <form onSubmit={submit} className="space-y-4">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">E-Mail</label>
                        <input
                            id="email"
                            type="email"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        />
                        {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Passwort</label>
                        <input
                            id="password"
                            type="password"
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        />
                        {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
                    </div>

                    <button
                        type="submit"
                        disabled={processing}
                        className="w-full bg-blue-600 text-white px-4 py-2 rounded-md font-medium hover:bg-blue-700 disabled:bg-gray-400"
                    >
                        {processing ? 'Wird angemeldet...' : 'Anmelden'}
                    </button>
                </form>

                <p className="mt-4 text-center text-gray-600">
                    Noch nicht registriert? <a href="/register" className="text-blue-600 hover:underline">Hier registrieren</a>
                </p>
            </div>
        </div>
    )
}
