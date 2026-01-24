
export interface User {
    username: string;
    email: string;
    passwordHash: string; // In a real app, this is hashed. Storing plain for mock matching logic.
    role: 'admin' | 'agent';
}

export interface Lead {
    id: number;
    name: string;
    website: string;
    phone: string;
    status: 'pending' | 'called' | 'interested' | 'rejected';
    notes?: string;
}
