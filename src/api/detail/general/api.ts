import { http } from "../../request";


export const getrunInfo= async (runId) => {
    console.log('runId',runId)
    const response = await http.get(`/api/join-posts/general/${runId}`);
    return response;
} 

export const joinRun = async (runId) => {
    const response = await http.post(`/api/join-posts/general/join/${runId}`);
    return response;
} 