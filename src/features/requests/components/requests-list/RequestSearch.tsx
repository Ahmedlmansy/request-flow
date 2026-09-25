type RequestSearchProps = { value: string; onChange: (value: string) => void };

export function RequestSearch({ value, onChange }: RequestSearchProps) {
  return (
    <input
      aria-label="Search requests"
      value={value}
      onChange={(event) => onChange(event.target.value)}
      placeholder="Search requests..."
      className="h-10 w-full rounded-md border border-slate-300 bg-white px-3 text-sm outline-none focus:border-blue-500"
    />
  );
}
