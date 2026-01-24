
import { Lead, Region } from "../types";

// ✅ Configured Google Apps Script Web App URL
const API_URL = "https://script.google.com/macros/s/AKfycbwZqmvNtNJXr77DCqFVoT6zFUJAGbGJ7iPYjygHbSPFppUSWiVKKpXDvnBPTnN8QXlp/exec"; 

interface FetchResponse {
    leads: Lead[];
    config: {
        index: number;
        dailyLimit: number;
        filterPlan: string;
        filterStoreStatus: string;
    }
}

export const fetchLeadsFromSheet = async (region: Region): Promise<FetchResponse> => {
    if (!API_URL || API_URL.includes("YOUR_GOOGLE_APPS_SCRIPT")) {
        console.warn("Google Sheet API URL not configured.");
        return { leads: [], config: { index: 0, dailyLimit: 50, filterPlan: 'All', filterStoreStatus: 'All' } };
    }

    try {
        const response = await fetch(`${API_URL}?region=${region}`);
        if (!response.ok) {
            throw new Error(`API Error: ${response.statusText}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching leads:", error);
        return { leads: [], config: { index: 0, dailyLimit: 50, filterPlan: 'All', filterStoreStatus: 'All' } };
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
    }
) => {
    if (!API_URL || API_URL.includes("YOUR_GOOGLE_APPS_SCRIPT")) return;

    try {
        await fetch(API_URL, {
            method: "POST",
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
                filterStoreStatus: config.filterStoreStatus
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
    if (!API_URL || API_URL.includes("YOUR_GOOGLE_APPS_SCRIPT")) return;

    try {
        await fetch(API_URL, {
            method: "POST",
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
    if (!API_URL || API_URL.includes("YOUR_GOOGLE_APPS_SCRIPT")) return;

    try {
        await fetch(API_URL, {
            method: "POST",
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
