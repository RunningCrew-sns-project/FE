

import { crewRunProps } from "../../pages/Run/create/createCrewRun"
import { GeneralRunProps } from "../../pages/Run/create/createRun"
import { http } from "../request"

// 오늘의 달리기 
export const getRunToday = async () => {
  const res = await http.get(`/api/today`)
  return res
}



// 일반달리기 생성 
export const  postGeneralRun = async (data : GeneralRunProps) => {
  const res = await http.post(`/api/join-posts/general/create`, data)
  console.log('달리기생성' , res )
  return res
}


// 크루 끼리 달리기 생성 
interface crewRun {
  data: crewRunProps
  crewId: string
}
export const postCrewRun = async ({ data, crewId }: crewRun ) => {
  const res = await http.post(`/api/join-posts/crews/${crewId}/create`,data,)
  return res
}


//크루 리스트 
interface CrewFilter {
  size: number;
  cursor: string | null ;
  cursorId: string   | undefined ;
  reverse: boolean;         
  criteria:   string;  
  crewRegion: string;    
}
export const getCrewListApi = async (CrewFilter:CrewFilter) => {
  const res = await http.get(`/api/crews`,{
    params: CrewFilter
  })
  return res
}

//일반 달리기 리스트 

interface RunFilter {
  cursor:  string | null;
  size: number;
  location: string;
  date: string;
  sortType : string;
}
export const getRunListApi = async (RunFilter: RunFilter) => {
  const res = await http.get(`/api/join-posts/general/list`,{
    params: RunFilter
  },)
  return res
}


//일반달리기 수정 
interface editRunprops {
  data: GeneralRunProps;
  runId : string;
}
export const postEditRunApi = async ({ data ,runId}:editRunprops) => {
  const res = await http.post(`/api/join-posts/general/update/${runId}`,
    data
  )
  return res  
}

//크루 달리기 수정 
interface editCrewRunProps {
  data: crewRunProps;
  crewId: string;
  runId: string;
}
export const postEditCrewRunAPi = async ({data, crewId, runId}: editCrewRunProps) => {
  const res = await http.post(`/api/join-posts/crews/${crewId}/update/${runId}`,data)
  return res 
}


//달리기 기록 등록 
interface runRecords {
  record: string | undefined;
  distance: number | undefined;
  process: number | undefined;
}
export const postRunRecords = async (data: runRecords) => {
  const res = await http.post(`/api/runRecords/writeRunRecords`, data)
  return res
}