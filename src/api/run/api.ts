

import { http } from "../request"

// 오늘의 달리기 
export const getRunToday = async () => {
  const res = await http.get(`/api/today`)
  return res
}



// 일반달리기 생성 
export const  postGeneralRun = async (data) => {
  const res = await http.post(`/api/join-posts/general/create`, data)
  console.log('달리기생성' , res )
  return res
}


// 크루 끼리 달리기 생성 
export const postCrewRun = async ({ data, crewId } ) => {
  const res = await http.post(`/api/join-posts/crews/${crewId}/create`,data,)
  return res
}


//크루 리스트 
export const getCrewListApi = async (CrewFilter) => {
  const res = await http.get(`/api/crews`,{
    params: CrewFilter
  })
  return res
}

//일반 달리기 리스트 
export const getRunListApi = async (RunFilter) => {
  const res = await http.get(`/api/join-posts/general/list`,{
    params: RunFilter
  },)
  return res
}


//일반달리기 수정 
export const postEditRunApi = async ({ data ,runId}) => {
  const res = await http.post(`/api/join-posts/general/update/${runId}`,
    data
  )
  return res  
}

//크루 달리기 수정 
export const postEditCrewRunAPi = async ({data, crewId, runId}) => {
  const res = await http.post(`/api/join-posts/crews/${crewId}/update/${runId}`,data)
  return res 
}