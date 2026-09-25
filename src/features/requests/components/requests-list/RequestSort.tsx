type Props = { value: 'newest' | 'oldest'; onChange: (value: 'newest' | 'oldest') => void }

export function RequestSort({ value, onChange }: Props) {
  return <select aria-label="Sort requests" value={value} onChange={(event) => onChange(event.target.value as Props['value'])} className="h-10 rounded-md border border-slate-300 bg-white px-3 text-sm"><option value="newest">Newest first</option><option value="oldest">Oldest first</option></select>
}
