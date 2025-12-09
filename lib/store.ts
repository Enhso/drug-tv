import { create } from 'zustand';

interface AppState {
  selectedElementId: string | null;
}

interface AppActions {
  setSelectedElementId: (id: string | null) => void;
  clearSelection: () => void;
}

export const useAppStore = create<AppState & AppActions>((set) => ({
  selectedElementId: null,
  setSelectedElementId: (id) => set({ selectedElementId: id }),
  clearSelection: () => set({ selectedElementId: null }),
}));
