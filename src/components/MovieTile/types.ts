export interface MovieTileParams {
    imageUrl: string;
    name: string; 
    releaseYear: number;
    genres: any[];
    onClick: (event: any) => void;  
  }
  