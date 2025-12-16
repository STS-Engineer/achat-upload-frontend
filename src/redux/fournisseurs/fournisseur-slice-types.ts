export interface Fournisseurstate {
    fournisseursList: FournisseurListResponse;
    success: boolean;
    error: boolean;
    toast: string;
}

export interface FournisseurListResponse {
  items: Fournisseur[];
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
}

export interface Fournisseur {
    id: number;
    name: string;
    email: string;
}