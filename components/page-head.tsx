import type { ReactNode } from 'react';

/**
 * Inner-page title page: a tempo/dynamic marking, the Abril title and a lede, on manuscript paper,
 * with an optional ornament beside it and an optional band above it (e.g. the curtain swag).
 */
export function PageHead({ marking, title, children, ornament, above, id }: {
  marking: string;
  title: ReactNode;
  children?: ReactNode;
  ornament?: ReactNode;
  above?: ReactNode;
  id?: string;
}) {
  return <header className="notes-bg relative overflow-hidden">
    {above}
    <div className="wrap grid items-center gap-8 pt-[clamp(2.5rem,6vw,4.5rem)] pb-[clamp(2rem,4vw,3.5rem)] md:grid-cols-[1fr_auto]">
      <div>
        <p className="marking">{marking}</p>
        <h1 id={id} className="hairpin mt-2 max-w-[16ch] text-[clamp(2.7rem,6.4vw,5rem)]">{title}</h1>
        {children ? <div className="mt-6 max-w-(--measure) text-[clamp(1.08rem,1.6vw,1.25rem)] text-pencil">{children}</div> : null}
      </div>
      {ornament ? <div className="hidden md:block">{ornament}</div> : null}
    </div>
  </header>;
}
