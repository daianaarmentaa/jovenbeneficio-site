'use client';

import Link from "next/link"
import Image from "next/image"
import { useState } from "react";

export default function LoginPage() {
    const[identifier, setIdentifier] = useState(" ")
    const[password, setPassword] = useState(" ")
    const[error, setError] = useState(" ")

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

    }
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
                <h2 className="text-center text-md font semibold mb-6">Iniciar Sesión</h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <label className="input validator !rounded-sm">
                        <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <g
                            strokeLinejoin="round"
                            strokeLinecap="round"
                            strokeWidth="2.5"
                            fill="none"
                            stroke="currentColor"
                            >
                            <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                            <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                            </g>
                        </svg>
                        <input type="email" placeholder="correo@ejemplo.com" required />
                    </label>
                    <div className="validator-hint hidden">Ingresa un correo válido</div>

                    <label className="input validator !rounded-sm">
                        <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <g
                            strokeLinejoin="round"
                            strokeLinecap="round"
                            strokeWidth="2.5"
                            fill="none"
                            stroke="currentColor"
                        >
                            <path
                            d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"
                            ></path>
                            <circle cx="16.5" cy="7.5" r=".5" fill="currentColor"></circle>
                        </g>
                        </svg>
                        <input
                        type="password"
                        required
                        placeholder="Contraseña"
                        minLength={8}
                        pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                        title="Must be more than 8 characters, including number, lowercase letter, uppercase letter"
                        />
                    </label>
                    <p className="validator-hint hidden">
                    Deben de ser más de 8 caracteres, incluyendo
                    <br />Al menos un número <br />Al menos una letra minúscula <br />Al menos una letra mayúscula
                    </p>
                    
                    <div className="text-left">
                        <Link
                        href="/forgot-password"
                        className="text-sm text-purple-700 hover:underline"
                        >
                        Recuperar contraseña
                        </Link>
                    </div>
                    <button type="submit" className="btn btn-primary w-full rounded">
                        Continuar
                    </button>
                </form>

            </div>
        </div>

    )
}