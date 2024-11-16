import { http } from "../../request";


export const getrunInfo= async (runId) => {
    console.log('runId',runId)
    const response = await http.get(`/api/join-posts/general/${runId}`);
    // console.log('response',response.data.responseData)
    return response;
} 
