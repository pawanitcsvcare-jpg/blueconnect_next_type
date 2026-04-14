'use client';

interface InputProps {
  label: string;
  type?: string;
  name: string;
  value?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  placeholder?: string;
}
export default function Input({ label, type = 'text', name, value, onChange, error, placeholder }: InputProps) {
  const base =
    'peer w-full bg-white border border-gray-250 text-sm rounded-xl px-3 py-4 h-12 shadow-xs placeholder-transparent transition ' +
    'focus:outline-none focus:ring-1 focus:ring-blue-200 focus:bg-white focus:border-blue-200 autofill:bg-white';
  const invalid = error ? ' border-red-400 ring-2 ring-red-200' : '';

  return (
    <div className="relative group">
      <input
        autoComplete="off"
        id={name}
        type={type}
        name={name}
        value={value ?? ''}
        onChange={onChange}
        placeholder={placeholder || ' '}
        className={`${base}${invalid}`}
      />
      {label && (
        <label
          htmlFor={name}
          className={`absolute left-1 top-1/2 -translate-y-1/2 bg-white px-2 rounded-sm
                      text-[13px] text-gray-600 pointer-events-none transition-all duration-200 ease-out
                      group-focus-within:text-blue-600 group-focus-within:top-0 group-focus-within:-translate-y-1/2 group-focus-within:scale-90
                      peer-not-placeholder-shown:top-0 peer-not-placeholder-shown:-translate-y-1/2 peer-not-placeholder-shown:scale-90 peer-not-placeholder-shown:text-blue-600`}
        >
          {label}
        </label>
      )}
     
      {error && <div className="mt-1 text-xs text-red-600">{error}</div>}
    </div>
  );
}