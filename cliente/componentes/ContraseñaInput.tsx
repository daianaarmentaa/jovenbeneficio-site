// use client'; // Comentado si no es necesario en tu setup actual

import { useState } from 'react';
import { KeyRound, Eye, EyeOff } from 'lucide-react';
import clsx from 'clsx'; // Opcional pero recomendado para unir clases

// Este componente ahora acepta un `className` para el contenedor
type PasswordInputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  containerClassName?: string;
};

export default function PasswordInput({ containerClassName, ...props }: PasswordInputProps) {
  const [showPassword, setShowPassword] = useState(false);

  const toggleVisibility = () => {
    setShowPassword(!showPassword);
  };

  const finalClassName = clsx(
    "input input-bordered flex items-center gap-2 !rounded-sm pr-1",
    containerClassName
  );

  return (
    <label className={finalClassName}>
      <KeyRound className="w-4 h-4 opacity-70 text-base-content" />
      
      <input
        {...props}
        type={showPassword ? 'text' : 'password'}
        className="grow" // `grow` es suficiente, el `w-full` lo controla el label
      />

      <button
        type="button"
        onClick={toggleVisibility}
        className="btn btn-ghost btn-sm btn-circle"
      >
        {showPassword ? (
          <EyeOff className="w-4 h-4 opacity-70 text-base-content" />
        ) : (
          <Eye className="w-4 h-4 opacity-70 text-base-content" />
        )}
      </button>
    </label>
  );
}