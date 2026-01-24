
export interface User {
    username: string;
    email: string;
    passwordHash: string;
    role: 'admin' | 'agent';
}

export interface Lead {
    id: number;
    domain: string;        // Col A
    created: string;       // Col D
    emails: string;        // Col E (Comma separated)
    phones: string;        // Col F
    plan: string;          // Col H
    storeStatus: string;   // Col K (Active / Password Protected) - READ ONLY filter
    notes: string;         // Col L (JSON string or Delimiter separated)
    lastContact: string;   // Col M (Comma separated dates)
    leadStatus: string;    // Col N (Pending, Interested, Meeting, Sale, Rejected) - EDITABLE
    nextTask?: string;     // Col O - Description
    taskDate?: string;     // Col P - Date/Time ISO string
}

export type Region = 'spain' | 'mexico';

export interface DashboardStats {
    contacted: number;
    emailsSent: number;
    meetingsBooked: number;
    sales: number;
    rejected: number;
}
