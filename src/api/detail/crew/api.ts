import { http } from "../../request";

export interface approveOrRejectCrewType {
    crewId : number;
    requestCrewUserId :  number;
    approveOrReject: boolean
  }

export const getCrewInfo= async (crewId :number) => {
    const response = await http.get(`/api/crews/${crewId}`);
    return response;
} 

export const joinCrew = async (crewId  :number) => {
    const response = await http.post(`/api/crews/${crewId}/join`);
    return response;
} 

export const approveOrRejectCrew = async ({crewId,requestCrewUserId,approveOrReject} : approveOrRejectCrewType) => {
    const response = await http.post(`/api/crews/approveOrReject?crewId=${crewId}&requestCrewUserId=${requestCrewUserId}&approveOrReject=${approveOrReject}`);
    return response;
} 
  

export const getaboutUser= async (crewId  :number) => {
    const response = await http.get(`/api/crews/${crewId}/about-user`);
    return response;
} 

export const selfWithdrawlCrew = async (crewId  :number) => {
    const response = await http.delete(`/api/crews/${crewId}/users`);
    return response;
} 

export const myCrewRequestUsers= async () => {
    const response = await http.get(`/api/crews/all/admin/users`);
    return response;
} 