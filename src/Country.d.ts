export interface Country {
  name: string;
  population?: number;
  capital?: string;
  currencies: { code: string; name: string }[];
  borders: string[];
  flags?: { png: string };
  region: string;
}