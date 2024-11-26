
import { CrewData } from "../../pages/Run/create/createCrew";
import { http } from "../request"

interface Filter {
  cursor: string | null; 
  size: number; 
  location: string;
  date: string; 
  sortType: string; 
}


const email = 'ssnu3007@naver.com';
// 크루생성 
export const createCrew = async (newData: CrewData  ) => {
  const res = await http.post('/api/crews', newData)
  return res 
}

//크루 정보 + 해당 크루 게시글 목록 
export const getCrewInfoList = async(crewId :string , filter:Filter) => {
  const params = { ...filter, email: email }; 
  const res = await http.get(`/api/crews/${crewId}/list`,{
    params: params,
  },)
  return res 
}


//크루원 조회 
export const getCrewMember = async (crewId:string | undefined , all = true ) => {
  const res = await http.get(`/api/crews/${crewId}/admin/users`, {
    params: {
      all: all 
    }
  });
  return res;
};


export interface putWarningProps {
  crewId : string | undefined;
  userId : string
}
//크루원 경고 
export const putWarning = async ({ crewId , userId: badUserId }: putWarningProps) => {
  const res = await http.put(`/api/crews/${crewId}/admin/users?badUserId=${badUserId}`);
  return res;
};

//크루원 강퇴 
export const deleteMember = async (crewId :string |undefined, userId :string) => {
  const res = await http.delete(`/api/crews/sendOutCrew` , {
    params : {
      crewId  : crewId ,
      outCrewsUserId : userId 
    }
  })
  return res 
}


//크루탈퇴 // 마스터가 아닌 크루만 가능 
export const deleteCrew = async (crewId :string ) => {
  if (!crewId) {
    throw new Error("crewId는 필수입니다."); // crewId가 undefined인 경우 예외 처리
  }
  const res = await http.delete(`/api/crews/${crewId}/users`)
  return res 
}



//크루 삭제 // 마스터인 크루 삭제 
export const deleteCrewMaster = async (crewId: string) => {
  const res = await http.delete(`/api/crews/${crewId}/admin`)
  return res
}


// 크루 마스터 권한 넘기기 
export const putChangeMster =  async (crewId: string, newMasterId: string  ) => {
  const res = await http.put(`/api/crews/${crewId}/admin/transfer`, null , {
    params : {
      newMasterId : newMasterId 
    }
  })
  return res
}