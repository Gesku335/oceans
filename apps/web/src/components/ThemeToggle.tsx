'use client';

import { useEffect, useState } from 'react';
import { Button } from '@ocean/ui';

type Theme = 'light' | 'dark';

/** Переключатель темы (§10.3): пишет data-theme на <html>, выбор сохраняется. */
export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem('ocean-theme') as Theme | null;
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initial: Theme = saved ?? (prefersDark ? 'dark' : 'light');
    setTheme(initial);
    document.documentElement.dataset.theme = initial;
  }, []);

  function toggle() {
    const next: Theme = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    document.documentElement.dataset.theme = next;
    localStorage.setItem('ocean-theme', next);
  }

  return (
    <Button variant="quiet" onClick={toggle} aria-pressed={theme === 'dark'}>
      {theme === 'dark' ? 'Светлая тема' : 'Тёмная тема'}
    </Button>
  );
}
