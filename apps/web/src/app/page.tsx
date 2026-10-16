import Link from 'next/link';

export default function Home() {
  return (
    <main className="mx-auto flex min-h-screen max-w-3xl flex-col items-start justify-center gap-[var(--space-4)] p-[var(--space-8)]">
      <h1 className="font-[family-name:var(--font-stencil)] text-5xl tracking-wide">OCEAN</h1>
      <p className="text-[var(--text-muted)]">от фермы до гостя без лишних волн</p>
      <ul className="mt-[var(--space-6)] flex flex-col gap-[var(--space-2)]">
        <li>
          <Link
            className="text-[var(--primary)] underline underline-offset-2"
            href="/tokens"
          >
            Каталог дизайн-токенов
          </Link>
        </li>
      </ul>
    </main>
  );
}
