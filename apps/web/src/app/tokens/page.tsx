import type { ReactNode } from 'react';
import { Button, Chip, Money, Seal, StatusBadge } from '@ocean/ui';
import { ThemeToggle } from '../../components/ThemeToggle';

/* Каталог токенов §10.3 (приёмка Этапа 0: страница в светлой и тёмной теме).
   Никаких HEX-литералов — всё через var(--token) (линт-правило). */

const brandSwatches = [
  'ocean-950', 'ocean-900', 'ocean-800', 'ocean-700', 'ocean-600',
  'ocean-500', 'ocean-300', 'ocean-200', 'ocean-100', 'ocean-50', 'white',
] as const;

const statusSwatches = ['success', 'warning', 'warning-bg', 'danger', 'text-muted'] as const;

const semanticTokens = ['bg', 'surface', 'text', 'border', 'primary', 'on-primary'] as const;

const radii = [
  ['radius-control', '6px — кнопки, поля, чипы'],
  ['radius-container', '12px — карточки, панели'],
  ['radius-sheet', '16px — нижшие листы (mobile)'],
  ['radius-seal', '9999px — печать, круглые бейджи'],
] as const;

const spaces = ['space-1', 'space-2', 'space-3', 'space-4', 'space-6', 'space-8', 'space-12'] as const;

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="flex flex-col gap-[var(--space-3)]">
      <h2 className="text-xl font-semibold">{title}</h2>
      {children}
    </section>
  );
}

function Swatch({ name, onDark }: { name: string; onDark?: boolean }) {
  return (
    <li className="flex items-center gap-[var(--space-3)]">
      <span
        aria-hidden
        className="size-10 shrink-0 rounded-[var(--radius-control)] border-[1px] border-[var(--border)]"
        style={{ backgroundColor: `var(--${name})` }}
      />
      <code className="text-sm">--{name}</code>
      {onDark ? <span className="text-xs text-[var(--text-muted)]">тёмный текст поверх</span> : null}
    </li>
  );
}

export default function TokensPage() {
  return (
    <main className="mx-auto flex max-w-4xl flex-col gap-[var(--space-12)] p-[var(--space-6)] pb-[var(--space-12)]">
      <header className="flex flex-wrap items-center justify-between gap-[var(--space-4)] border-b-[1px] border-[var(--border)] py-[var(--space-4)]">
        <div className="flex items-center gap-[var(--space-3)]">
          <Seal size={40} />
          <h1 className="font-[family-name:var(--font-stencil)] text-3xl tracking-wide">OCEAN · токены</h1>
        </div>
        <ThemeToggle />
      </header>

      <Section title="Брендовая палитра">
        <ul className="grid grid-cols-2 gap-[var(--space-3)] sm:grid-cols-3">
          {brandSwatches.map((t) => (
            <Swatch key={t} name={t} />
          ))}
        </ul>
      </Section>

      <Section title="Семантические цвета (переключаются темой)">
        <ul className="grid grid-cols-2 gap-[var(--space-3)] sm:grid-cols-3">
          {semanticTokens.map((t) => (
            <Swatch key={t} name={t} />
          ))}
        </ul>
      </Section>

      <Section title="Статусные цвета">
        <ul className="grid grid-cols-2 gap-[var(--space-3)] sm:grid-cols-3">
          {statusSwatches.map((t) => (
            <Swatch key={t} name={t} />
          ))}
        </ul>
        <div className="flex flex-wrap gap-[var(--space-2)] pt-[var(--space-2)]">
          <StatusBadge tone="success">Продано</StatusBadge>
          <StatusBadge tone="warning">Ожидает</StatusBadge>
          <StatusBadge tone="danger">Просрочено</StatusBadge>
          <StatusBadge tone="brand">В резерве</StatusBadge>
          <StatusBadge tone="neutral">Черновик</StatusBadge>
        </div>
      </Section>

      <Section title="Типографика">
        <div className="flex flex-col gap-[var(--space-2)] rounded-[var(--radius-container)] border-[1px] border-[var(--border)] bg-[var(--surface)] p-[var(--space-4)]">
          <p className="font-[family-name:var(--font-stencil)] text-4xl tracking-wide">
            Saira Stencil One — OCEAN, IDF, LOSS (только латиница)
          </p>
          <p className="text-lg">Golos Text — основной интерфейс: ферма, лот, стакан, паспорт.</p>
          <p className="text-sm text-[var(--text-muted)]">
            --text-muted: второстепенные подписи, §10.4. Печать на белом и брендовом фоне проверена
            контраст-тестом (WCAG AA ≥ 4.5:1).
          </p>
        </div>
      </Section>

      <Section title="Радиусы">
        <ul className="flex flex-col gap-[var(--space-2)]">
          {radii.map(([name, note]) => (
            <li key={name} className="flex items-center gap-[var(--space-3)]">
              <span
                aria-hidden
                className="size-12 shrink-0 border-[2px] border-[var(--primary)] bg-[var(--surface)]"
                style={{ borderRadius: `var(--${name})` }}
              />
              <code className="text-sm">--{name}</code>
              <span className="text-sm text-[var(--text-muted)]">{note}</span>
            </li>
          ))}
        </ul>
      </Section>

      <Section title="Отступы (4-ная шкала)">
        <ul className="flex flex-col gap-[var(--space-1)]">
          {spaces.map((s) => (
            <li key={s} className="flex items-center gap-[var(--space-3)]">
              <span
                aria-hidden
                className="h-3 bg-[var(--ocean-500)]"
                style={{ width: `var(--${s})` }}
              />
              <code className="text-sm">--{s}</code>
            </li>
          ))}
        </ul>
      </Section>

      <Section title="Компоненты">
        <div className="flex flex-wrap items-center gap-[var(--space-3)] rounded-[var(--radius-container)] border-[1px] border-[var(--border)] bg-[var(--surface)] p-[var(--space-4)]">
          <Button variant="primary">Купить лот</Button>
          <Button variant="quiet">Скрыть до 18:00</Button>
          <Button variant="inverse">Печать на белом</Button>
          <Chip active>Молоко</Chip>
          <Chip>Грибы</Chip>
          <Money minor={124050} />
          <Money minor={124000} />
          <Seal size={24} title="id: 4815" />
          <Seal size={96} press />
        </div>
      </Section>

      <Section title="Движение (§10.6 — ровно два кейса)">
        <ul className="list-disc pl-[var(--space-6)] text-sm text-[var(--text-muted)]">
          <li>seal-press: печать ставится scale 1.08→1, 240 мс, один раз (см. Seal 96 выше).</li>
          <li>glass-row-highlight: подсвет новой строки Стакана --ocean-100, 600 мс.</li>
          <li>Оба отключаются при prefers-reduced-motion.</li>
        </ul>
      </Section>

      <Section title="Тени">
        <div className="flex flex-wrap gap-[var(--space-6)]">
          <div className="rounded-[var(--radius-container)] bg-[var(--surface)] p-[var(--space-4)] shadow-[var(--shadow-overlay)]">
            <code className="text-sm">--shadow-overlay</code>
            <p className="pt-[var(--space-2)] text-sm text-[var(--text-muted)]">
              Синяя тень (§10.5): оверлеи, нижшие листы, поп-апы. Единственный уровень elevation.
            </p>
          </div>
        </div>
      </Section>
    </main>
  );
}
