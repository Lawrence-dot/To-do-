export interface ListType {
  content: string;
  status: string;
  id: number | string;
}

export interface EditList {
  (index: number): void;
}
