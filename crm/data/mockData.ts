
import { Lead, User } from "../types";

// NOTE: In a production app, never store passwords in frontend code.
// This is strictly for the requested mockup.
export const USERS: User[] = [
    {
        username: "David",
        email: "presen97@gmail.com",
        passwordHash: "Crack",
        role: "agent"
    }
];

export const MOCK_LEADS: Lead[] = [
    {
        id: 1,
        name: "Zapatería Los Amigos",
        website: "www.zapatosamigos.com",
        phone: "+34 612 345 678",
        status: "pending"
    },
    {
        id: 2,
        name: "Modas Paqui",
        website: "www.modaspaqui.es",
        phone: "+34 699 888 777",
        status: "pending"
    },
    {
        id: 3,
        name: "Deportes Manolo",
        website: "www.deportesmanolo.net",
        phone: "+34 912 333 444",
        status: "pending"
    },
    {
        id: 4,
        name: "Tech Solutions SL",
        website: "www.techsolutions.io",
        phone: "+34 600 111 222",
        status: "pending"
    },
    {
        id: 5,
        name: "Green Garden Center",
        website: "www.greengarden.com",
        phone: "+34 934 567 890",
        status: "pending"
    }
];
