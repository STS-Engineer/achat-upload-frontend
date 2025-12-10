import { Fournisseur } from "../fournisseurs/fournisseur-slice-types";


export interface Achatstate {
    achatsList: Achat[];
    success: boolean;
    error: boolean;
    toast: string;
}

export interface Achat {
    id: number;
    date: string;
    taille: number;
    prix: number;
    reference: string;
    plant: string;
    quantite: number;
    responsable_plant: string;

    fournisseur_id: number;
    fournisseur?: Fournisseur
}