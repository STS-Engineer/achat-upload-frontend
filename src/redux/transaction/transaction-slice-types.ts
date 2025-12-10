export interface Transactionstate {
    transactionsList: Transaction[];
    success: boolean;
    error: boolean;
    toast: string;
}

export interface Transaction {
    id: number;
    date_limite: string;
    responsable_name: string;
    responsable_email: string;
}