import { create } from 'zustand';

interface FilterStore {
  region: string | null;
  language: string | null;
  currency: string | null;
  setRegion: (region: string | null) => void;
  setLanguage: (language: string | null) => void;
  setCurrency: (currency: string | null) => void;
  resetFilters: () => void;
}

export const useFilterStore = create<FilterStore>((set) => ({
  region: null,
  language: null,
  currency: null,
  setRegion: (region) => set({ region }),
  setLanguage: (language) => set({ language }),
  setCurrency: (currency) => set({ currency }),
  resetFilters: () => set({ region: null, language: null, currency: null }),
}));
