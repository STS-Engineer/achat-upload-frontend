export interface Logstate {
    logsList: Log[];
    success: boolean;
    error: boolean;
    toast: string;
}

export interface Log {
    id: number;
    description: string;
}