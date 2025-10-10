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

