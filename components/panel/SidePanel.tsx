'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { useAppStore } from '@/lib/store';
import { fetchNodeDetails } from '@/lib/api';

type DetailValue = string | number | boolean | null | undefined;

export function SidePanel() {
  const { selectedElementId } = useAppStore();
  const [details, setDetails] = useState<Record<string, DetailValue> | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!selectedElementId) {
      setDetails(null);
      setIsLoading(false);
      setError(null);
      return;
    }

    setIsLoading(true);
    setError(null);

    fetchNodeDetails(selectedElementId)
      .then((data) => {
        setDetails(data as Record<string, DetailValue>);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError('Failed to load details');
        setIsLoading(false);
      });
  }, [selectedElementId]);

  const keyValueEntries = useMemo(() => {
    if (!details) return [];
    return Object.entries(details)
      .filter(([key]) => key !== 'description' && key !== 'label' && key !== 'title')
      .map(([label, value]) => ({ label, value }));
  }, [details]);

  const description = details && typeof details.description === 'string'
    ? details.description
    : 'Click a node or edge to view details.';

  return (
    <aside className="h-full w-full bg-zinc-900/80 text-zinc-100 border-l border-zinc-800 p-4 flex flex-col gap-4">
      <header>
        <h3 className="text-lg font-semibold">Details</h3>
        <p className="text-sm text-zinc-400">
          {selectedElementId ? `ID: ${selectedElementId}` : 'Select an element to inspect'}
        </p>
      </header>

      {isLoading && (
        <div className="text-sm text-zinc-400">Loading details...</div>
      )}

      {error && (
        <div className="text-sm text-red-400">{error}</div>
      )}

      {!isLoading && !error && (
        <>
          <section className="space-y-2">
            <p className="text-sm text-zinc-300 leading-relaxed">
              {description}
            </p>
          </section>

          <section>
            <h4 className="text-sm font-semibold text-zinc-200 mb-2">Key-Value</h4>
            <div className="space-y-2">
              {keyValueEntries.length === 0 && (
                <div className="rounded-md border border-dashed border-zinc-700 bg-zinc-900/60 px-3 py-2 text-sm text-zinc-400">
                  Click a node or edge to view details.
                </div>
              )}
              {keyValueEntries.map((item) => (
                <div
                  key={`${item.label}-${String(item.value)}`}
                  className="flex items-center justify-between rounded-md bg-zinc-800/80 px-3 py-2 text-sm"
                >
                  <span className="text-zinc-400 capitalize">{item.label.replace(/_/g, ' ')}</span>
                  <span className="font-medium text-zinc-100">{String(item.value ?? '—')}</span>
                </div>
              ))}
            </div>
          </section>

          {!selectedElementId && (
            <section className="mt-auto">
              <div className="rounded-md border border-dashed border-zinc-700 bg-zinc-900/60 px-3 py-2 text-sm text-zinc-400">
                Click a node or edge to view details.
              </div>
            </section>
          )}
        </>
      )}
    </aside>
  );
}
