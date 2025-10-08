'use client';

import { useState } from 'react';
import { KeyRound, Eye, EyeOff } from 'lucide-react';

// Este componente acepta todas las propiedades de un input normal
type PasswordInputProps = React.InputHTMLAttributes<HTMLInputElement>;

export default function PasswordInput(props: PasswordInputProps) {
  const [showPassword, setShowPassword] = useState(false);

  const toggleVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <label className="input input-bordered flex items-center gap-2 !rounded-sm pr-1">
      <KeyRound className="w-4 h-4 opacity-70" />
      
      <input
        {...props} // Pasa todas las props (value, onChange, placeholder, etc.) al input
        type={showPassword ? 'text' : 'password'}
        className="grow"
      />

      <button
        type="button" // Importante para que no envíe el formulario
        onClick={toggleVisibility}
        className="btn btn-ghost btn-sm btn-circle"
      >
        {showPassword ? (
          <EyeOff className="w-4 h-4 opacity-70" />
        ) : (
          <Eye className="w-4 h-4 opacity-70" />
        )}
      </button>
    </label>
  );
}