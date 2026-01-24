
import { Lead, Region, ActionType } from "../types";

// ✅ URL PROPORCIONADA POR EL USUARIO
let API_URL = "https://script.google.com/macros/s/AKfycbwZqmvNtNJXr77DCqFVoT6zFUJAGbGJ7iPYjygHbSPFppUSWiVKKpXDvnBPTnN8QXlp/exec";

// Check if localStorage has an override
if (typeof localStorage !== 'undefined') {
    const saved = localStorage.getItem('abu_crm_api_url');
    if (saved) API_URL = saved;
}

interface FetchResponse {
    leads: Lead[];
    config: {
        index: number;
        dailyLimit: number;
        filterPlan: string;
        filterStoreStatus: string;
    };
    error?: string;
}

export const fetchLeadsFromSheet = async (region: Region): Promise<FetchResponse> => {
    const emptyState = { 
        leads: [], 
        config: { index: 0, dailyLimit: 50, filterPlan: 'All', filterStoreStatus: 'All' } 
    };

    if (!API_URL) {
        return { ...emptyState, error: "API URL no configurada en el código." };
    }

    try {
        console.log(`📡 Conectando a Sheet (${region})...`);
        const response = await fetch(`${API_URL}?region=${region}`, {
            method: "GET",
            redirect: "follow"
        });

        if (!response.ok) {
            return { ...emptyState, error: `Error HTTP: ${response.status} ${response.statusText}` };
        }

        const text = await response.text();
        
        if (text.trim().startsWith('<')) {
             console.error("Respuesta HTML recibida (posible error de permisos):", text);
             return { ...emptyState, error: "La URL devuelve HTML en lugar de JSON. Verifica que el despliegue del Script tenga acceso 'Anyone' (Cualquiera)." };
        }

        try {
            const data = JSON.parse(text);
            
            if (data.error) {
                return { ...emptyState, error: `Error del Script: ${data.error}` };
            }
            return data;
        } catch (e) {
            console.error("Failed to parse JSON", text);
            return { ...emptyState, error: "Respuesta inválida del servidor (No es JSON)." };
        }

    } catch (error) {
        console.error("Error fetching leads:", error);
        return { ...emptyState, error: error instanceof Error ? error.message : "Error de red desconocido" };
    }
};

export const updateLeadInSheet = async (
    region: Region, 
    leadId: number, 
    leadData: Partial<Lead>,
    config: {
        currentIndex: number;
        filterPlan: string;
        filterStoreStatus: string;
    },
    metricToIncrement?: ActionType // New parameter for B7, B8, B9 stats
) => {
    try {
        await fetch(API_URL, {
            method: "POST",
            redirect: "follow",
            body: JSON.stringify({
                action: 'update_lead',
                region,
                leadId,
                notes: leadData.notes,
                lastContact: leadData.lastContact,
                leadStatus: leadData.leadStatus,
                emails: leadData.emails,
                nextTask: leadData.nextTask,
                taskDate: leadData.taskDate,
                currentIndex: config.currentIndex,
                filterPlan: config.filterPlan,
                filterStoreStatus: config.filterStoreStatus,
                metricToIncrement // Pass this to the backend
            })
        });
    } catch (error) {
        console.error("Error updating lead:", error);
    }
};

export const completeTaskInSheet = async (
    region: Region,
    leadId: number,
    taskCompleted: string
) => {
    try {
        await fetch(API_URL, {
            method: "POST",
            redirect: "follow",
            body: JSON.stringify({
                action: 'complete_task',
                region,
                leadId,
                taskCompleted
            })
        });
    } catch (error) {
        console.error("Error completing task:", error);
    }
};

export const saveProgressInSheet = async (
    region: Region, 
    currentIndex: number,
    filterPlan: string,
    filterStoreStatus: string
) => {
    try {
        await fetch(API_URL, {
            method: "POST",
            redirect: "follow",
            body: JSON.stringify({
                action: 'save_progress',
                region,
                currentIndex,
                filterPlan,
                filterStoreStatus
            })
        });
    } catch (error) {
        console.error("Error saving progress:", error);
    }
};

export const getApiUrl = () => API_URL;

export const setApiUrl = (url: string) => {
    API_URL = url;
    if (typeof localStorage !== 'undefined') {
        localStorage.setItem('abu_crm_api_url', url);
    }
};
