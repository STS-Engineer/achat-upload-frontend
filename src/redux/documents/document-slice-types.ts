export interface Documentstate {
    documentsList: Document[];
    success: boolean;
    error: boolean;
    toast: string;
}

export interface Document {
    id: number;
    filename: string;
}