export interface Currency {
  name: string;
  symbol: string;
}

export interface Language {
  [key: string]: string;
}

export interface RegionalBloc {
  acronym: string;
  name: string;
}

export interface Country {
  name: {
    common: string;
    official: string;
    nativeName?: {
      [key: string]: {
        official: string;
        common: string;
      };
    };
  };
  cca2: string;
  cca3: string;
  ccn3?: string;
  cioc?: string;
  fifa?: string;
  idd: {
    root?: string;
    suffixes?: string[];
  };
  flags: {
    png: string;
    svg: string;
    alt?: string;
  };
  coatOfArms?: {
    png?: string;
    svg?: string;
  };
  maps: {
    googleMaps: string;
    openStreetMaps: string;
  };
  population: number;
  area?: number;
  density?: number;
  demonyms?: {
    eng: {
      f: string;
      m: string;
    };
  };
  independent?: boolean;
  status: string;
  unMember: boolean;
  sovereignState?: boolean;
  capital?: string[];
  capitalInfo?: {
    latlng?: [number, number];
  };
  region: string;
  subregion?: string;
  continents: string[];
  landlocked: boolean;
  borders?: string[];
  timezones: string[];
  startOfWeek: string;
  tld?: string[];
  drivingSide?: string;
  car?: {
    side: string;
    signs?: string[];
  };
  currencies?: {
    [code: string]: {
      name: string;
      symbol: string;
    };
  };
  languages?: Language;
  religions?: {
    [key: string]: number;
  };
  ethnicGroups?: {
    [key: string]: number;
  };
  gini?: {
    [year: string]: number;
  };
  postalCode?: {
    format: string;
  };
}
