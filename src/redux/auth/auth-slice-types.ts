export interface AuthState {
    isAuthenticated: boolean;
    token: string | null;
    error: boolean;
    success: boolean;
    toast: string;
    role: string;
    user: User | null;
}

export interface User {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    active: boolean;
    manager: Manager;
    document: string;
    manager_id: number | string;
    document_id: number;
    plant_name?: string;
}

export interface Manager {
    id: number;
    name: string;
    manager: string;
    manager_email: string;
}

export interface UserUpdate {
  id: number;
  first_name?: string;
  last_name?: string;
  email?: string;
  manager_id: number | string;
}
    