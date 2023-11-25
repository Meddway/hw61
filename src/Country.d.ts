export interface Country {
  name: {
    common: string;
  };
  population?: number;
  capital?: string;
  currencies: { code: string; name: string }[];
  borders: string[];
  flags?: { png: string };
  region: string;
}