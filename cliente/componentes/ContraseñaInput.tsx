import { useState } from 'react';
import { KeyRound, Eye, EyeOff } from 'lucide-react';
import clsx from 'clsx';

/**
 * Componente: PasswordInput
 * 
 * Descripción:
 * Este componente renderiza un campo de entrada de contraseña con la opción de
 * mostrar u ocultar el contenido mediante un botón. Está diseñado para integrarse
 * fácilmente en formularios y manejar atributos estándar de un input HTML.
 * 
 * Funcionalidades:
 * - Muestra un ícono de llave al inicio del input.
 * - Permite alternar entre mostrar y ocultar la contraseña.
 * - Admite clases adicionales en el contenedor mediante `containerClassName`.
 * - Se integra con las props normales de un input (placeholder, required, etc.).
 * 
 * Props:
 * - containerClassName: string opcional para agregar clases al contenedor.
 * - ...props: cualquier atributo válido de un input HTML (type, placeholder, value, etc.).
 * 
 * Autora: Daiana Armenta
 */



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