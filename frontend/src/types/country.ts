export interface CountryName {
  common: string;
  official: string;
  nativeName?: Record<string, { official: string; common: string }>;
}

export interface Country {
  name: CountryName;
  cca3: string;
  cca2?: string;
  cioc?: string;
  flags: {
    png: string;
    svg: string;
    alt?: string;
  };
  population: number;
  area?: number;
  continents?: string[];
  region?: string;
  subregion?: string;
  capital?: string[];
  capitalInfo?: {
    latlng?: [number, number];
  };
  tld?: string[];
  currencies?: Record<string, { name: string; symbol: string }>;
  languages?: Record<string, string>;
  borders?: string[];
  timezones?: string[];
  maps?: {
    googleMaps?: string;
    openStreetMaps?: string;
  };
  car?: {
    side: 'left' | 'right';
    signs?: string[];
  };
  idd?: {
    root?: string;
    suffixes?: string[];
  };
  postalCode?: {
    format?: string;
  };
  gini?: Record<string, number>;
  coatOfArms?: {
    png?: string;
    svg?: string;
  };
  startOfWeek?: string;
  demonyms?: Record<string, { f: string; m: string }>;
  unMember?: boolean;
  status?: string;
}

export interface CountriesResponse extends Country {}
