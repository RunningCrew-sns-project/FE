import { http } from "../request"

const email = 'ssnu3007@naver.com'


// 크루생성 
export const createCrew = async ({newData }) => {
  const res = await http.post('/api/crews', newData)
  return res 
}

//크루 정보 + 해당 크루 게시글 목록 
export const getCrewInfoList = async(crewId, filter) => {
  const params = { ...filter, email: email }; 
  const res = await http.get(`/api/crews/${crewId}/list`,{
    params: params,
  },)
  return res 
}


//크루원 조회 
export const getCrewMember = async (crewId , all = true ) => {
  const res = await http.get(`/api/crews/${crewId}/admin/users`, {
    params: {
      all: all 
    }
  });
  return res;
};




