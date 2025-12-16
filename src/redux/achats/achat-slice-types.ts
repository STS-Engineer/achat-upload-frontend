import { Fournisseur } from "../fournisseurs/fournisseur-slice-types";


export interface Achatstate {
  achatsList: AchatListResponse;
  success: boolean;
  error: boolean;
  toast: string;
}

export interface AchatListResponse {
  achats: Achat[];
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
}

export interface Achat {
    id: number;
    mvt_date: string;
    reference: string;
    description: string;
    quantite: number;
    prix: number;
    fournisseur_id: number;
    fournisseur?: Fournisseur
    fournisseur_name?: string;
}

export interface AchatUpdate {
    mvt_date?: string;
    reference?: string;
    description?: string;
    quantite?: number;
    prix?: number;
    fournisseur_id?: number;
}

