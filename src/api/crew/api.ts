import { http } from "../request"

// 크루생성 
export const createCrew = async ({newData }) => {
  const res = await http.post('/api/crews', newData)
  return res 
}


//크루원 조회 
export const getCrewMember = async (crewId , all = null ) => {
  const res = await http.get(`/api/crews/${crewId}/users`, {
    params: {
      all: all 
    }
  });
  return res;
};