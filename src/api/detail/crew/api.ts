import { http } from "../../request";


export const getCrewInfo= async (crewId) => {
    const response = await http.get(`/api/crews/${crewId}`);
    return response;
} 

export const joinCrew = async (crewId) => {
    const response = await http.post(`/api/crews/${crewId}/join`);
    return response;
} 

export const approveOrRejectCrew = async ({crewId,requestCrewUserId,approveOrReject}) => {
    const response = await http.post(`/api/crews/approveOrReject?crewId=${crewId}&requestCrewUserId=${requestCrewUserId}&approveOrReject=${approveOrReject}`);
    return response;
} 

export const getaboutUser= async (crewId) => {
    const response = await http.get(`/api/crews/${crewId}/about-user`);
    return response;
} 