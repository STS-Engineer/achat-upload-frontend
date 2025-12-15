export interface Fournisseurstate {
    fournisseursList: Fournisseur[];
    success: boolean;
    error: boolean;
    toast: string;
}

export interface Fournisseur {
    id: number;
    name: string;
    email: string;
}