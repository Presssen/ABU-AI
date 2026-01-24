
import { Lead, User } from "../types";

export const USERS: User[] = [
    {
        username: "David",
        email: "presen97@gmail.com",
        passwordHash: "Crack",
        role: "agent"
    },
    {
        username: "Admin",
        email: "admin@abu.com", // Dummy email for login matching logic if needed, or just username
        passwordHash: "PUTOCRACK",
        role: "admin"
    }
];

export const LEADS_SPAIN: Lead[] = [
    {
        id: 101,
        domain: "zapatosamigos.com",
        created: "2023-10-15",
        emails: "contacto@zapatosamigos.com",
        phones: "+34 612 345 678",
        plan: "Basic",
        leadStatus: "Pending",
        storeStatus: "Active",
        notes: "",
        lastContact: ""
    },
    {
        id: 102,
        domain: "modaspaqui.es",
        created: "2023-11-01",
        emails: "info@modaspaqui.es",
        phones: "", // Empty to test AI
        plan: "Pro",
        leadStatus: "Pending",
        storeStatus: "Active",
        notes: "Llamar por la mañana",
        lastContact: "2023-11-05"
    },
    {
        id: 103,
        domain: "deportesmanolo.net",
        created: "2023-09-20",
        emails: "ventas@deportesmanolo.net",
        phones: "+34 912 333 444",
        plan: "Basic",
        leadStatus: "Interested",
        storeStatus: "Active",
        notes: "",
        lastContact: ""
    }
];

export const LEADS_MEXICO: Lead[] = [
    {
        id: 201,
        domain: "tacosytextiles.mx",
        created: "2023-12-01",
        emails: "hola@tacosytextiles.mx",
        phones: "+52 55 1234 5678",
        plan: "Enterprise",
        leadStatus: "Pending",
        storeStatus: "Active",
        notes: "",
        lastContact: ""
    },
    {
        id: 202,
        domain: "artesaniasdelgolfo.com",
        created: "2023-12-10",
        emails: "info@artesanias.com",
        phones: "",
        plan: "Basic",
        leadStatus: "Pending",
        storeStatus: "Active",
        notes: "",
        lastContact: ""
    }
];
