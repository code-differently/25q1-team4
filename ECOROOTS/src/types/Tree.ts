
export interface Tree {
  id?: string;
  species: string;
  date: string;
  location?: {
    latitude: number;
    longitude: number;
  };
}
