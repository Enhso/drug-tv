import React from 'react';

interface AppShellProps {
  children: React.ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  return (
    <div className="min-h-screen flex flex-col bg-zinc-950 text-zinc-50">
      <header className="border-b border-zinc-800 p-4">
        <h1 className="text-xl font-semibold">Interactive Drug-Target Visualization Tool</h1>
      </header>
      <main className="flex-1 flex flex-col relative">
        {children}
      </main>
      <footer className="border-t border-zinc-800 p-4 text-sm text-zinc-400">
        <p>Data attribution: ChEMBL, DrugBank (Placeholder)</p>
      </footer>
    </div>
  );
}
