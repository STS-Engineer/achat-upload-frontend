export interface Managerstate {
    managerList: Manager[];
    success: boolean;
    error: boolean;
    toast: string;
}

export interface Manager {
    id: number;
    manager: string;
}