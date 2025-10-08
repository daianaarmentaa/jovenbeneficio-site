'use client';

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Mail } from "lucide-react";
import IconInput from "@/componentes/IconInput"; 
import PasswordInput from "@/componentes/ContraseñaInput";

export default function LoginPage() {
    const [identifier, setIdentifier] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            await new Promise(resolve => setTimeout(resolve, 1000));

            if (identifier === "admin@ejemplo.com" && password === "Admin123") {
                alert("¡Inicio de sesión exitoso!");
                router.push('/home');
            } else {
                throw new Error("Correo o contraseña incorrectos.");
            }
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };
    
    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-primary to-secondary p-4">
            <div className="card w-full max-w-sm bg-base-100 shadow-xl p-8">
                <div className="flex justify-center mb-4">
                    <Image 
                        src="/logo.png"
                        alt="Logo Beneficio Joven"
                        width={150}
                        height={150}
                        priority
                    />
                </div>
                <h1 className="text-center text-2xl font-bold mb-2">Beneficio Joven</h1>
                <h2 className="text-center text-md mb-6">Iniciar Sesión</h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <IconInput
                        icon={<Mail className="w-4 h-4 opacity-70" />}
                        type="email"
                        placeholder="correo@ejemplo.com"
                        value={identifier}
                        onChange={(e) => setIdentifier(e.target.value)}
                        required
                    />
                    
                    <PasswordInput
                        placeholder="Contraseña"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    
                    <div className="text-left">
                        <Link
                          href="/forgot-password"
                          className="text-sm text-purple-300 hover:underline"
                        >
                          ¿Olvidaste tu contraseña?
                        </Link>
                    </div>

                    {error && (
                        <div className="text-center text-sm text-error">{error}</div>
                    )}

                    <button type="submit" className="btn btn-primary w-full rounded" disabled={loading}>
                        {loading ? <span className="loading loading-spinner"></span> : "Continuar"}
                    </button>
                </form>
            </div>
        </div>
    );
}