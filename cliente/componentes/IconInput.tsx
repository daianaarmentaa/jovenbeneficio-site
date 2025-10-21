/* Esta función se encarga de crear un componente para
 * mostrar un cuadro para escribir texto.
 * Autora: Daiana Andrea Armenta Maya y Emiliano Plata
*/
import React from 'react';

type IconInputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  icon: React.ReactNode;
};

export default function IconInput({ icon, ...props }: IconInputProps) {
  return (
    <label className="input input-bordered flex items-center gap-2 !rounded-sm">

      {icon}
      
      <input {...props} className="grow" placeholder={props.placeholder || "Escribe aquí..."} />
    </label>
  );
}

