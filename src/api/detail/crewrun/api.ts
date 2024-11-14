import { http } from "../../request";

export const getcrewrunInfo= async (runId) => {
    console.log('runId',runId)
    const response = await http.get(`/api/join-posts/crews/${runId}`);
    return response;
} 
