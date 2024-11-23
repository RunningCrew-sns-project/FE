import { http } from "../../request";

export const getcrewrunInfo= async (runId :number) => {
    const response = await http.get(`/api/join-posts/crews/${runId}`);
    return response;
} 

export const joinCrewRun = async (runId :number) => {
    const response = await http.post(`/api/join-posts/crews/join/${runId}`);
    return response;
} 

