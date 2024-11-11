

import { http } from "../request"

const email = '내이메일';


// 일반달리기 생성 
export const  postGeneralRun = async (data) => {
  const res = await http.post(`/api/join-posts/general/create`, data,{
    params : {email}
  })
  console.log('달리기생성' , res )
  return res
}


// 크루 끼리 달리기 생성 
export const postCrewRun = async ({ data, crewId } ) => {
  const res = await http.post(`/api/join-posts/crews/${crewid}/create`,data,{
    params: {email}
  })
  return res
}