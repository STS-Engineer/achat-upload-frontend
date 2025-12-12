import { Fournisseur } from "../fournisseurs/fournisseur-slice-types";


export interface Achatstate {
    achatsList: Achat[];
    success: boolean;
    error: boolean;
    toast: string;
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
}