import React from 'react';

// Definimos los tipos de las props que el componente aceptará.
// Aceptará un 'icon' y cualquier otra propiedad de un input normal.
type IconInputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  icon: React.ReactNode;
};

export default function IconInput({ icon, ...props }: IconInputProps) {
  return (
    <label className="input input-bordered flex items-center gap-2 !rounded-sm">
      {/* Aquí se renderiza el ícono que pasamos como prop */}
      {icon}
      
      {/* El input recibe todas las demás props (type, placeholder, value, etc.) */}
      <input {...props} className="grow" placeholder={props.placeholder || "Escribe aquí..."} />
    </label>
  );
}