import { GraphView } from '@/components/graph/GraphView';
import { SidePanel } from '@/components/panel/SidePanel';

export default function Home() {
  return (
    <div className="p-8 text-zinc-50">
      <h2 className="text-2xl font-bold mb-6">Drug-Target Interaction Graph</h2>

      <div className="grid gap-6 grid-cols-[minmax(0,1fr)_320px] items-start">
        <div className="rounded-lg bg-zinc-950/70 border border-zinc-800 p-4">
          <GraphView />
        </div>

        <div className="w-full">
          <SidePanel />
        </div>
      </div>
    </div>
  );
}
