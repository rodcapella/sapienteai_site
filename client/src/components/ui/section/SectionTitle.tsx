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
        <p className="mb-4 text-xs font-black uppercase tracking-[0.22em] text-[var(--brand-cyan)]/85">
          {label}
        </p>
      )}

      <h2 className="mb-4 font-heading text-3xl font-extrabold tracking-tight text-[var(--brand-offwhite)] md:text-4xl lg:text-5xl">
        {title}
      </h2>

      {description && <p className="mx-auto max-w-2xl text-[var(--brand-offwhite)]/72">{description}</p>}
    </>
  );
}