'use client';

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { signInWithCustomToken } from 'firebase/auth'; // <-- Importa esto
import { auth } from '../lib/firebase'; // <-- Importa tu config de auth

export default function LoginPage() {
    // Estado inicializado como string vacío
    const [identifier, setIdentifier] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        try {
            const response = await fetch('http://127.0.0.1:5000/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: identifier, password: password }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Ocurrió un error inesperado.');
            }

            const customToken = data.token;
            await signInWithCustomToken(auth, customToken);
            
            // Redirige al usuario tras un login exitoso
            window.location.href = '/home';

        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-primary to-secondary">
            <div className="card w-96 bg-base-100 shadow-xl p-8">
                <div className="flex justify-center mb-4">
                    <Image 
                        src="/logo.png"
                        alt="Logo Beneficio Joven"
                        width={200}
                        height={200}
                        priority
                    />
                </div>
                <h1 className="text-center text-2xl font-bold mb-2">Beneficio Joven</h1>
                <h2 className="text-center text-md font-semibold mb-6">Iniciar Sesión</h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <label className="input input-bordered flex items-center gap-2">
                        {/* ... tu SVG ... */}
                        <input 
                          type="email" 
                          placeholder="correo@ejemplo.com" 
                          required 
                          value={identifier}
                          onChange={(e) => setIdentifier(e.target.value)}
                        />
                    </label>
                    
                    <label className="input input-bordered flex items-center gap-2">
                        {/* ... tu SVG ... */}
                        <input
                            type="password"
                            required
                            placeholder="Contraseña"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </label>

                    {error && <p className="text-red-500 text-sm text-center">{error}</p>}
                    
                    <div className="text-left">
                        <Link href="/forgot-password" className="text-sm text-purple-700 hover:underline">
                            Recuperar contraseña
                        </Link>
                    </div>
                    
                    <button type="submit" className="btn btn-primary w-full rounded" disabled={loading}>
                        {loading ? 'Cargando...' : 'Continuar'}
                    </button>
                </form>
            </div>
        </div>
    );
}