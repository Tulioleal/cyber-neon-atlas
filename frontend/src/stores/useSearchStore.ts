import { create } from 'zustand';
import { Country } from '@/types/country';

interface SearchStore {
  query: string;
  results: Country[];
  isSearching: boolean;
  setQuery: (query: string) => void;
  setResults: (results: Country[]) => void;
  clearSearch: () => void;
}

export const useSearchStore = create<SearchStore>(set => ({
  query: '',
  results: [],
  isSearching: false,
  setQuery: query => set({ query }),
  setResults: results => set({ results, isSearching: false }),
  clearSearch: () => set({ query: '', results: [], isSearching: false }),
}));
