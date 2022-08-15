export interface Listitem {
  status: string;
  content: string;
  delete: (e: React.MouseEvent<HTMLSpanElement>) => void;
  toggleStatus: (e: React.MouseEvent<HTMLInputElement>) => void;
}

export interface Home {}
