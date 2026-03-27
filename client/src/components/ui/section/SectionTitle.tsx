// SectionTitle.tsx

interface Props {
  label?: string;
  title: string;
  description?: string;
}

export function SectionTitle({ label, title, description }: Props) {
  return (
    <>
      {label && (
        <p className="text-cyan-400/80 uppercase tracking-[0.2em] text-xs mb-4">
          {label}
        </p>
      )}

      <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-white mb-4">
        {title}
      </h2>

      {description && (
        <p className="text-slate-400 max-w-2xl mx-auto">
          {description}
        </p>
      )}
    </>
  );
}