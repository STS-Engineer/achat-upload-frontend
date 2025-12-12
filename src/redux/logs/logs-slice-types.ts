export interface Logstate {
    logsList: Log[];
    success: boolean;
    error: boolean;
    toast: string;
}

export interface Log {
    id: number;
    description: string;
    problem_type: string;
    document: {
        id: number;
        filename: string;
    }
}