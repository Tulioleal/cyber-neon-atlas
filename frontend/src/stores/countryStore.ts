import { create } from 'zustand';
import { Country } from '@/types/country';
import { fetchAllCountries, fetchCountryByCode } from '@/services/api';

interface CountryStore {
  countries: Country[];
  selectedCountry: Country | null;
  comparisonCountries: Country[];
  activeFilters: {
    language: string | null;
    currency: string | null;
    region: string | null;
    subregion: string | null;
  };
  isLoading: boolean;
  error: string | null;
  cache: Map<string, { data: Country[]; timestamp: number }>;
  
  fetchCountries: () => Promise<void>;
  selectCountry: (country: Country | null) => void;
  addToComparison: (country: Country) => void;
  removeFromComparison: (countryCode: string) => void;
  clearComparison: () => void;
  setFilter: (filterType: keyof CountryStore['activeFilters'], value: string | null) => void;
  clearFilters: () => void;
  getFilteredCountries: () => Country[];
}

const CACHE_TTL = 60 * 60 * 1000;

export const useCountryStore = create<CountryStore>((set, get) => ({
  countries: [],
  selectedCountry: null,
  comparisonCountries: [],
  activeFilters: {
    language: null,
    currency: null,
    region: null,
    subregion: null,
  },
  isLoading: false,
  error: null,
  cache: new Map(),

  fetchCountries: async () => {
    const { cache, countries } = get();
    
    const cached = cache.get('all_countries');
    if (cached && Date.now() - cached.timestamp < CACHE_TTL && countries.length > 0) {
      return;
    }

    set({ isLoading: true, error: null });
    
    try {
      const data = await fetchAllCountries();
      const newCache = new Map(cache);
      newCache.set('all_countries', { data, timestamp: Date.now() });
      
      set({ countries: data, isLoading: false, cache: newCache });
    } catch (error) {
      set({ 
        isLoading: false, 
        error: error instanceof Error ? error.message : 'Failed to fetch countries' 
      });
    }
  },

  selectCountry: (country) => {
    set({ selectedCountry: country });
  },

  addToComparison: (country) => {
    const { comparisonCountries } = get();
    if (comparisonCountries.length < 3 && !comparisonCountries.find(c => c.cca2 === country.cca2)) {
      set({ comparisonCountries: [...comparisonCountries, country] });
    }
  },

  removeFromComparison: (countryCode) => {
    const { comparisonCountries } = get();
    set({ 
      comparisonCountries: comparisonCountries.filter(c => c.cca2 !== countryCode) 
    });
  },

  clearComparison: () => {
    set({ comparisonCountries: [] });
  },

  setFilter: (filterType, value) => {
    const { activeFilters } = get();
    set({ 
      activeFilters: { ...activeFilters, [filterType]: value } 
    });
  },

  clearFilters: () => {
    set({ 
      activeFilters: { 
        language: null, 
        currency: null, 
        region: null, 
        subregion: null 
      } 
    });
  },

  getFilteredCountries: () => {
    const { countries, activeFilters } = get();
    
    return countries.filter(country => {
      if (activeFilters.region && country.region !== activeFilters.region) return false;
      if (activeFilters.subregion && country.subregion !== activeFilters.subregion) return false;
      return true;
    });
  },
}));
